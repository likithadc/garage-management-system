import React from "react";
import { useNavigate } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap');

  :root {
    --bg:        #0f1117;
    --surface:   #161b25;
    --surface2:  #1e2535;
    --border:    #2a3347;
    --accent:    #f59e0b;
    --accent2:   #ef4444;
    --green:     #22c55e;
    --text:      #e8ecf4;
    --muted:     #6b7a99;
    --radius:    12px;
    --font-head: 'Barlow Condensed', sans-serif;
    --font-body: 'Barlow', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .dp-page {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,158,11,0.07) 0%, transparent 70%),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(42,51,71,0.4) 39px, rgba(42,51,71,0.4) 40px),
      repeating-linear-gradient(180deg, transparent, transparent 39px, rgba(42,51,71,0.4) 39px, rgba(42,51,71,0.4) 40px);
    font-family: var(--font-body);
    color: var(--text);
    display: flex;
    flex-direction: column;
  }

  /* ── Top bar ── */
  .dp-topbar {
    background: linear-gradient(135deg, #0a0d14 0%, #131828 100%);
    border-bottom: 2px solid var(--accent);
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 24px rgba(0,0,0,0.5);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .dp-brand {
    font-family: var(--font-head);
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 3px;
    color: var(--accent);
    text-transform: uppercase;
  }
  .dp-brand span { color: var(--text); }
  .dp-topbar-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .dp-shop-pill {
    font-family: var(--font-head);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--accent);
    background: rgba(245,158,11,0.1);
    border: 1px solid rgba(245,158,11,0.3);
    padding: 5px 14px;
    border-radius: 20px;
  }
  .dp-logout-btn {
    font-family: var(--font-head);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 5px 14px;
    cursor: pointer;
    transition: all 0.18s;
  }
  .dp-logout-btn:hover {
    color: var(--accent2);
    border-color: rgba(239,68,68,0.4);
    background: rgba(239,68,68,0.06);
  }

  /* ── Body ── */
  .dp-body {
    flex: 1;
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
    padding: 48px 24px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  /* ── Welcome banner ── */
  .dp-welcome {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .dp-welcome-text {}
  .dp-greeting {
    font-size: 14px;
    color: var(--muted);
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 6px;
  }
  .dp-shop-name {
    font-family: var(--font-head);
    font-size: 44px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 1;
    color: var(--text);
  }
  .dp-shop-name span { color: var(--accent); }
  .dp-date {
    font-size: 13px;
    color: var(--muted);
    text-align: right;
    font-weight: 400;
    line-height: 1.6;
  }

  /* ── Section label ── */
  .dp-section-label {
    font-family: var(--font-head);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .dp-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── Action cards grid ── */
  .dp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }

  .dp-action-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px 24px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: relative;
    overflow: hidden;
  }
  .dp-action-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s;
  }
  .dp-action-card:hover {
    border-color: rgba(245,158,11,0.3);
    background: var(--surface2);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  .dp-action-card:hover::before {
    transform: scaleX(1);
  }
  .dp-action-card.green::before { background: var(--green); }
  .dp-action-card.green:hover   { border-color: rgba(34,197,94,0.3); }

  .dp-card-icon {
    font-size: 32px;
    line-height: 1;
  }
  .dp-card-content {}
  .dp-card-title {
    font-family: var(--font-head);
    font-size: 22px;
    font-weight: 900;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text);
    margin-bottom: 4px;
  }
  .dp-card-desc {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.5;
  }
  .dp-card-arrow {
    font-family: var(--font-head);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--accent);
    margin-top: auto;
    opacity: 0;
    transform: translateX(-6px);
    transition: all 0.2s;
  }
  .dp-action-card.green .dp-card-arrow { color: var(--green); }
  .dp-action-card:hover .dp-card-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* ── Status bar ── */
  .dp-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--muted);
  }
  .dp-status-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 8px rgba(34,197,94,0.6);
    flex-shrink: 0;
  }

  @media (max-width: 860px) {
    .dp-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 560px) {
    .dp-topbar    { padding: 14px 18px; }
    .dp-brand     { font-size: 20px; }
    .dp-shop-name { font-size: 32px; }
    .dp-grid      { grid-template-columns: 1fr; }
    .dp-body      { padding: 32px 16px; }
  }
`;

function DashboardPage() {

  const navigate  = useNavigate();
  const shopName  = localStorage.getItem("shop_name") || "Garage";

  const now  = new Date();
  const date = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <style>{css}</style>

      <div className="dp-page">

        {/* ── Top bar ── */}
        <div className="dp-topbar">
          <div className="dp-brand">Auto<span>Track</span></div>
          <div className="dp-topbar-right">
            <div className="dp-shop-pill">{shopName}</div>
            <button className="dp-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="dp-body">

          {/* ── Welcome banner ── */}
          <div className="dp-welcome">
            <div className="dp-welcome-text">
              <div className="dp-greeting">Welcome back</div>
              <div className="dp-shop-name">
                {shopName.split(" ")[0]}<br />
                <span>{shopName.split(" ").slice(1).join(" ") || "Dashboard"}</span>
              </div>
            </div>
            <div className="dp-date">
              {date}<br />{time}
            </div>
          </div>

          {/* ── Quick Actions ── */}
          <div>
            <div className="dp-section-label">Quick Actions</div>
            <div className="dp-grid">

              <div
                className="dp-action-card"
                onClick={() => navigate("/add-customer")}
              >
                <div className="dp-card-icon">➕</div>
                <div className="dp-card-content">
                  <div className="dp-card-title">Add Customer</div>
                  <div className="dp-card-desc">Register a new vehicle and owner into the system</div>
                </div>
                <div className="dp-card-arrow">Open →</div>
              </div>

              <div
                className="dp-action-card green"
                onClick={() => navigate("/search-customer")}
              >
                <div className="dp-card-icon">🔍</div>
                <div className="dp-card-content">
                  <div className="dp-card-title">Search Customer</div>
                  <div className="dp-card-desc">Find a customer by phone number and start a service</div>
                </div>
                <div className="dp-card-arrow">Open →</div>
              </div>

            </div>
          </div>

          <div
            className="dp-action-card"
            style={{"--card-accent": "var(--accent)"}}
            onClick={() => navigate("/bill-lookup")}
          >
            <div className="dp-card-icon">🧾</div>
            <div className="dp-card-content">
              <div className="dp-card-title">Retrieve Bill</div>
              <div className="dp-card-desc">Search by phone to pull up a saved bill for payment collection</div>
            </div>
            <div className="dp-card-arrow">Open →</div>
          </div>

          {/* ── Status ── */}
          <div className="dp-status">
            <div className="dp-status-dot" />
            Server connected · {shopName}
          </div>

        </div>
      </div>
    </>
  );
}

export default DashboardPage;