import { SuncorpBrandStatusDashboard } from "./pages/SuncorpBrandStatusDashboard";

export default function App() {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar" aria-label="Primary navigation">
        <div className="sidebar-brand">
          <span className="sidebar-brand__mark">S</span>
          <div>
            <strong>Suncorp</strong>
            <span>Observability</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a className="sidebar-nav__item sidebar-nav__item--active" href="/" aria-current="page">
            <span className="sidebar-nav__icon" aria-hidden="true" />
            Brand Status
          </a>
        </nav>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <span className="dashboard-topbar__eyebrow">Operations dashboard</span>
            <strong>Suncorp Status</strong>
          </div>
          <div className="dashboard-topbar__meta">Mock data source</div>
        </header>

        <SuncorpBrandStatusDashboard />
      </div>
    </div>
  );
}
