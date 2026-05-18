import { FormEvent, useEffect, useMemo, useState } from "react";
import { SuncorpBrandStatusDashboard } from "./pages/SuncorpBrandStatusDashboard";

const storedUserNameKey = "observe-suncorp-user-name";
const defaultUserName = "Ethan";

export default function App() {
  const [userName, setUserName] = useState("");
  const [loginName, setLoginName] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    setUserName(window.localStorage.getItem(storedUserNameKey) ?? defaultUserName);
  }, []);

  const displayInitial = useMemo(() => {
    const normalizedName = userName.trim();
    return normalizedName ? normalizedName.charAt(0).toUpperCase() : "?";
  }, [userName]);

  function handleOpenLogin() {
    setLoginName(userName);
    setIsLoginOpen(true);
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextUserName = loginName.trim() || "Guest User";

    window.localStorage.setItem(storedUserNameKey, nextUserName);
    setUserName(nextUserName);
    setIsLoginOpen(false);
  }

  function handleLogout() {
    window.localStorage.removeItem(storedUserNameKey);
    setUserName("");
    setLoginName("");
  }

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar" aria-label="Primary navigation">
        <div className="sidebar-brand">
          <span className="sidebar-brand__mark" aria-hidden="true">
            <span />
          </span>
          <div>
            <strong>Observe Suncorp</strong>
            <span>See More, Know More</span>
          </div>
        </div>

        <p className="sidebar-section-label">Menu</p>
        <nav className="sidebar-nav">
          <a className="sidebar-nav__item" href="/">
            <span className="sidebar-nav__icon sidebar-nav__icon--grid" aria-hidden="true" />
            Overview
          </a>
          <a className="sidebar-nav__item sidebar-nav__item--active" href="/" aria-current="page">
            <span className="sidebar-nav__icon sidebar-nav__icon--users" aria-hidden="true" />
            Brands
          </a>
          <a className="sidebar-nav__item" href="/">
            <span className="sidebar-nav__icon sidebar-nav__icon--grid" aria-hidden="true" />
            Applications
          </a>
          <a className="sidebar-nav__item" href="/">
            <span className="sidebar-nav__icon sidebar-nav__icon--clock" aria-hidden="true" />
            Major Incident Updates
          </a>
          <a className="sidebar-nav__item" href="/">
            <span className="sidebar-nav__icon sidebar-nav__icon--users" aria-hidden="true" />
            OCM Roster
          </a>
        </nav>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-topbar__spacer" />
          {userName ? (
            <div className="user-menu">
              <div className="user-chip">
                <span aria-hidden="true">{displayInitial}</span>
                <strong>{userName}</strong>
              </div>
              <button className="text-button" type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="login-button" type="button" onClick={handleOpenLogin}>
              Login
            </button>
          )}
        </header>

        <SuncorpBrandStatusDashboard />
      </div>

      {isLoginOpen ? (
        <div className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
          <button className="login-modal__backdrop" type="button" aria-label="Close login" onClick={() => setIsLoginOpen(false)} />
          <form className="login-card" onSubmit={handleLogin}>
            <header>
              <h2 id="login-title">Login</h2>
              <p>Enter any name to continue.</p>
            </header>
            <label htmlFor="login-name">Name</label>
            <input
              id="login-name"
              autoFocus
              value={loginName}
              onChange={(event) => setLoginName(event.target.value)}
              placeholder="Ethan"
            />
            <div className="login-card__actions">
              <button className="secondary-button" type="button" onClick={() => setIsLoginOpen(false)}>
                Cancel
              </button>
              <button className="primary-button" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
