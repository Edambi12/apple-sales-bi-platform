/**
 * Single source of truth for the project's public links.
 * Update a URL here and every page, CTA and footer link follows.
 */
export const LINKS = {
  powerBiReport:
    "https://app.powerbi.com/view?r=eyJrIjoiNjNjZTE3ZmUtNzAzNC00ODA3LWJkMGMtYWQ4MTNlYTUzNGE1IiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9",
  liveApp: "https://apple-demo.lovable.app",
  kaggleDataset:
    "https://www.kaggle.com/datasets/amangarg08/apple-retail-sales-dataset",
  github: "https://github.com/Edambi12/apple-sales-bi-platform",
  githubDocs: "https://github.com/Edambi12/apple-sales-bi-platform/tree/main/docs",
  githubPowerBi:
    "https://github.com/Edambi12/apple-sales-bi-platform/tree/main/powerbi",
} as const;

/** Builds a link to a documentation file in the GitHub repository. */
export const docUrl = (path: string): string =>
  `${LINKS.github}/blob/main/${path}`;

export const PROJECT = {
  title: "Apple Retail Sales Analytics",
  subtitle: "An End-to-End Business Intelligence Case Study Using Power BI",
  author: "Edam Ketata",
  disclaimer:
    "Independent educational project based on a third-party Kaggle dataset. Not affiliated with, endorsed by, or representing the actual business data of Apple Inc.",
} as const;
