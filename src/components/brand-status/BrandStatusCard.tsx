import type { BrandStatus } from "../../domain/brandStatus";
import { BrandIcon } from "./BrandIcon";
import { StatusBadge } from "./StatusBadge";

interface BrandStatusCardProps {
  brand: BrandStatus;
}

const percentFormatter = new Intl.NumberFormat("en-AU", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const latencyFormatter = new Intl.NumberFormat("en-AU");

function formatLastUpdated(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function BrandStatusCard({ brand }: BrandStatusCardProps) {
  return (
    <article className={`brand-card brand-card--${brand.status.toLowerCase()}`}>
      <div className="brand-card__header">
        <div>
          <h2>{brand.brandName}</h2>
          <BrandIcon brandId={brand.brandId} brandName={brand.brandName} />
        </div>
        <StatusBadge status={brand.status} />
      </div>

      <dl className="metric-list">
        <Metric label="Availability" value={`${percentFormatter.format(brand.availability)}%`} />
        <Metric label="Error rate" value={`${percentFormatter.format(brand.errorRate)}%`} />
        <Metric label="P95 latency" value={`${latencyFormatter.format(brand.p95LatencyMs)} ms`} />
        <Metric label="Active problems" value={brand.activeProblems.toString()} />
      </dl>

      <p className="brand-card__updated">Last updated {formatLastUpdated(brand.lastUpdated)}</p>
    </article>
  );
}

interface MetricProps {
  label: string;
  value: string;
}

function Metric({ label, value }: MetricProps) {
  return (
    <div className="metric">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
