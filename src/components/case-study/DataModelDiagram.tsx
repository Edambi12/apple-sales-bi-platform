interface TableBox {
  name: string;
  role: string;
  x: number;
  y: number;
  fields: { name: string; key?: "PK" | "FK" }[];
  fact?: boolean;
}

const W = 190;
const ROW = 20;
const HEAD = 44;

const TABLES: TableBox[] = [
  {
    name: "category",
    role: "Lookup · 10 rows",
    x: 10,
    y: 30,
    fields: [{ name: "category_id", key: "PK" }, { name: "category_name" }],
  },
  {
    name: "products",
    role: "Dimension · 89 rows",
    x: 265,
    y: 10,
    fields: [
      { name: "Product_ID", key: "PK" },
      { name: "Category_ID", key: "FK" },
      { name: "Product_Name" },
      { name: "Launch_Date" },
      { name: "Price" },
    ],
  },
  {
    name: "sales",
    role: "Fact · 1,040,200 rows",
    x: 520,
    y: 10,
    fact: true,
    fields: [
      { name: "sale_id", key: "PK" },
      { name: "product_id", key: "FK" },
      { name: "store_id", key: "FK" },
      { name: "sale_date" },
      { name: "quantity" },
    ],
  },
  {
    name: "stores",
    role: "Dimension · 75 rows",
    x: 265,
    y: 215,
    fields: [
      { name: "Store_ID", key: "PK" },
      { name: "Store_Name" },
      { name: "City" },
      { name: "Country" },
    ],
  },
  {
    name: "warranty",
    role: "Claims · 30,000 rows",
    x: 520,
    y: 215,
    fields: [
      { name: "claim_id", key: "PK" },
      { name: "sale_id", key: "FK" },
      { name: "claim_date" },
      { name: "repair_status" },
    ],
  },
];

const boxHeight = (t: TableBox) => HEAD + t.fields.length * ROW + 8;

function Table({ table }: { table: TableBox }) {
  const h = boxHeight(table);
  return (
    <g transform={`translate(${table.x} ${table.y})`}>
      <rect
        width={W}
        height={h}
        rx={10}
        className={table.fact ? "fill-primary/10 stroke-primary" : "fill-card stroke-border"}
        strokeWidth={table.fact ? 1.5 : 1}
      />
      <text x={12} y={20} className="fill-foreground text-[13px] font-semibold">
        {table.name}
      </text>
      <text x={12} y={35} className="fill-muted-foreground text-[10px]">
        {table.role}
      </text>
      <line x1={0} x2={W} y1={HEAD} y2={HEAD} className="stroke-border" />
      {table.fields.map((f, i) => (
        <g key={f.name} transform={`translate(12 ${HEAD + 16 + i * ROW})`}>
          <text className="fill-foreground text-[11px]">{f.name}</text>
          {f.key && (
            <text
              x={W - 24}
              textAnchor="end"
              className={
                f.key === "PK"
                  ? "fill-primary text-[9px] font-semibold"
                  : "fill-muted-foreground text-[9px] font-semibold"
              }
            >
              {f.key}
            </text>
          )}
        </g>
      ))}
    </g>
  );
}

function Link({ d, from, to, fx, fy, tx, ty }: {
  d: string; from: string; to: string; fx: number; fy: number; tx: number; ty: number;
}) {
  return (
    <g>
      <path d={d} fill="none" className="stroke-foreground/50" strokeWidth={1.5} />
      <text x={fx} y={fy} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {from}
      </text>
      <text x={tx} y={ty} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {to}
      </text>
    </g>
  );
}

/**
 * Relationship diagram of the implemented Power BI model, redrawn from the
 * model view of the .pbix file. Cardinalities and filter directions are listed
 * in the table next to it for readers who cannot use the graphic.
 */
export function DataModelDiagram() {
  return (
    <figure>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 720 350"
          role="img"
          aria-labelledby="model-diagram-title model-diagram-desc"
          className="w-full min-w-[620px] h-auto font-sans"
        >
          <title id="model-diagram-title">Implemented Power BI data model</title>
          <desc id="model-diagram-desc">
            Category relates one-to-many to products. Products and stores each
            relate one-to-many to the sales fact table. Sales relates one-to-one
            to warranty with filtering in both directions.
          </desc>
          {/* category -> products */}
          <Link d="M200 70 H265" from="1" to="*" fx={210} fy={63} tx={255} ty={63} />
          {/* products -> sales */}
          <Link d="M455 70 H520" from="1" to="*" fx={465} fy={63} tx={510} ty={63} />
          {/* stores -> sales */}
          <Link d="M455 255 H488 V120 H520" from="1" to="*" fx={465} fy={248} tx={510} ty={113} />
          {/* sales <-> warranty */}
          <Link d="M615 162 V215" from="1" to="1" fx={626} fy={177} tx={626} ty={210} />
          <text x={604} y={193} textAnchor="end" className="fill-muted-foreground text-[10px]">
            both directions
          </text>
          {TABLES.map((t) => (
            <Table key={t.name} table={t} />
          ))}
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-muted-foreground">
        Redrawn from the Model view of the project's .pbix file. PK = primary
        key, FK = foreign key, * = many side.
      </figcaption>
    </figure>
  );
}
