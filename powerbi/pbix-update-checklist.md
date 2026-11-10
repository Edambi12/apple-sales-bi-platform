# PBIX update checklist

Manual changes to make in `projet APPLE.pbix` with Power BI Desktop.

**Status: not applied.** The `.pbix` file and the published report have not
been modified. This checklist is the work order; tick each box as you go.

Where each item lives was read from the report file itself (pages, visual
titles, measure names). French labels are quoted exactly as they appear.

---

## 1. Correct the "Distribution" spelling

The misspelling "Distrubition" appears as text in **six** places; the three
buttons also need their navigation target checked after the rename.

| # | Where | How to change it |
| --- | --- | --- |
| 1 | Page tab name (2nd page) | Double-click the tab at the bottom → type `Distribution` |
| 2 | Title text box on that page | Click the text box → retype `Distribution` |
| 3 | Column chart title "Distrubition de CA" | Select the chart → Format → General → Title → `Distribution de la valeur des ventes` |
| 4–6 | Navigation button "Distrubition" on **Overview**, **Distribution** and **SAV** | Select the middle button → Format → Button → Style → Text → `Distribution`. Repeat on each of the three pages |
| 7–9 | Navigation target of those three buttons | Format → Button → Action → Destination: confirm it still points to the renamed page |

- [ ] Page tab renamed
- [ ] Page title text box corrected
- [ ] Chart title corrected
- [ ] Button text corrected on all three pages
- [ ] Each button still navigates to the Distribution page (Ctrl + click to test)

## 2. Review the sales-value labels

