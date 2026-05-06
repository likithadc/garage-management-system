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

  .lp-page {
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
  .lp-topbar {
    background: linear-gradient(135deg, #0a0d14 0%, #131828 100%);
    border-bottom: 2px solid var(--accent);
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 24px rgba(0,0,0,0.5);
  }
  .lp-brand {
    font-family: var(--font-head);
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 3px;
    color: var(--accent);
    text-transform: uppercase;
  }
  .lp-brand span { color: var(--text); }
  .lp-badge {
    font-family: var(--font-head);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--muted);
    text-transform: uppercase;
    border: 1px solid var(--border);
    padding: 4px 12px;
    border-radius: 4px;
  }

  /* ── Center layout ── */
  .lp-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
  }

  .lp-box {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  /* ── Header text ── */
  .lp-title {
    font-family: var(--font-head);
    font-size: 42px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 1.1;
  }
  .lp-title span { color: var(--accent); }
  .lp-subtitle {
    font-size: 14px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 400;
  }

  /* ── Card ── */
  .lp-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.4);
  }

  /* ── Field ── */
  .lp-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .lp-field label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .lp-input {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 15px;
    padding: 14px 16px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }
  .lp-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
  }
  .lp-input::placeholder { color: var(--muted); }

  /* ── Login button ── */
  .lp-btn-login {
    width: 100%;
    background: var(--accent);
    color: #0f1117;
    font-family: var(--font-head);
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.18s;
    margin-top: 4px;
  }
  .lp-btn-login:hover {
    background: #fbbf24;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(245,158,11,0.4);
  }
  .lp-btn-login:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* ── Divider ── */
  .lp-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--muted);
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .lp-divider::before,
  .lp-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── Register row ── */
  .lp-register-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 14px;
    color: var(--muted);
  }
  .lp-btn-register {
    background: transparent;
    color: var(--accent);
    font-family: var(--font-head);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: 1px solid rgba(245,158,11,0.4);
    border-radius: 6px;
    padding: 8px 18px;
    cursor: pointer;
    transition: all 0.18s;
  }
  .lp-btn-register:hover {
    background: rgba(245,158,11,0.08);
    border-color: var(--accent);
  }

  /* ── Error ── */
  .lp-error {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 8px;
    padding: 12px 16px;
    color: var(--accent2);
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media (max-width: 480px) {
    .lp-topbar { padding: 14px 18px; }
    .lp-brand  { font-size: 20px; }
    .lp-title  { font-size: 34px; }
    .lp-card   { padding: 24px; }
  }
`;

function LoginPage() {

  const navigate = useNavigate();

  const [phone,    setPhone]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const login = async () => {

    setError("");

    if (!phone || !password) {
      setError("Please enter your phone number and password.");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("shop_name", data.shop.shop_name);
        localStorage.setItem("shop_owner_id", data.shop.id);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid phone or password.");
      }

    } catch (err) {
      console.error(err);
      setError("Could not reach the server. Make sure it is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <>
      <style>{css}</style>

      <div className="lp-page">

        {/* ── Top bar ── */}
        <div className="lp-topbar">
          <div className="lp-brand">Auto<span>Track</span></div>
          <div className="lp-badge">Garage Management</div>
        </div>

        <div className="lp-center">
          <div className="lp-box">

            {/* ── Heading ── */}
            <div>
              <div className="lp-title">
                Owner<br /><span>Login</span>
              </div>
              <div className="lp-subtitle">
                Sign in to manage your garage and customers
              </div>
            </div>

            {/* ── Form card ── */}
            <div className="lp-card">

              {error && (
                <div className="lp-error">⚠ {error}</div>
              )}

              <div className="lp-field">
                <label htmlFor="lp-phone">Phone Number</label>
                <input
                  id="lp-phone"
                  className="lp-input"
                  type="tel"
                  placeholder="Enter your 10-digit number"
                  maxLength="10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="lp-field">
                <label htmlFor="lp-password">Password</label>
                <input
                  id="lp-password"
                  className="lp-input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <button
                className="lp-btn-login"
                onClick={login}
                disabled={loading}
              >
                {loading ? "Signing in…" : "Sign In →"}
              </button>

            </div>

            {/* ── Register ── */}
            <div className="lp-divider">or</div>

            <div className="lp-register-row">
              <span>New to AutoTrack?</span>
              <button
                className="lp-btn-register"
                onClick={() => navigate("/register")}
              >
                Register Here
              </button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default LoginPage;