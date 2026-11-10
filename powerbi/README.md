# Power BI artefacts

This folder documents the Power BI side of the project. Everything here was
extracted from, or written about, the actual report file `projet APPLE.pbix`.

| File | Content | Origin |
| --- | --- | --- |
| [`measures.dax`](measures.dax) | The 10 DAX measures of the report | Extracted verbatim |
| [`calculated-columns.dax`](calculated-columns.dax) | The 7 user-defined calculated columns | Extracted verbatim |
| [`power-query.pq`](power-query.pq) | The 5 Power Query (M) queries | Extracted; local path shortened |
| [`model-documentation.md`](model-documentation.md) | Tables, columns, relationships, report pages | Written from the model metadata |
| [`improvement-report.md`](improvement-report.md) | Review findings and prioritised recommendations | Review |
| [`pbix-update-checklist.md`](pbix-update-checklist.md) | Step-by-step manual changes to make in Power BI Desktop — **not yet applied** | Work order |
| [`recommended-measures.dax`](recommended-measures.dax) | Proposed measures — **not** in the published report | Proposal |

**Published report:** <https://app.powerbi.com/view?r=eyJrIjoiNjNjZTE3ZmUtNzAzNC00ODA3LWJkMGMtYWQ4MTNlYTUzNGE1IiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9>

## Why the .pbix file is not in the repository

The `.pbix` (about 21 MB) embeds the complete Kaggle dataset. The dataset is
published under the MIT licence (see
[limitations](../docs/limitations.md#licensing)), so the file may be shared. It
has not been added yet because the current version still contains the issues
listed in the [update checklist](pbix-update-checklist.md); add the corrected
file here, with a line crediting the Kaggle source and its MIT licence.

To reproduce the report from the source files:

1. Download the five CSV files from the
   [Kaggle dataset](https://www.kaggle.com/datasets/amangarg08/apple-retail-sales-dataset).
2. In Power BI Desktop, use **Get data → Text/CSV** for each file, or paste the
   queries from `power-query.pq` into the Advanced Editor and replace
   `<local folder>` with your own path.
3. Create the four relationships listed in `model-documentation.md`.
4. Add the calculated columns and measures from the `.dax` files.

## How the extraction was done

The model metadata, DAX, M code and table contents were read from the `.pbix`
with the open-source `pbixray` Python library, and the report layout (pages,
visuals, fields) was read from the `Report/Layout` JSON inside the file. The
`.pbix` itself was not modified.
