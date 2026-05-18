import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrandStatusGrid } from "../components/brand-status/BrandStatusGrid";
import { BrandStatusSummary } from "../components/brand-status/BrandStatusSummary";
import { ErrorState } from "../components/brand-status/ErrorState";
import { LoadingState } from "../components/brand-status/LoadingState";
import type { BrandStatus } from "../domain/brandStatus";
import { mockBrandStatusProvider } from "../providers/mockBrandStatusProvider";

const refreshIntervalMs = 60_000;

export function SuncorpBrandStatusDashboard() {
  const provider = useMemo(() => mockBrandStatusProvider, []);
  const hasLoadedStatuses = useRef(false);
  const [statuses, setStatuses] = useState<BrandStatus[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStatuses = useCallback(async () => {
    const hasExistingData = hasLoadedStatuses.current;
    setErrorMessage(null);
    setIsLoading(!hasExistingData);

    try {
      const nextStatuses = await provider.getBrandStatuses();
      setStatuses(nextStatuses);
      hasLoadedStatuses.current = true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [provider]);

  useEffect(() => {
    void loadStatuses();
  }, [loadStatuses]);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      void loadStatuses();
    }, refreshIntervalMs);

    return () => window.clearInterval(timerId);
  }, [loadStatuses]);

  return (
    <main className="dashboard-content">
      <header className="page-heading">
        <div>
          <h1>Brand Status Updates</h1>
        </div>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Overview</a>
          <span aria-hidden="true">›</span>
          <strong>Brand Status Updates</strong>
        </nav>
      </header>

      {isLoading ? (
        <LoadingState />
      ) : errorMessage ? (
        <ErrorState message={errorMessage} onRetry={() => void loadStatuses()} />
      ) : (
        <>
          <BrandStatusSummary statuses={statuses} />
          <BrandStatusGrid statuses={statuses} />
        </>
      )}
    </main>
  );
}
