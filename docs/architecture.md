# Architecture

## Solution overview

```mermaid
flowchart LR
    subgraph Source
        K[Kaggle dataset<br/>5 CSV files]
    end
    subgraph PBI[Power BI Desktop]
        PQ[Power Query<br/>promote headers, set types]
        M[Import model<br/>5 tables, 4 relationships]
        D[DAX<br/>calculated columns, measures]
        R[Report<br/>Overview · Distribution · SAV]
        PQ --> M --> D --> R
    end
    subgraph Delivery
        S[Power BI service<br/>Publish to web]
        W[Web application<br/>React case study]
    end
    K --> PQ
    R --> S
    S -- embedded iframe + direct link --> W
    G[GitHub repository] <-- two-way sync --> L[Lovable]
    L -- publishes --> W
```

## Components

| Layer | Technology | Responsibility |
| --- | --- | --- |
| Source | Kaggle CSV files | Raw sales, product, category, store and warranty data |
| Preparation | Power Query (M) | File import, header promotion, data typing |
| Semantic model | Power BI import model (VertiPaq) | Storage, relationships, filter propagation |
| Calculations | DAX | KPIs and derived columns |
| Presentation | Power BI report | Three interactive pages |
| Distribution | Power BI service, Publish to web | Public report URL |
| Case study | React, TypeScript, Vite, Tailwind CSS, shadcn/ui | Explains the project and embeds the report |
| Hosting | Lovable | Builds and serves the web application |
| Source control | GitHub | Code, documentation, sync with Lovable |

## Web application

The application is a static single-page app. It does not query the dataset: the
figures it displays are constants in
[`src/data/caseStudy.ts`](../src/data/caseStudy.ts), each recomputed from the
data in the `.pbix` file. The interactive analysis lives in the embedded Power
BI report.

```
src/
├── config/links.ts            Public URLs (report, dataset, repository)
├── data/caseStudy.ts          Verified figures, KPI and model metadata
├── components/
│   ├── case-study/            Section layout, bar list, model diagram, Power BI embed
│   │   └── sections/          One component per case-study section
│   ├── layout/                Navigation, footer, scroll and error handling
│   ├── sections/, products/, checkout/   Demo storefront (fictional UI sample)
│   └── ui/                    shadcn/ui primitives
├── pages/                     Route components
└── integrations/supabase/     Generated client, used by the demo checkout only
```

| Route | Content |
| --- | --- |
| `/` | The case study |
| `/analytics` | Full-width embedded Power BI report |
| `/demo-store`, `/produits`, `/boutiques`, `/support`, `/entreprise`, `/newsroom`, `/carrieres`, `/compte`, `/panier` | Fictional storefront demo from the first version of the app (French) |

The storefront demo is a user-interface exercise with invented products, prices
and reviews. It has no connection to the Kaggle dataset. Its checkout calls a
Supabase Edge Function (`supabase/functions/send-order-confirmation`) that sends
a confirmation email through Resend; this is the only backend in the project.

## Design decisions

- **Embed and link.** The report is embedded in an iframe, and a direct link is
  always shown next to it, because corporate networks often block embedded
  content.
- **Deferred embed on the home page.** The iframe loads only on request, which
  keeps the first page light.
- **Route-level code splitting.** Secondary pages are lazy-loaded, and an error
  boundary keeps a failing page from blanking the whole app.
- **One source for figures and links.** Numbers and URLs are defined once and
  imported everywhere.
