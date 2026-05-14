export type BrandHealthStatus = "HEALTHY" | "WARNING" | "CRITICAL";

export interface BrandStatus {
  brandId: string;
  brandName: string;
  status: BrandHealthStatus;
  availability: number;
  errorRate: number;
  p95LatencyMs: number;
  activeProblems: number;
  lastUpdated: string;
}

export interface BrandStatusProvider {
  getBrandStatuses(): Promise<BrandStatus[]>;
}
