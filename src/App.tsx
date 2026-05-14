import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrandStatusGrid } from "./components/BrandStatusGrid";
import { ErrorState } from "./components/ErrorState";
import { LoadingState } from "./components/LoadingState";
import { SummaryBar } from "./components/SummaryBar";
import type { BrandStatus } from "./domain/brandStatus";
import { mockBrandStatusProvider } from "./providers/mockBrandStatusProvider";

const refreshIntervalMs = 60_000;

export default function App() {
  const provider = useMemo(() => mockBrandStatusProvider, []);
  const hasLoadedStatuses = useRef(false);
  const [statuses, setStatuses] = useState<BrandStatus[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadStatuses = useCallback(async () => {
    const hasExistingData = hasLoadedStatuses.current;
    setErrorMessage(null);
    setIsLoading(!hasExistingData);
    setIsRefreshing(hasExistingData);

    try {
      const nextStatuses = await provider.getBrandStatuses();
      setStatuses(nextStatuses);
      hasLoadedStatuses.current = true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
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
    <main className="app-shell">
      <header className="page-header">
        <div>
          <h1>Suncorp Brand Status Console</h1>
          <p>Standalone demo for brand-level operational health monitoring</p>
        </div>
        <button className="primary-button" type="button" onClick={() => void loadStatuses()} disabled={isRefreshing}>
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      {isLoading ? (
        <LoadingState />
      ) : errorMessage ? (
        <ErrorState message={errorMessage} onRetry={() => void loadStatuses()} />
      ) : (
        <>
          <SummaryBar statuses={statuses} />
          <BrandStatusGrid statuses={statuses} />
        </>
      )}
    </main>
  );
}
