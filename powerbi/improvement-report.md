# Power BI review and improvement report

A review of `projet APPLE.pbix` as a BI artefact: model, measures, visuals and
naming. The file was inspected, **not modified** — every item below is a
recommendation to apply in Power BI Desktop, followed by a republish.

Figures quoted here were recomputed from the data stored in the model.

## What works well

- Clean import of five tables with explicit data types on every column.
- Correct relationships on the natural keys, with verified referential integrity.
- The core value measure `[CA global]` is a proper iterator over the fact table.
- Three focused pages with consistent layout and page navigation buttons.
- KPI cards give an immediate reading of each page.

## Findings that change what a reader concludes

### 1. The year-over-year card compares unequal periods — High
`[TC CA 2024 vs 2023 (%)]` divides all of 2024 by all of 2023 and displays
**−12.7%**. The data ends on 12 November 2024, so 2024 is missing seven weeks.
On the same window (1 Jan – 12 Nov) the change is **+0.77%** in value and
**+0.64%** in units. The card currently signals a decline that did not happen.

*Fix:* use the like-for-like measures in
[`recommended-measures.dax`](recommended-measures.dax) and retitle the card
"Sales value YoY, year to 12 Nov".

### 2. "Délai moyen de réclamation" is not a processing time — High
`[Délai moyen depuis réclamation (jours)]` averages
`DATEDIFF ( claim_date, TODAY(), DAY )`. It measures how long ago claims were
filed, grows by one every day (the screenshot shows 830.81 days), and has no
link to how long a repair takes. The dataset has no repair completion date, so
a processing time cannot be computed at all.

*Fix:* remove the card. If a claim-age indicator is wanted, anchor it to the
last date in the data rather than `TODAY()` (average: 157.8 days) and label it
"Average claim age (days)". Do not use `sale_date` to `claim_date` either:
2,687 claims (9.0%) are dated before their sale.

### 3. The annual line chart forecasts from five points — High
The trend line and forecast on "L'évolution de Chiffre d'affaire" are driven by
the partial 2024 value. Four full years sit between 1.261B and 1.269B; the
apparent downward trend is an artefact of the incomplete year.

*Fix:* remove the forecast and trend line, plot by month (59 points), and mark
or exclude November 2024.

### 4. Static calculated columns ignore the slicers — High
`stores[CA de chaque country]`, `stores[Nb Réclamations (par Country)]`,
`stores[level]` and `category[Nombre de réclamation de chaque catégorie]` are
calculated columns, evaluated once at refresh. The map and the shape map
therefore do not react to the year slicer. On the Overview map the value
column is also placed in the *legend* (one legend entry per number) instead of
bubble size.

*Fix:* use `stores[Country]` as location and the measure `[CA global]` as
bubble size; replace the claim columns with the claim-count measure. The
Low/Medium/High thresholds (340–782, 783–1,624, ≥1,625) are hard-coded and
should be documented or derived.

### 5. The year slicer filters claims by sale year — Medium
The warranty relationship is one-to-one and bi-directional, and the SAV page
slicer uses `sales[Année]`. Selecting "2023" shows claims on products *sold* in
2023, although every claim was *filed* in 2024. Readers will assume the
opposite.

*Fix:* add a calendar table, relate it to `sale_date` (active) and
`claim_date`, and label the slicer explicitly ("Year of sale").

### 6. "Taux de réclamation" needs context — Medium
`COUNTROWS ( warranty ) / COUNTROWS ( sales )` gives 2.88%, shown as "3 %".
Claims exist only for 2024 while sales span 2020–2024, so this is the share of
sale lines with a recorded claim, not a product failure rate.

*Fix:* show two decimals, retitle "Claims per sale", and add a tooltip stating
the claim period.

## Model

| # | Finding | Recommendation | Priority |
| --- | --- | --- | --- |
| M1 | No date dimension; *Auto date/time* creates three hidden tables | Add one marked calendar table, disable Auto date/time, move `Année`/`Mois` to it | High |
| M2 | `sales[CA de chaque produit]` materialises a value on 1.04M rows | Use the `[CA global]` measure in visuals and drop the column | Medium |
| M3 | `sales[Mois]` is text, so months sort alphabetically | Sort by a month number column on the calendar table | Medium |
| M4 | `category` is snowflaked from `products` | Optional: merge category name into `products` for a star schema | Low |
| M5 | Six store names map to two `Store_ID`s each (e.g. Apple Covent Garden) | The store slicer merges them; display "Store name (ID)" or slice on `Store_ID` | Medium |
| M6 | "HomePod mini" exists as P-21 (Audio) and P-75 (Smart Speaker) | Disambiguate product names in visuals | Low |

## Measures

| # | Finding | Recommendation | Priority |
| --- | --- | --- | --- |
| D1 | `[Nombre de réclamations]` and `[nombre de réclamation]` are identical | Keep one | Low |
| D2 | `[Nb Réclamations LY]` is always blank (claims exist for 2024 only) and unused | Remove | Low |
| D3 | `[CA produit (mesure)]` could not be read by the extraction tool | Check in Desktop; remove if empty or unused | Low |
| D4 | Units sold uses an implicit `SUM ( quantity )` | Create explicit `[Units Sold]`, `[Transactions]`, `[Average Units per Sale]` | Medium |
| D5 | Measures are spread over four tables with mixed naming | Group them in one measure table with display folders | Low |
| D6 | No format strings or descriptions | Set formats (0.00%, thousands separators) and descriptions | Low |

## Report and visuals

| # | Finding | Recommendation | Priority |
| --- | --- | --- | --- |
| V1 | Page, title, button and chart title read "Distrubition" | Correct to **Distribution** in all four places | High |
| V2 | Pie chart with 10 categories; title says "produit" but shows categories | Sorted bar chart; title "Sales value by category" | Medium |
| V3 | "CA" (chiffre d'affaires) implies revenue; no unit is shown | Label "Estimated sales value (dataset units)" | High |
| V4 | The report shows the Apple logo | Replace with a neutral mark and add an "independent educational project" note | High |
| V5 | Cards have no period or comparison context | Add subtitles (period covered, filter state) | Medium |
| V6 | Interface language mixes French and English | Choose one language for titles, measures and pages | Low |
| V7 | Column chart uses a Country › City hierarchy with truncated labels | Sort descending; use a horizontal bar chart | Low |
| V8 | No alt text or tab order set on visuals | Add alt text and check tab order for accessibility | Low |

## Suggested order of work

1. Correct "Distribution" (V1), relabel sales value (V3), replace the logo (V4).
2. Add the calendar table and the like-for-like measures (M1, finding 1).
3. Remove the claim-age card and the forecast (findings 2 and 3).
4. Replace static columns with measures on the maps (finding 4).
5. Tidy measures and formats (D1–D6), then republish.

When the same report is overwritten in the same workspace, the existing
**Publish to web** link normally keeps working. Check the public URL after
republishing, and update `src/config/links.ts` and the README if it changed.
