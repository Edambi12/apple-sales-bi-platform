# Methodology

The whole project was built in **Power BI Desktop**. Power Query prepared the
data, the model and DAX carried the business logic, and the report was published
to the Power BI service.

## Workflow

| Step | Where | What was done |
| --- | --- | --- |
| 1. Extract | Kaggle → local folder | Downloaded the five CSV files |
| 2. Transform | Power Query | Read each file, promoted headers, set data types |
| 3. Load | Import model | Loaded five typed tables into the in-memory model |
| 4. Model | Model view | Created four relationships on the key columns |
| 5. Calculate | DAX | Added calculated columns and measures |
| 6. Visualise | Report view | Built three pages: Overview, Distribution, SAV |
| 7. Publish | Power BI service | Published the report to the web |

## ETL or ELT?

**ETL** is the accurate description.

- In Power Query, each query applies its steps (header promotion, type
  conversion) **before** the result is loaded. The model only ever receives the
  transformed tables.
- ELT means raw data is first loaded into a destination such as a warehouse or
  lakehouse and transformed there afterwards. This project has no staging
  destination: the CSV files go straight through Power Query into the model.

Two nuances are worth stating:

- The transformation layer is deliberately light. The source files were already
  tidy, so header promotion and typing were all that was needed.
- Business logic added after the load — relationships, calculated columns and
  measures — is **semantic modelling in DAX**, not the "T" of ELT.

An earlier version of the project presentation used the label "ELT-oriented
workflow". This documentation corrects that wording.

## Power Query steps

All five queries follow the same pattern (full code in
[`powerbi/power-query.pq`](../powerbi/power-query.pq)):

1. `Csv.Document ( File.Contents ( … ) )` — read the file with a comma delimiter.
2. `Table.PromoteHeaders` — use the first row as column names.
3. `Table.TransformColumnTypes` — assign explicit types.

| Table | Types applied |
| --- | --- |
| `sales` | `sale_id`, `store_id`, `product_id` text · `sale_date` date · `quantity` whole number |
| `products` | `Product_ID`, `Product_Name`, `Category_ID` text · `Launch_Date` date · `Price` whole number |
| `category` | both columns text |
| `stores` | all four columns text |
| `warranty` | `claim_id`, `sale_id`, `repair_status` text · `claim_date` date |

IDs are typed as text on purpose: they are identifiers such as `ST-23` or
`P-52`, never aggregated.

## Joins

No query is merged with another in Power Query. The tables are joined through
**model relationships**, resolved by the engine at query time — see the
[data model](data-model.md). The only row-level lookup is in DAX:
`RELATED ( products[Price] )` brings the list price onto each sale line.

## Tools

| Tool | Used for |
| --- | --- |
| Power BI Desktop | Model, report, publishing |
| Power Query (M) | Data import and typing |
| DAX | Calculated columns and measures |

Not used in this project: SQL databases, Python, Talend, Microsoft Fabric or any
external ETL platform.

## Validation

The figures in this documentation were recomputed independently from the data
stored in the `.pbix` file and compared with the report's cards and with the
project presentation. Totals matched; two report measures were found to need a
corrected definition — see [KPI definitions](kpi-definitions.md).
