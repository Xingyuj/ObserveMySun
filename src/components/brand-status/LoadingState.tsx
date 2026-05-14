export function LoadingState() {
  return (
    <section className="state-panel" aria-live="polite">
      <div className="loading-dot" aria-hidden="true" />
      <p>Loading brand health status...</p>
    </section>
  );
}
