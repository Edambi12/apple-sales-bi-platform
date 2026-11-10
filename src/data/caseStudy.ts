/**
 * Verified case-study figures.
 *
 * Every number in this file was recomputed from the data stored in the
 * project's Power BI model (projet APPLE.pbix) and cross-checked against the
 * project presentation. Nothing here is estimated or invented.
 *
 * "Sales value" is always products[Price] x sales[quantity]. The source
 * dataset does not state a currency, so values are expressed in dataset units.
 */

export interface SourceTable {
  file: string;
  role: string;
  rows: number;
  grain: string;
  primaryKey: string;
  foreignKeys: string[];
  columns: string[];
}

export interface RankedValue {
  label: string;
  value: number;
  /** Share of the total, 0-1. */
  share?: number;
  note?: string;
}

export interface KpiDefinition {
  name: string;
  formula: string;
  result: string;
  /** Whether the KPI exists as a measure in the published report. */
  status: "In report" | "Documented" | "Corrected definition";
  note: string;
}

export interface Relationship {
  from: string;
  to: string;
  cardinality: string;
  filter: string;
  note: string;
}

export const TOTALS = {
  salesRows: 1_040_200,
  unitsSold: 5_721_344,
  salesValue: 6_166_293_030,
  avgUnitsPerSale: 5.5,
  products: 89,
  categories: 10,
  stores: 75,
  cities: 47,
  countries: 19,
  claims: 30_000,
  completedClaims: 7_466,
  completedClaimShare: 0.2489,
  claimsPerSale: 0.0288,
  salesPeriod: "1 Jan 2020 – 12 Nov 2024",
  claimsPeriod: "1 Jan 2024 – 12 Nov 2024",
} as const;

export const SOURCE_TABLES: SourceTable[] = [
  {
    file: "sales.csv",
    role: "Fact table — one row per sale line",
    rows: 1_040_200,
    grain: "One sale (sale_id) of one product in one store on one date",
    primaryKey: "sale_id",
    foreignKeys: ["store_id → stores", "product_id → products"],
    columns: ["sale_id", "sale_date", "store_id", "product_id", "quantity"],
  },
  {
    file: "products.csv",
    role: "Product dimension with list price",
    rows: 89,
    grain: "One product",
    primaryKey: "Product_ID",
    foreignKeys: ["Category_ID → category"],
    columns: ["Product_ID", "Product_Name", "Category_ID", "Launch_Date", "Price"],
  },
  {
    file: "category.csv",
    role: "Category lookup (snowflaked from products)",
    rows: 10,
    grain: "One product category",
    primaryKey: "category_id",
    foreignKeys: [],
    columns: ["category_id", "category_name"],
  },
  {
    file: "stores.csv",
    role: "Store and geography dimension",
    rows: 75,
    grain: "One store",
    primaryKey: "Store_ID",
    foreignKeys: [],
    columns: ["Store_ID", "Store_Name", "City", "Country"],
  },
  {
    file: "warranty.csv",
    role: "Warranty claims linked to a sale",
    rows: 30_000,
    grain: "One warranty claim",
    primaryKey: "claim_id",
    foreignKeys: ["sale_id → sales"],
    columns: ["claim_id", "claim_date", "sale_id", "repair_status"],
  },
];

export const RELATIONSHIPS: Relationship[] = [
  {
    from: "category[category_id]",
    to: "products[Category_ID]",
    cardinality: "1 : many",
    filter: "Single (category filters products)",
    note: "Snowflaked lookup: category is one step removed from the fact table.",
  },
  {
    from: "products[Product_ID]",
    to: "sales[product_id]",
    cardinality: "1 : many",
    filter: "Single (products filters sales)",
    note: "Gives each sale its list price and category.",
  },
  {
    from: "stores[Store_ID]",
    to: "sales[store_id]",
    cardinality: "1 : many",
    filter: "Single (stores filters sales)",
    note: "Gives each sale its city and country.",
  },
  {
    from: "sales[sale_id]",
    to: "warranty[sale_id]",
    cardinality: "1 : 1 in Power BI (logically 1 : 0..1)",
    filter: "Both directions",
    note: "Each claim references exactly one sale; only 2.9% of sales have a claim.",
  },
];

export const CATEGORY_VALUE: RankedValue[] = [
  { label: "Tablet", value: 953_443_623, share: 0.1546 },
  { label: "Accessories", value: 927_115_953, share: 0.1504 },
  { label: "Smartphone", value: 865_147_932, share: 0.1403 },
  { label: "Audio", value: 794_980_579, share: 0.1289 },
  { label: "Laptop", value: 763_382_551, share: 0.1238 },
  { label: "Wearable", value: 667_537_447, share: 0.1083 },
  { label: "Desktop", value: 538_481_345, share: 0.0873 },
  { label: "Subscription Service", value: 368_463_489, share: 0.0598 },
  { label: "Streaming Device", value: 191_622_603, share: 0.0311 },
  { label: "Smart Speaker", value: 96_117_508, share: 0.0156 },
];