"CA" (chiffre d'affaires) means revenue, and no unit is shown. The value is
list price × quantity with no currency in the source.

| Visual (page) | Current title | Change to |
| --- | --- | --- |
| Card (Overview) | `CA global` | `Valeur des ventes estimée` |
| Map (Overview) | `CA de chaque pays` | `Valeur des ventes estimée par pays` |
| Pie chart (Overview) | `Contribution de chaque produit dans le CA` | `Part de la valeur des ventes par catégorie` (it shows categories, not products) |
| Column chart (Distribution) | `Distrubition de CA` | `Distribution de la valeur des ventes` |
| Line chart (Distribution) | `L'évolution de Chiffre d'affaire` | `Évolution de la valeur des ventes estimée` |
| Card (Distribution) | `TC de CA en 2024` | see item 4 |

- [ ] Six titles updated
- [ ] A text box added on the Overview page: `Valeur = prix catalogue × quantité, en unités du jeu de données (aucune devise indiquée).`
- [ ] No visual shows a currency symbol: select each card and chart → Format → check Display units / the measure's Format is *Whole number*, not *Currency*
- [ ] Axis titles on the two charts no longer read "Somme de CA de chaque produit" (Format → Y-axis → Title → `Valeur des ventes estimée`)
- [ ] Optional: rename the measure `CA global` to `Valeur des ventes estimée` (Power BI updates the visuals that use it)

## 3. Review the Apple logo

The Apple logo image appears in the left panel of all three pages. It is not
needed, and it makes an independent project look official.

- [ ] Overview: select the logo image in the left panel → Delete
- [ ] Distribution: same
- [ ] SAV: same
- [ ] Replace with a neutral icon or leave the text only
- [ ] Change the panel text `APPLE` to `Apple Retail Sales Analytics` or `Ventes retail — jeu de données Kaggle`
- [ ] Add a small text box on the Overview page: `Projet éducatif indépendant. Données synthétiques (Kaggle). Non affilié à Apple Inc.`
- [ ] View → Selection pane: confirm no hidden logo image remains on any page

The other icons (cards) are generic and can stay.

## 4. Validate the growth card

**Card "TC de CA en 2024" (Distribution page), measure `[TC CA 2024 vs 2023 (%)]`.**

It currently shows **−12.7%** because it compares 2024, which ends on
12 November, with the whole of 2023.

Steps:

1. Add a calendar table (Modeling → New table):
   ```dax
   Date =
   ADDCOLUMNS (
       CALENDAR ( DATE ( 2020, 1, 1 ), DATE ( 2024, 12, 31 ) ),
       "Année", YEAR ( [Date] ),
       "Mois n°", MONTH ( [Date] ),
       "Mois", FORMAT ( [Date], "MMMM" )
   )
   ```
2. Table tools → Mark as date table → `Date`.
3. Model view: relate `Date[Date]` (one) to `sales[sale_date]` (many), single direction.
4. Select `Date[Mois]` → Sort by column → `Mois n°`.
5. Create the three measures `Sales Value YTD`, `Sales Value YTD Previous Year`
   and `Sales Value YoY % (Comparable)` from
   [`recommended-measures.dax`](recommended-measures.dax)
   (replace `[Estimated Sales Value]` with `[CA global]` if you keep that name).
6. Format `Sales Value YoY % (Comparable)` as Percentage, 2 decimals.
7. On the card, replace the field with the new measure.
8. Retitle the card `Évolution de la valeur des ventes, 1 janv. – 12 nov. (2024 vs 2023)`.

Expected values, with no slicer selected:

| Measure | Expected |
| --- | ---: |
| `Sales Value YTD` | 1,101,457,659 |
| `Sales Value YTD Previous Year` | 1,093,003,974 |
| `Sales Value YoY % (Comparable)` | +0.77% |

- [ ] Calendar table created, marked and related
- [ ] Three measures created
- [ ] Card shows **+0,77 %**
- [ ] Card colour reviewed (the red background signalled a decline)
- [ ] Old measure `[TC CA 2024 vs 2023 (%)]` deleted or renamed `… (année partielle)` and removed from the page
- [ ] Line chart on the same page: Analytics pane → remove **Forecast** and **Trend line** (they extrapolate from the partial year)

## 5. Validate the warranty claim-delay card

**Card "Délai moyen de réclamation" (SAV page), measure `[Délai moyen depuis réclamation (jours)]`.**

The measure is `AVERAGEX ( warranty, DATEDIFF ( warranty[claim_date], TODAY(), DAY ) )`.
It is the average age of claims as of today. It increases by one every day
(830.81 in the screenshot) and says nothing about repair time. The dataset has
no repair completion date, so a processing delay cannot be calculated.

Choose one:

**Option A — remove (recommended)**
- [ ] Delete the card from the SAV page
- [ ] Delete the measure `[Délai moyen depuis réclamation (jours)]`
- [ ] Use the freed space for `Open Claims Share` (Pending + In Progress = 50.59%) from `recommended-measures.dax`

**Option B — keep as a claim-age indicator**
- [ ] Replace the measure with a version anchored to the data, not to today:
  ```dax
  Âge moyen des réclamations (jours) =
  VAR LastClaimDate = CALCULATE ( MAX ( warranty[claim_date] ), ALL ( warranty ) )
  RETURN
      AVERAGEX ( warranty, DATEDIFF ( warranty[claim_date], LastClaimDate, DAY ) )
  ```
- [ ] Card shows **157,81** with no slicer selected
- [ ] Card retitled `Âge moyen des réclamations (jours, au 12 nov. 2024)`

Either way:
- [ ] No visual is titled "délai de traitement", "délai de réparation" or similar
- [ ] No measure uses `sale_date` to `claim_date` as a duration (2,687 claims predate their sale)

## 6. Preserve the accurate KPI definitions

These measures are correct. Do **not** change their logic; check their values
after the edits above, with no slicer selected.

| Measure | Expression (unchanged) | Expected |
| --- | --- | ---: |
| `[CA global]` | `SUMX ( sales, sales[quantity] * RELATED ( products[Price] ) )` | 6,166,293,030 |
| Units sold (card "Quantité vendue") | `SUM ( sales[quantity] )` | 5,721,344 |
| `[% SAV completed]` | Completed claims ÷ all claims | 24.89% |
| `[Taux de réclamation]` | `COUNTROWS ( warranty ) / COUNTROWS ( sales )` | 2.88% |
| `[nombre de réclamation]` | `COUNT ( warranty[claim_id] )` | 30,000 |
| `[nombre de store]` | `COUNT ( stores[Store_ID] )` | 75 |

- [ ] All six values match
- [ ] `[Taux de réclamation]` formatted as Percentage with 2 decimals (it displays "3 %" today) and the card retitled `Réclamations par vente`
- [ ] Optional: add explicit measures `Units Sold`, `Transactions` (1,040,200) and `Average Units per Sale` (5.50) from `recommended-measures.dax`

## 7. Before republishing

- [ ] Each page checked with one year selected and with no selection
- [ ] File → Options → Current file → Data Load → *Auto date/time* unticked (once the calendar table exists)
- [ ] File saved
- [ ] Published to the **same workspace, same report name** (Replace)
- [ ] Public link opened in a private browser window and all three pages checked
- [ ] If the public link changed: update `src/config/links.ts`, `README.md` and `powerbi/README.md`
- [ ] New screenshots of the three pages saved over the files in `docs/screenshots/`
- [ ] `docs/limitations.md` → section "Report": remove the rows that no longer apply

Further, lower-priority improvements are in
[`improvement-report.md`](improvement-report.md).
