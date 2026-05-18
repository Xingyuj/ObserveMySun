import type { BrandStatus } from "../../domain/brandStatus";
import { BrandIcon } from "./BrandIcon";
import { StatusBadge } from "./StatusBadge";

interface BrandStatusGridProps {
  statuses: BrandStatus[];
}

export function BrandStatusGrid({ statuses }: BrandStatusGridProps) {
  const warningStatuses = statuses.filter((brand) => brand.status !== "HEALTHY");
  const healthyStatuses = statuses.filter((brand) => brand.status === "HEALTHY");

  return (
    <div className="brand-table-stack">
      <BrandStatusTable title="Monitoring" tone="warning" statuses={warningStatuses} />
      <BrandStatusTable title="Healthy" tone="healthy" statuses={healthyStatuses} />
    </div>
  );
}

interface BrandStatusTableProps {
  title: string;
  tone: "healthy" | "warning";
  statuses: BrandStatus[];
}

function BrandStatusTable({ title, tone, statuses }: BrandStatusTableProps) {
  return (
    <section className={`brand-table-panel brand-table-panel--${tone}`} aria-label={`${title} brand statuses`}>
      <header className="brand-table-panel__header">
        <strong>{title}</strong>
      </header>
      <div className="brand-table-scroll">
        <table className="brand-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Status</th>
              <th>Availability</th>
              <th>Error Rate</th>
              <th>P95 Latency</th>
              <th>Active Problems</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map((brand) => (
              <tr key={brand.brandId}>
                <td>
                  <div className="brand-table__brand">
                    <BrandIcon brandId={brand.brandId} brandName={brand.brandName} />
                    <a href="/">{brand.brandName}</a>
                  </div>
                </td>
                <td>
                  <StatusBadge status={brand.status} />
                </td>
                <td>{brand.availability.toFixed(2)}%</td>
                <td>{brand.errorRate.toFixed(2)}%</td>
                <td>{brand.p95LatencyMs.toLocaleString("en-AU")} ms</td>
                <td>{brand.activeProblems}</td>
                <td>{formatTimestamp(brand.lastUpdated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatTimestamp(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
