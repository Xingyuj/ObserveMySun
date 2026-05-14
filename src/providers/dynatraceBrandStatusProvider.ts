import type { BrandStatus, BrandStatusProvider } from "../domain/brandStatus";

export const dynatraceBrandStatusProvider: BrandStatusProvider = {
  async getBrandStatuses(): Promise<BrandStatus[]> {
    // Later this provider will call a Dynatrace AppEngine App Function backed by DQL queries.
    throw new Error("dynatraceBrandStatusProvider is not implemented yet.");
  },
};