export const CATEGORY_UNITS: RankedValue[] = [
  { label: "Accessories", value: 899_734 },
  { label: "Smartphone", value: 834_006 },
  { label: "Audio", value: 707_354 },
  { label: "Tablet", value: 645_303 },
  { label: "Desktop", value: 642_140 },
  { label: "Laptop", value: 640_336 },
  { label: "Wearable", value: 582_445 },
  { label: "Subscription Service", value: 447_062 },
  { label: "Streaming Device", value: 192_534 },
  { label: "Smart Speaker", value: 130_430 },
];

export const COUNTRY_VALUE: RankedValue[] = [
  { label: "United States", value: 1_234_842_804, share: 0.2003, note: "15 stores" },
  { label: "Australia", value: 577_191_700, share: 0.0936, note: "7 stores" },
  { label: "China", value: 575_151_496, share: 0.0933, note: "7 stores" },
  { label: "Japan", value: 495_948_710, share: 0.0804, note: "6 stores" },
  { label: "UAE", value: 412_424_721, share: 0.0669, note: "5 stores" },
  { label: "Canada", value: 410_740_833, share: 0.0666, note: "5 stores" },
  { label: "United Kingdom", value: 328_969_720, share: 0.0534, note: "4 stores" },
  { label: "France", value: 325_659_768, share: 0.0528, note: "4 stores" },
  { label: "Germany", value: 248_821_585, share: 0.0404, note: "3 stores" },
  { label: "Mexico", value: 245_375_347, share: 0.0398, note: "3 stores" },
];

/** Remaining nine countries, grouped so the chart stays readable. */
export const COUNTRY_VALUE_OTHER: RankedValue = {
  label: "9 other countries",
  value: 1_311_166_346,
  share: 0.2126,
  note: "16 stores",
};

export const YEARLY_VALUE: RankedValue[] = [
  { label: "2020", value: 1_269_455_486 },
  { label: "2021", value: 1_264_515_755 },
  { label: "2022", value: 1_269_424_007 },
  { label: "2023", value: 1_261_440_123 },
  { label: "2024", value: 1_101_457_659, note: "Partial year: 1 Jan – 12 Nov" },
];

export const YOY = {
  window: "1 Jan – 12 Nov",
  value2024: 1_101_457_659,
  value2023: 1_093_003_974,
  valueChange: 0.0077,
  units2024: 1_021_551,
  units2023: 1_015_089,
  unitsChange: 0.0064,
  /** What a naive full-2023 vs partial-2024 comparison shows. */
  naiveChange: -0.1268,
} as const;

export const WARRANTY_STATUS: RankedValue[] = [
  { label: "In Progress", value: 7_611, share: 0.2537 },
  { label: "Pending", value: 7_566, share: 0.2522 },
  { label: "Completed", value: 7_466, share: 0.2489 },
  { label: "Rejected", value: 7_357, share: 0.2452 },
];

export const WARRANTY_BY_CATEGORY: RankedValue[] = [
  { label: "Accessories", value: 4_650 },
  { label: "Smartphone", value: 4_434 },
  { label: "Audio", value: 3_768 },
  { label: "Tablet", value: 3_397 },
  { label: "Laptop", value: 3_384 },
  { label: "Desktop", value: 3_372 },
  { label: "Wearable", value: 2_986 },
  { label: "Subscription Service", value: 2_374 },
  { label: "Streaming Device", value: 940 },
  { label: "Smart Speaker", value: 695 },
];

