import type { BrandHealthStatus } from "../../domain/brandStatus";

interface StatusBadgeProps {
  status: BrandHealthStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${status.toLowerCase()}`}>{status}</span>;
}
