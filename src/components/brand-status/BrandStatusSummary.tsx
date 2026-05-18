import type { BrandStatus } from "../../domain/brandStatus";

interface BrandStatusSummaryProps {
  statuses: BrandStatus[];
}

export function BrandStatusSummary({ statuses }: BrandStatusSummaryProps) {
  const healthyCount = statuses.filter((brand) => brand.status === "HEALTHY").length;
  const warningCount = statuses.filter((brand) => brand.status === "WARNING").length;
  const criticalCount = statuses.filter((brand) => brand.status === "CRITICAL").length;

  return (
    <section className="status-overview" aria-label="Brand status summary">
      <div className="status-overview__copy">
        <h2>Brand Health</h2>
        <p>Brand incidents are color coded by priority. Healthy brands are green, monitoring brands are yellow, and critical brands are red.</p>
      </div>
      <div className="summary-grid">
        <SummaryItem label="Total Brands" value={statuses.length} tone="neutral" />
      <SummaryItem label="Healthy" value={healthyCount} tone="healthy" />
      <SummaryItem label="Warning" value={warningCount} tone="warning" />
      <SummaryItem label="Critical" value={criticalCount} tone="critical" />
      </div>
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
      <strong className="summary-item__label">{label}</strong>
      <span className="summary-item__value">{value}</span>
    </div>
  );
}