export const KPIS: KpiDefinition[] = [
  {
    name: "Estimated Sales Value",
    formula: "SUMX ( sales, sales[quantity] * RELATED ( products[Price] ) )",
    result: "6.17B dataset units",
    status: "In report",
    note: "Measure [CA global]. A list-price proxy, not audited revenue. No currency is stated in the source.",
  },
  {
    name: "Units Sold",
    formula: "SUM ( sales[quantity] )",
    result: "5,721,344",
    status: "In report",
    note: "Shown on the Overview page as an implicit sum of quantity.",
  },
  {
    name: "Transactions",
    formula: "DISTINCTCOUNT ( sales[sale_id] )",
    result: "1,040,200",
    status: "Documented",
    note: "sale_id is unique, so this equals the row count. Not yet a measure in the report.",
  },
  {
    name: "Average Units per Sale",
    formula: "DIVIDE ( [Units Sold], [Transactions] )",
    result: "5.50",
    status: "Documented",
    note: "A volume average, not a monetary basket value. Not yet a measure in the report.",
  },
  {
    name: "Completed Warranty Claims Share",
    formula:
      'DIVIDE ( CALCULATE ( COUNTROWS ( warranty ), warranty[repair_status] = "Completed" ), COUNTROWS ( warranty ) )',
    result: "24.89%",
    status: "In report",
    note: "Measure [% SAV completed]: 7,466 of 30,000 claims.",
  },
  {
    name: "Claims per Sale",
    formula: "DIVIDE ( COUNTROWS ( warranty ), COUNTROWS ( sales ) )",
    result: "2.88%",
    status: "In report",
    note: "Measure [Taux de réclamation]. Claims were only recorded during 2024, against sales from 2020–2024, so this is a share of sale lines with a recorded claim — not a product failure rate.",
  },
  {
    name: "Comparable Year-over-Year Change",
    formula: "2024 YTD ÷ 2023 YTD − 1, both limited to 1 Jan – 12 Nov",
    result: "+0.77% value · +0.64% units",
    status: "Corrected definition",
    note: "The published measure compares partial 2024 with full 2023 and shows −12.7%. The like-for-like window gives +0.77%.",
  },
];

export const BUSINESS_QUESTIONS = [
  {
    title: "Sales performance",
    question:
      "How do sales value, unit volume and transactions evolve from 2020 to 2024?",
  },
  {
    title: "Product performance",
    question:
      "Which categories and products contribute most to value, and does value leadership match volume leadership?",
  },
  {
    title: "Geographical analysis",
    question: "Which countries and cities concentrate the most sales value?",
  },
  {
    title: "Store performance",
    question: "How is performance spread across the 75 stores of the network?",
  },
  {
    title: "Warranty analysis",
    question:
      "How are warranty claims distributed by repair status, product category and country?",
  },
] as const;

export const PREPARATION_STEPS = [
  {
    step: "Extract",
    tool: "Kaggle → local CSV",
    detail:
      "Download the five CSV files (sales, products, category, stores, warranty) from the Kaggle dataset.",
  },
  {
    step: "Transform",
    tool: "Power Query",
    detail:
      "For each file: read with Csv.Document, promote the first row to headers, and assign explicit data types (text keys, date columns, whole-number quantity and price).",
  },
  {
    step: "Load",
    tool: "Power BI import model",
    detail:
      "Load the five typed tables into the in-memory model. No table is merged or denormalised in Power Query.",
  },
  {
    step: "Model",
    tool: "Model view + DAX",
    detail:
      "Relate the tables on their keys, then add calculated columns (year, month, line value) and measures for the KPIs.",
  },
  {
    step: "Report",
    tool: "Power BI report",
    detail:
      "Build three pages — Overview, Distribution and SAV (after-sales) — with cards, slicers, maps and charts, then publish to the web.",
  },
] as const;

export const DATA_QUALITY_CHECKS = [
  { check: "Primary keys unique in all five tables", result: "Pass" },
  { check: "Foreign keys without a matching parent row", result: "0 orphans" },
  { check: "Null values across all source columns", result: "0" },
  { check: "Fully duplicated rows", result: "0" },
  {
    check: "Warranty claims dated before their linked sale",
    result: "2,687 (8.96%)",
  },
  {
    check: "Sales dated before the product's launch date",
    result: "493,143 (47.4%)",
  },
  {
    check: "Store names shared by two different store IDs",
    result: "6 names (12 stores)",
  },
  {
    check: "Product names shared by two different product IDs",
    result: "1 (HomePod mini)",
  },
] as const;

export const LIMITATIONS = [
  "No currency is stated in the dataset: sales value is a list-price × quantity proxy in dataset units, not revenue in any currency.",
  "No cost, discount or tax fields: profit and margin cannot be calculated.",
  "No repair completion date: repair-processing time cannot be measured.",
  "Warranty claims cover 2024 only, while sales cover 2020–2024.",
  "2024 is a partial year (ends 12 Nov): full-year comparisons are misleading.",
  "Uniform quantities and date inconsistencies indicate the data is very likely synthetic.",
] as const;

const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 2,
});
const integer = new Intl.NumberFormat("en-US");

export const formatCompact = (n: number): string => compact.format(n);
export const formatInteger = (n: number): string => integer.format(n);
export const formatPercent = (ratio: number, digits = 1): string =>
  `${(ratio * 100).toFixed(digits)}%`;
export const formatSignedPercent = (ratio: number, digits = 2): string =>
  `${ratio >= 0 ? "+" : "−"}${Math.abs(ratio * 100).toFixed(digits)}%`;
