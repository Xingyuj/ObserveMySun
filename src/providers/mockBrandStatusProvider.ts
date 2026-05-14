import { SUNCORP_BRANDS } from "../config/brands";
import type { BrandHealthStatus, BrandStatus, BrandStatusProvider } from "../domain/brandStatus";

const brandOrder = new Map(SUNCORP_BRANDS.map((brand, index) => [brand.brandId, index]));
const validStatuses: BrandHealthStatus[] = ["HEALTHY", "WARNING", "CRITICAL"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isBrandHealthStatus(value: unknown): value is BrandHealthStatus {
  return typeof value === "string" && validStatuses.includes(value as BrandHealthStatus);
}

function isBrandStatus(value: unknown): value is BrandStatus {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.brandId === "string" &&
    typeof value.brandName === "string" &&
    isBrandHealthStatus(value.status) &&
    typeof value.availability === "number" &&
    typeof value.errorRate === "number" &&
    typeof value.p95LatencyMs === "number" &&
    typeof value.activeProblems === "number" &&
    typeof value.lastUpdated === "string"
  );
}

export const mockBrandStatusProvider: BrandStatusProvider = {
  async getBrandStatuses(): Promise<BrandStatus[]> {
    const response = await fetch("/brand-status.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Failed to load brand status data (${response.status})`);
    }

    const payload: unknown = await response.json();

    if (!Array.isArray(payload) || !payload.every(isBrandStatus)) {
      throw new Error("Brand status data is not in the expected format.");
    }

    return [...payload].sort((left, right) => {
      const leftOrder = brandOrder.get(left.brandId) ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = brandOrder.get(right.brandId) ?? Number.MAX_SAFE_INTEGER;
      return leftOrder - rightOrder;
    });
  },
};
