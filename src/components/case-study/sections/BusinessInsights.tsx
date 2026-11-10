import { Section, Panel, Callout } from "../Section";
import { BarList } from "../BarList";
import {
  CATEGORY_UNITS,
  CATEGORY_VALUE,
  COUNTRY_VALUE,
  COUNTRY_VALUE_OTHER,
  WARRANTY_BY_CATEGORY,
  WARRANTY_STATUS,
  YEARLY_VALUE,
  YOY,
  formatCompact,
  formatInteger,
  formatSignedPercent,
} from "@/data/caseStudy";

interface InsightProps {
  title: string;
  finding: string;
  unit: string;
  children: React.ReactNode;
}

function Insight({ title, finding, unit, children }: InsightProps) {
  return (
    <Panel className="flex flex-col">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      <p className="mt-2 text-lg font-semibold leading-snug text-balance">{finding}</p>
      <p className="mt-1 mb-5 text-xs text-muted-foreground">{unit}</p>
      {children}
    </Panel>
  );
}

export function BusinessInsights() {
  return (
    <Section
      id="insights"
      eyebrow="07 · Business insights"
      title="What the data shows"
      lead="Findings recomputed from the model's data. Sales value is list price × quantity, in dataset units."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Insight
          title="Category · value"
          finding="Tablets lead on sales value with 15.5% of the total, just ahead of Accessories."
          unit="Estimated sales value by category · dataset units · share of total"
        >
          <BarList label="Estimated sales value by product category" data={CATEGORY_VALUE} formatValue={formatCompact} showShare />
        </Insight>

        <Insight
          title="Category · volume"
          finding="Accessories lead on units sold — value leadership and volume leadership are not the same."
          unit="Units sold by category"
        >
          <BarList label="Units sold by product category" data={CATEGORY_UNITS} formatValue={formatInteger} />
        </Insight>

        <Insight
          title="Geography"
          finding="The United States generates 20% of sales value, in line with its 15 of 75 stores."
          unit="Estimated sales value by country, top 10 · dataset units · share of total"
        >
          <BarList
            label="Estimated sales value by country, top ten and others"
            data={[...COUNTRY_VALUE, COUNTRY_VALUE_OTHER]}
            formatValue={formatCompact}
            showShare
          />
          <p className="mt-4 text-xs text-muted-foreground">
            Value per store is nearly identical everywhere (about 80–85M per
            store), so country rank mostly reflects store count.
          </p>
        </Insight>

        <Insight
          title="Sales trend"
          finding="Sales are flat: about 1.26B per full year, and +0.77% for 2024 on a like-for-like basis."
          unit="Estimated sales value by year · dataset units"
        >
          <BarList label="Estimated sales value by year" data={YEARLY_VALUE} formatValue={formatCompact} muted={["2024"]} />
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-secondary/60 p-4">
              <dt className="text-xs text-muted-foreground">Comparable change, {YOY.window}</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums">{formatSignedPercent(YOY.valueChange)}</dd>
              <dd className="text-xs text-muted-foreground">units {formatSignedPercent(YOY.unitsChange)}</dd>
            </div>
            <div className="rounded-xl border border-dashed border-border p-4">
              <dt className="text-xs text-muted-foreground">Partial 2024 vs full 2023</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums text-muted-foreground line-through decoration-1">
                {formatSignedPercent(YOY.naiveChange, 1)}
              </dd>
              <dd className="text-xs text-muted-foreground">misleading: unequal periods</dd>
            </div>
          </dl>
        </Insight>

        <Insight
          title="After-sales · status"
          finding="The four repair statuses are almost evenly split; one claim in four is completed."
          unit="Warranty claims by repair status · 30,000 claims filed in 2024"
        >
          <BarList label="Warranty claims by repair status" data={WARRANTY_STATUS} formatValue={formatInteger} showShare />
        </Insight>

        <Insight
          title="After-sales · category"
          finding="Claims follow sales volume: Accessories and Smartphones account for the most claims."
          unit="Warranty claims by product category"
        >
          <BarList label="Warranty claims by product category" data={WARRANTY_BY_CATEGORY} formatValue={formatInteger} />
        </Insight>
      </div>

      <Callout title="Reading these results" className="mt-8">
        The even splits across stores, statuses and years are a property of this
        dataset. The value of the project is the method — modelling, KPI design
        and honest interpretation — rather than a surprising business finding.
      </Callout>
    </Section>
  );
}
