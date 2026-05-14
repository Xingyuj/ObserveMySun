interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section className="state-panel state-panel--error" role="alert">
      <div>
        <h2>Unable to load brand status</h2>
        <p>{message}</p>
      </div>
      <button className="secondary-button" type="button" onClick={onRetry}>
        Try again
      </button>
    </section>
  );
}
