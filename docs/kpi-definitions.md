# KPI definitions

Results are computed on the full dataset with no filter applied. DAX is quoted
from the report where the measure exists ([`powerbi/measures.dax`](../powerbi/measures.dax));
otherwise the formula is a documented definition, proposed in
[`powerbi/recommended-measures.dax`](../powerbi/recommended-measures.dax).

| KPI | Result | In the published report? |
| --- | ---: | --- |
| Estimated Sales Value | 6,166,293,030 dataset units | Yes — `[CA global]` |
| Units Sold | 5,721,344 | Yes — implicit sum of `quantity` |
| Transactions | 1,040,200 | No — documented definition |
| Average Units per Sale | 5.50 | No — documented definition |
| Completed Warranty Claims Share | 24.89% | Yes — `[% SAV completed]` |
| Claims per Sale | 2.88% | Yes — `[Taux de réclamation]` |
| Comparable Year-over-Year Change | +0.77% value · +0.64% units | Different definition in the report |

## 1. Estimated Sales Value

```dax
CA global =
SUMX ( sales, sales[quantity] * RELATED ( products[Price] ) )
```

- **Meaning:** list price multiplied by quantity, summed over sale lines.
- **Unit:** dataset units. The source states no currency, so the value must not
  be labelled USD, EUR or any other currency.
- **Not:** revenue, turnover, profit or margin. There are no discount, tax or
  cost fields, and one price per product is applied to all years and countries.

## 2. Units Sold

```dax
Units Sold = SUM ( sales[quantity] )
```

Total quantity across sale lines.

## 3. Transactions

```dax
Transactions = DISTINCTCOUNT ( sales[sale_id] )
```

`sale_id` is unique, so this equals the number of rows. Each row is one product
in one sale; the data has no multi-line baskets.

## 4. Average Units per Sale

```dax
Average Units per Sale = DIVIDE ( [Units Sold], [Transactions] )
```

A volume average (5.50 units). It is not a monetary basket value.

## 5. Completed Warranty Claims Share

```dax
% SAV completed =
DIVIDE (
    CALCULATE ( COUNTROWS ( warranty ), warranty[repair_status] = "Completed" ),
    COUNTROWS ( warranty ),
    0
)
```

- **Numerator:** claims with status *Completed* — 7,466.
- **Denominator:** all claims — 30,000.
- **Caveat:** a snapshot of status values. It says nothing about how quickly
  claims are completed.

## 6. Claims per Sale

```dax
Taux de réclamation =
DIVIDE ( COUNTROWS ( warranty ), COUNTROWS ( sales ), 0 )
```

- **Numerator:** all claims — 30,000, all filed between 1 Jan and 12 Nov 2024.
- **Denominator:** all sale lines — 1,040,200, sold between 2020 and 2024.
- **Is the ratio valid?** As a *share of sale lines with a recorded claim*, yes:
  each claim points to exactly one sale and a sale has at most one claim. As a
  *product failure rate*, no: claims filed before 2024 or after 12 Nov 2024 are
  not in the data, so the true lifetime rate is unknown and higher.
- **Per unit:** claims attach to a sale line, not to a unit. A per-unit rate
  (30,000 ÷ 5,721,344 = 0.52%) would assume one claim covers one unit, which
  the data does not state.
- **By sale year:** between 2.86% and 2.92% for every year 2020–2024.

## 7. Comparable Year-over-Year Change

**Definition:** 2024 year-to-date ÷ 2023 year-to-date − 1, with both years
limited to 1 January – 12 November.

| | 2024 (1 Jan – 12 Nov) | 2023 (1 Jan – 12 Nov) | Change |
| --- | ---: | ---: | ---: |
| Estimated Sales Value | 1,101,457,659 | 1,093,003,974 | **+0.77%** |
| Units Sold | 1,021,551 | 1,015,089 | **+0.64%** |

The published report uses a different formula:

```dax
TC CA 2024 vs 2023 (%) =
VAR CA_2024 = CALCULATE ( [CA global], sales[Année] = 2024 )
VAR CA_2023 = CALCULATE ( [CA global], sales[Année] = 2023 )
RETURN DIVIDE ( CA_2024 - CA_2023, CA_2023, 0 )
```

This compares 317 days of 2024 with all 365 days of 2023 and returns **−12.7%**.
The like-for-like version is the correct reading; the measure that implements
it is in [`recommended-measures.dax`](../powerbi/recommended-measures.dax).

## Indicators deliberately not used

| Indicator | Why not |
| --- | --- |
| Revenue in a currency, profit, margin | No currency, cost or discount fields |
| Average repair or processing time | No repair completion date |
| Days from sale to claim | 2,687 claims (9.0%) are dated before their sale |
| Average claim age relative to today | Changes daily and describes nothing about service; the report's `[Délai moyen depuis réclamation (jours)]` card should be removed |
| Sales per square foot, category margin | No store surface or cost data |
