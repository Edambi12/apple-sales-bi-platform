# Data quality report

Checks were run on the five tables as loaded in the Power BI model.

## Summary

| Dimension | Result |
| --- | --- |
| Completeness | No null values in any source column |
| Uniqueness | All primary keys unique; no fully duplicated rows |
| Referential integrity | No orphan foreign keys |
| Validity | Types consistent; quantities 1–10; prices 231–1,965 |
| Consistency | **Issues found** — dates and duplicated names (below) |
| Timeliness | Sales end 12 Nov 2024; 2024 is a partial year |

## Structural checks

| Check | Result |
| --- | ---: |
| `sales` rows / distinct `sale_id` | 1,040,200 / 1,040,200 |
| `products` rows / distinct `Product_ID` | 89 / 89 |
| `category` rows / distinct `category_id` | 10 / 10 |
| `stores` rows / distinct `Store_ID` | 75 / 75 |
| `warranty` rows / distinct `claim_id` | 30,000 / 30,000 |
| Sales with unknown product | 0 |
| Sales with unknown store | 0 |
| Products with unknown category | 0 |
| Claims with unknown sale | 0 |
| Calendar days without sales (1 Jan 2020 – 12 Nov 2024) | 0 of 1,778 |

## Consistency issues

| # | Issue | Size | Handling |
| --- | --- | --- | --- |
| 1 | Claim dated **before** its linked sale | 2,687 claims (8.96%); earliest gap −311 days | Rows kept. Sale-to-claim duration is not used as a KPI. |
| 2 | Sale dated before the product's `Launch_Date` | 493,143 sale lines (47.4%) | Rows kept. `Launch_Date` is not used in any analysis. |
| 3 | Same `Store_Name` for two `Store_ID`s in the same city | 6 names, 12 stores (e.g. Apple Covent Garden: ST-17 and ST-73) | Counted as 75 distinct stores by ID. A name slicer merges each pair. |
| 4 | Same `Product_Name` for two products | "HomePod mini": P-21 (Audio, 438) and P-75 (Smart Speaker, 266) | Analysed by `Product_ID`; names disambiguated by category. |
| 5 | Mixed column naming (`sale_id` vs `Product_ID`) | 5 tables | Kept as in the source. |
| 6 | Mixed file encodings (Windows-1252 and UTF-8) | `products.csv` is UTF-8 | Set per file in Power Query. |

None of these rows were deleted or corrected. Altering them would hide a
property of the source; disclosing them and keeping the affected fields out of
the KPIs is the safer choice.

## Signs of synthetic data

| Observation | Value |
| --- | --- |
| `quantity` distribution | Each value 1–10 holds 9.95%–10.03% of rows |
| Sales value per store | 79.8M to 84.5M across all 75 stores |
| Sales value per full year | 1.261B to 1.269B for 2020–2023 |
| Claim status split | 24.5% to 25.4% for each of four statuses |
| Claims per sale, by sale year | 2.86% to 2.92% |

Real retail data is not this uniform. Combined with issues 1 and 2, this
indicates a generated dataset. It is suitable for demonstrating modelling and
reporting technique, not for conclusions about a real business.

## Recommended controls for a production version

- A data-quality page or tooltip showing row counts and the last data date.
- A flag column in Power Query for claims dated before their sale.
- Store and product labels built as "Name (ID)" to remove ambiguity.
