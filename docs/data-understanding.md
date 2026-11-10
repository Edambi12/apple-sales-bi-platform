# Data understanding

## Source

- **Dataset:** Apple Retail Sales Dataset, published on Kaggle by user `amangarg08`
- **URL:** <https://www.kaggle.com/datasets/amangarg08/apple-retail-sales-dataset>
- **Format:** five CSV files
- **Licence:** to be confirmed on the Kaggle page before any redistribution of
  the files — see [limitations](limitations.md#licensing)

All counts below were measured on the data loaded in the Power BI model.

## Inventory

| File | Rows | Columns | Grain | Coverage |
| --- | ---: | --- | --- | --- |
| `sales.csv` | 1,040,200 | `sale_id`, `sale_date`, `store_id`, `product_id`, `quantity` | One sale line | 1 Jan 2020 – 12 Nov 2024 (1,778 days, none missing) |
| `products.csv` | 89 | `Product_ID`, `Product_Name`, `Category_ID`, `Launch_Date`, `Price` | One product | Launch dates 2020 – 2024 |
| `category.csv` | 10 | `category_id`, `category_name` | One category | — |
| `stores.csv` | 75 | `Store_ID`, `Store_Name`, `City`, `Country` | One store | 47 cities, 19 countries |
| `warranty.csv` | 30,000 | `claim_id`, `claim_date`, `sale_id`, `repair_status` | One claim | 1 Jan 2024 – 12 Nov 2024 |

## Field profile

| Field | Profile |
| --- | --- |
| `sales[quantity]` | Whole numbers 1 to 10, mean 5.50, each value about 10% of rows |
| `products[Price]` | Whole numbers 231 to 1,965, mean 1,078; **no currency stated** |
| `warranty[repair_status]` | In Progress 7,611 · Pending 7,566 · Completed 7,466 · Rejected 7,357 |
| `category[category_name]` | Accessories, Audio, Desktop, Laptop, Smart Speaker, Smartphone, Streaming Device, Subscription Service, Tablet, Wearable |

## Headline totals

| Indicator | Value |
| --- | ---: |
| Sale lines | 1,040,200 |
| Units sold | 5,721,344 |
| Estimated sales value (list price × quantity) | 6,166,293,030 dataset units |
| Warranty claims | 30,000 (2.88% of sale lines) |

## Keys

Every table has a unique primary key and every foreign key resolves to a parent
row. Details and the remaining consistency issues are in the
[data quality report](data-quality.md).

## Nature of the data

Several properties indicate the dataset is synthetically generated rather than
real transactions: quantities are uniformly distributed, value per store is
almost identical across all 75 stores, the four claim statuses are evenly split,
and 47% of sales predate the listed launch date of the product sold. Findings
therefore describe this dataset only.
