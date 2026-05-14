import type { BrandStatus } from "../domain/brandStatus";
import { BrandStatusCard } from "./BrandStatusCard";

interface BrandStatusGridProps {
  statuses: BrandStatus[];
}

export function BrandStatusGrid({ statuses }: BrandStatusGridProps) {
  return (
    <section className="brand-grid" aria-label="Brand status cards">
      {statuses.map((brand) => (
        <BrandStatusCard key={brand.brandId} brand={brand} />
      ))}
    </section>
  );
}
