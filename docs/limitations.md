# Limitations

## Financial figures

- **No currency.** The dataset gives a `Price` with no currency. Sales value is
  reported as *Estimated Sales Value* in *dataset units* and is never labelled
  USD, EUR or otherwise.
- **List-price proxy.** One price per product is applied to every year and
  country. There are no discounts, taxes, returns or exchange rates.
- **No cost data.** Profit and margin cannot be calculated.

## Time

- **Partial final year.** Sales stop on 12 November 2024. Any 2024 figure must
  be compared with the same window of 2023.
- **Claims cover 2024 only.** Claims filed before 2024 are absent, so claim
  ratios understate lifetime claim rates and cannot be trended over years.

## After-sales

- **No repair completion date.** Repair or processing time cannot be measured.
- **Inconsistent dates.** 9% of claims predate their sale, so sale-to-claim
  duration is not reliable either.
- **Status is a snapshot.** There is no status history.
- **No claim reason, cost or customer.**

## Data nature

- The uniform distributions documented in the
  [data quality report](data-quality.md) indicate synthetic data. Results are
  not evidence about Apple Inc.'s actual sales, stores or service activity.
- Stores, cities and product names resemble real ones; their figures are not real.

## Report

The published Power BI report predates this review. Known differences between
the report and this documentation:

| In the report | In this documentation |
| --- | --- |
| "CA" (chiffre d'affaires), no unit | Estimated Sales Value, dataset units |
| 2024 growth card: −12.7% (partial vs full year) | Comparable change: +0.77% |
| "Délai moyen de réclamation" card | Not a valid KPI — recommended for removal |
| Page name "Distrubition" | Distribution |

The corrections are listed in the
[Power BI improvement report](../powerbi/improvement-report.md) and require a
manual update in Power BI Desktop.

## Licensing

- The dataset belongs to its Kaggle publisher. Its licence could not be checked
  automatically while preparing this repository and **must be confirmed on the
  Kaggle page** before the CSV files, or the `.pbix` that embeds them, are
  redistributed. Until then both are excluded through `.gitignore`.
- The repository does not yet declare a licence for its own code and
  documentation.

## Trademark

Apple, and the product names that appear in the dataset, are trademarks of
Apple Inc. They are used only to describe the dataset's content. This project is
independent, educational, and not affiliated with or endorsed by Apple Inc.
