# Business understanding

## Context

The project analyses a public retail dataset describing sales of Apple-branded
products through a network of 75 stores in 19 countries, together with the
warranty claims attached to those sales. It is an independent educational
exercise: the data is a third-party Kaggle dataset, not Apple Inc. company data.

## Intended users

| User | What they need from the report |
| --- | --- |
| Retail leadership | A one-page reading of value, volume and after-sales activity |
| Sales managers | Performance by category, country, city and store |
| After-sales stakeholders | Claim volumes by status, category and country |

The report supports exploration and prioritisation. It is not a substitute for
audited financial reporting.

## Analytical questions

| Area | Question | Answered with |
| --- | --- | --- |
| Sales performance | How do value, units and transactions evolve from 2020 to 2024? | Estimated Sales Value, Units Sold, comparable YoY |
| Product performance | Which categories lead on value, and is it the same ranking on volume? | Value and units by category |
| Geographical analysis | Which countries and cities concentrate sales value? | Value by country and city |
| Store performance | How is performance spread across the store network? | Value by store, store count |
| Warranty analysis | How are claims distributed by status, category and country? | Claim count, completed share, claims per sale |

## Objectives

1. Turn five raw CSV files into one consistent analytical model.
2. Define clear and reproducible KPIs ([KPI definitions](kpi-definitions.md)).
3. Deliver an interactive report a non-technical user can navigate.
4. State plainly what the data cannot support ([limitations](limitations.md)).

## Out of scope

Profitability, pricing strategy, customer analysis, inventory and repair
turnaround time: the dataset has no fields for cost, discounts, customers, stock
or repair completion.

## Note on the original planning slides

The first planning slides of the project (kept in
[`archive/original-slides`](archive/original-slides)) listed some target KPIs
that the dataset cannot support — sales per square foot, category margin and
average resolution time. They were dropped from the final KPI set for that
reason.
