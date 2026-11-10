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

- The dataset is synthetic. Its Kaggle page says it "is not based on real Apple
  Inc. data" and was "created using Python and LLM-generated insights"; the
  uniform distributions in the [data quality report](data-quality.md) are
  consistent with that. Results are not evidence about Apple Inc.'s actual
  sales, stores or service activity.
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

The corrections require a manual update in Power BI Desktop; the step-by-step
[PBIX update checklist](../powerbi/pbix-update-checklist.md) covers them.

## Licensing

**Dataset.** The Kaggle page of the
[Apple Retail Sales Dataset](https://www.kaggle.com/datasets/amangarg08/apple-retail-sales-dataset)
(publisher `amangarg08`) displays **License: MIT**, and its description says:
"You may freely use, modify, and share this dataset for learning, research, or
portfolio projects." Checked on 10 November 2026.

What this means for the repository:

- Using the data, publishing the analysis and sharing the `.pbix` (which embeds
  the data) are permitted.
- The MIT licence asks that the licence notice travel with copies. If the CSV
  files or the `.pbix` are added to this repository, add a `NOTICE` or a line in
  `powerbi/README.md` naming the source, the publisher and the MIT licence.
- The Kaggle page does not provide a licence text file or a copyright line of
  its own, so cite the page URL and the publisher's username as the attribution.
- A licence shown on Kaggle is the publisher's declaration. It covers the
  synthetic data only and grants no right over Apple's trademarks.
- Recheck the page before redistributing: a publisher can change the licence.

The CSV files remain excluded from the repository by `.gitignore` because of
their size (the dataset is about 36 MB) and because Kaggle is the reference
source. The `.pbix` is no longer excluded and can be added once it has been
updated — see the [PBIX update checklist](../powerbi/pbix-update-checklist.md).

**Repository.** The repository does not yet declare a licence for its own code
and documentation.

## Trademark

Apple, and the product names that appear in the dataset, are trademarks of
Apple Inc. They are used only to describe the dataset's content. This project is
independent, educational, and not affiliated with or endorsed by Apple Inc.
