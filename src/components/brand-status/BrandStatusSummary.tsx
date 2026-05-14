import type { BrandStatus } from "../../domain/brandStatus";

interface BrandStatusSummaryProps {
  statuses: BrandStatus[];
}

export function BrandStatusSummary({ statuses }: BrandStatusSummaryProps) {
  const healthyCount = statuses.filter((brand) => brand.status === "HEALTHY").length;
  const warningCount = statuses.filter((brand) => brand.status === "WARNING").length;
  const criticalCount = statuses.filter((brand) => brand.status === "CRITICAL").length;

  return (
    <section className="summary-grid" aria-label="Brand status summary">
      <SummaryItem label="Total brands" value={statuses.length} tone="neutral" />
      <SummaryItem label="Healthy" value={healthyCount} tone="healthy" />
      <SummaryItem label="Warning" value={warningCount} tone="warning" />
      <SummaryItem label="Critical" value={criticalCount} tone="critical" />
    </section>
  );
}

interface SummaryItemProps {
  label: string;
  value: number;
  tone: "neutral" | "healthy" | "warning" | "critical";
}

function SummaryItem({ label, value, tone }: SummaryItemProps) {
  return (
    <div className={`summary-item summary-item--${tone}`}>
      <span className="summary-item__label">{label}</span>
      <strong className="summary-item__value">{value}</strong>
    </div>
  );
}
