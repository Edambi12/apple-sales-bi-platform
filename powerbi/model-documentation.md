# Model documentation

Source: metadata of `projet APPLE.pbix` (import mode, Power BI Desktop).

## Tables

| Table | Rows | Role | Key |
| --- | ---: | --- | --- |
| `sales` | 1,040,200 | Fact — one row per sale line | `sale_id` (unique) |
| `products` | 89 | Dimension — product and list price | `Product_ID` |
| `category` | 10 | Lookup — product category | `category_id` |
| `stores` | 75 | Dimension — store, city, country | `Store_ID` |
| `warranty` | 30,000 | Claim-level table — one row per warranty claim | `claim_id` |

Power BI's *Auto date/time* option is enabled, so the file also contains three
hidden `LocalDateTable_*` tables (one each for `sale_date`, `claim_date` and
`Launch_Date`) and a `DateTableTemplate`. There is no user-defined date table.

## Columns

### sales
| Column | Type | Origin |
| --- | --- | --- |
| `sale_id` | Text | Source — primary key |
| `sale_date` | Date | Source |
| `store_id` | Text | Source — FK to `stores` |
| `product_id` | Text | Source — FK to `products` |
| `quantity` | Whole number | Source (1 to 10) |
| `Année` | Whole number | Calculated: `YEAR ( sales[sale_date] )` |
| `Mois` | Text | Calculated: `FORMAT ( sales[sale_date], "MMMM" )` |
| `CA de chaque produit` | Whole number | Calculated: `quantity × RELATED ( products[Price] )` |

### products
| Column | Type | Origin |
| --- | --- | --- |
| `Product_ID` | Text | Source — primary key |
| `Product_Name` | Text | Source (88 distinct names for 89 products) |
| `Category_ID` | Text | Source — FK to `category` |
| `Launch_Date` | Date | Source |
| `Price` | Whole number | Source (231 to 1,965; no currency stated) |

### category
| Column | Type | Origin |
| --- | --- | --- |
| `category_id` | Text | Source — primary key |
| `category_name` | Text | Source |
| `Nombre de réclamation de chaque catégorie` | Whole number | Calculated — claims per category |

### stores
| Column | Type | Origin |
| --- | --- | --- |
| `Store_ID` | Text | Source — primary key |
| `Store_Name` | Text | Source (69 distinct names for 75 stores) |
| `City` | Text | Source (47 cities) |
| `Country` | Text | Source (19 countries) |
| `CA de chaque country` | Whole number | Calculated — country sales value, repeated on each store row |
| `Nb Réclamations (par Country)` | Whole number | Calculated — country claim count |
| `level` | Text | Calculated — Low / Medium / High band on country claim count |

### warranty
| Column | Type | Origin |
| --- | --- | --- |
| `claim_id` | Text | Source — primary key |
| `claim_date` | Date | Source |
| `sale_id` | Text | Source — FK to `sales` (unique in this table) |
| `repair_status` | Text | Source: Completed, In Progress, Pending, Rejected |

## Relationships

| From (many / dependent side) | To (one side) | Cardinality | Cross-filter | Active |
| --- | --- | --- | --- | --- |
| `sales[product_id]` | `products[Product_ID]` | Many-to-one | Single | Yes |
| `sales[store_id]` | `stores[Store_ID]` | Many-to-one | Single | Yes |
| `products[Category_ID]` | `category[category_id]` | Many-to-one | Single | Yes |
| `warranty[sale_id]` | `sales[sale_id]` | One-to-one | Both | Yes |

Referential integrity was verified on the loaded data: no sale references a
missing product or store, no product references a missing category, and every
claim references an existing sale.

The warranty relationship is one-to-one because `sale_id` happens to be unique
on both sides. Logically it is **1 : 0..1** — a sale has at most one claim, and
97.1% of sales have none. Power BI forces bi-directional filtering on one-to-one
relationships, which has a visible consequence: the `sales[Année]` slicer on the
SAV page filters claims by the **year of the sale**, not the year of the claim.

## Classification

The model is a **snowflake-style relational model with a single fact table**,
not a classical star schema:

- `stores` and `products` are dimensions joined directly to `sales`;
- `category` is normalised out of `products` (a snowflaked branch);
- `warranty` is a second transactional table attached to the fact by `sale_id`,
  not a dimension;
- there is no shared date dimension.

## Report pages

| Page (as named) | Visuals | Fields |
| --- | --- | --- |
| **Overview** | 4 cards, year slicer, map, pie chart, 3 navigation buttons | `[CA global]`, `SUM(quantity)`, `[Taux de réclamation]`, `[% SAV completed]`, `stores[Country]` with `stores[CA de chaque country]`, `category_name` with `SUM(CA de chaque produit)` |
| **Distrubition** *(typo)* | 2 cards, store slicer, clustered column chart, line chart with trend and forecast | `[TC CA 2024 vs 2023 (%)]`, `[nombre de store]`, `Country › City` with `SUM(CA de chaque produit)`, `sales[Année]` |
| **SAV** | 2 cards, year slicer, pie chart, bar chart, shape map | `[nombre de réclamation]`, `[Délai moyen depuis réclamation (jours)]`, `repair_status`, `[Nombre de réclamations]` by category, `stores[level]` by country |

"SAV" stands for *service après-vente* (after-sales service).
