import React, { useState } from "react";
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

  .cs-page {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,158,11,0.07) 0%, transparent 70%),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(42,51,71,0.4) 39px, rgba(42,51,71,0.4) 40px),
      repeating-linear-gradient(180deg, transparent, transparent 39px, rgba(42,51,71,0.4) 39px, rgba(42,51,71,0.4) 40px);
    font-family: var(--font-body);
    color: var(--text);
  }

  .cs-topbar {
    background: linear-gradient(135deg, #0a0d14 0%, #131828 100%);
    border-bottom: 2px solid var(--accent);
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 24px rgba(0,0,0,0.5);
  }
  .cs-brand {
    font-family: var(--font-head);
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 3px;
    color: var(--accent);
    text-transform: uppercase;
  }
  .cs-brand span { color: var(--text); }

  .cs-body {
    max-width: 560px;
    margin: 0 auto;
    padding: 48px 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .cs-heading {
    font-family: var(--font-head);
    font-size: 32px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text);
  }
  .cs-heading span { color: var(--accent); }

  .cs-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .cs-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    display: block;
  }

  .cs-input {
    display: block;
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 16px;
    padding: 14px 18px;
    outline: none;
    transition: border-color 0.2s;
  }
  .cs-input:focus { border-color: var(--accent); }
  .cs-input::placeholder { color: var(--muted); }

  .cs-btn-primary {
    display: block;
    width: 100%;
    background: var(--accent);
    color: #0f1117;
    font-family: var(--font-head);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    padding: 14px;
    cursor: pointer;
    transition: all 0.18s;
  }
  .cs-btn-primary:hover {
    background: #fbbf24;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(245,158,11,0.4);
  }
  .cs-btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .cs-result {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    animation: fadeIn 0.25s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cs-result-header {
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
    padding: 16px 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .cs-result-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 8px rgba(34,197,94,0.6);
  }
  .cs-result-title {
    font-family: var(--font-head);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--green);
  }
  .cs-result-body {
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .cs-field {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 16px;
  }
  .cs-field-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 4px;
  }
  .cs-field-value {
    font-size: 15px;
    font-weight: 500;
    color: var(--text);
  }
  .cs-field-value.accent {
    color: var(--accent);
    font-weight: 600;
  }
  .cs-result-footer {
    padding: 0 24px 24px;
  }
  .cs-btn-proceed {
    width: 100%;
    background: var(--green);
    color: #0f1117;
    font-family: var(--font-head);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    padding: 14px;
    cursor: pointer;
    transition: all 0.18s;
  }
  .cs-btn-proceed:hover {
    background: #4ade80;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(34,197,94,0.4);
  }

  .cs-error {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: var(--radius);
    padding: 18px 22px;
    color: var(--accent2);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

function CustomerSearchPage() {

  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchByPhone = async () => {

    if (!phone.trim()) {
      setError("Please enter a phone number.");
      return;
    }

    setLoading(true);
    setError("");
    setCustomer(null);

    try {
      const res = await fetch(`http://localhost:5000/customer/${phone.trim()}`);

      if (res.status === 404) {
        setError("No customer found with that phone number.");
        return;
      }
      if (!res.ok) {
        setError("Server error. Please try again.");
        return;
      }

      const data = await res.json();
      setCustomer(data.customer);

    } catch (err) {
      setError("Could not reach the server. Make sure it is running.");
    } finally {
      setLoading(false);
    }
  };

  const proceedToService = () => {
    navigate("/service-problem", { state: { customer } });
  };

  return (
    <>
      <style>{css}</style>
      <div className="cs-page">

        <div className="cs-topbar">
          <div className="cs-brand">Auto<span>Track</span></div>
        </div>

        <div className="cs-body">

          <div className="cs-heading">Find <span>Customer</span></div>

          <div className="cs-card">
            <label className="cs-label">Phone Number</label>
            <input
              className="cs-input"
              type="tel"
              placeholder="e.g. 9902108891"
              maxLength="10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchByPhone()}
            />
            <button
              className="cs-btn-primary"
              onClick={searchByPhone}
              disabled={loading}
            >
              {loading ? "Searching…" : "Search Customer"}
            </button>
          </div>

          {error && (
            <div className="cs-error">⚠ {error}</div>
          )}

          {customer && (
            <div className="cs-result">
              <div className="cs-result-header">
                <div className="cs-result-dot" />
                <div className="cs-result-title">Customer Found</div>
              </div>
              <div className="cs-result-body">
                <div className="cs-field">
                  <div className="cs-field-label">Name</div>
                  <div className="cs-field-value">{customer.name}</div>
                </div>
                <div className="cs-field">
                  <div className="cs-field-label">Phone</div>
                  <div className="cs-field-value">{customer.phone}</div>
                </div>
                <div className="cs-field">
                  <div className="cs-field-label">Vehicle Number</div>
                  <div className="cs-field-value accent">{customer.vehicle_number}</div>
                </div>
                <div className="cs-field">
                  <div className="cs-field-label">Vehicle Model</div>
                  <div className="cs-field-value">{customer.vehicle_model}</div>
                </div>
              </div>
              <div className="cs-result-footer">
                <button className="cs-btn-proceed" onClick={proceedToService}>
                  Proceed to Service →
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default CustomerSearchPage;