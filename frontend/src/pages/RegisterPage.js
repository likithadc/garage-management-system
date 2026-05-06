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

  .rp-page {
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
  .rp-topbar {
    background: linear-gradient(135deg, #0a0d14 0%, #131828 100%);
    border-bottom: 2px solid var(--accent);
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 24px rgba(0,0,0,0.5);
  }
  .rp-brand {
    font-family: var(--font-head);
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 3px;
    color: var(--accent);
    text-transform: uppercase;
  }
  .rp-brand span { color: var(--text); }
  .rp-badge {
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
  .rp-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
  }

  .rp-box {
    width: 100%;
    max-width: 460px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  /* ── Heading ── */
  .rp-title {
    font-family: var(--font-head);
    font-size: 42px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 1.1;
  }
  .rp-title span { color: var(--accent); }
  .rp-subtitle {
    font-size: 14px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 400;
  }

  /* ── Card ── */
  .rp-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.4);
  }

  /* ── Two-column grid for name + shop ── */
  .rp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  /* ── Field ── */
  .rp-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .rp-field label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .rp-input {
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
  .rp-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
  }
  .rp-input::placeholder { color: var(--muted); }

  /* ── Divider inside card ── */
  .rp-card-divider {
    height: 1px;
    background: var(--border);
  }

  /* ── Register button ── */
  .rp-btn-register {
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
  .rp-btn-register:hover {
    background: #fbbf24;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(245,158,11,0.4);
  }
  .rp-btn-register:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* ── Divider ── */
  .rp-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--muted);
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .rp-divider::before,
  .rp-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── Back to login row ── */
  .rp-login-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 14px;
    color: var(--muted);
  }
  .rp-btn-login {
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
  .rp-btn-login:hover {
    background: rgba(245,158,11,0.08);
    border-color: var(--accent);
  }

  /* ── Error / success ── */
  .rp-error {
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
  .rp-success {
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.3);
    border-radius: 8px;
    padding: 12px 16px;
    color: var(--green);
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media (max-width: 480px) {
    .rp-topbar { padding: 14px 18px; }
    .rp-brand  { font-size: 20px; }
    .rp-title  { font-size: 34px; }
    .rp-card   { padding: 24px; }
    .rp-grid   { grid-template-columns: 1fr; }
  }
`;

function RegisterPage() {

  const navigate = useNavigate();

  const [name,     setName]     = useState("");
  const [shopName, setShopName] = useState("");
  const [phone,    setPhone]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");
  const [loading,  setLoading]  = useState(false);

  const register = async () => {

    setError("");
    setSuccess("");

    if (!name || !shopName || !phone || !password) {
      setError("Please fill in all fields before registering.");
      return;
    }

    if (phone.length < 10) {
      setError("Phone number must be 10 digits.");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          shop_name: shopName,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Registration successful! Redirecting to login…");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }

    } catch (err) {
      console.error(err);
      setError("Could not reach the server. Make sure it is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") register();
  };

  return (
    <>
      <style>{css}</style>

      <div className="rp-page">

        {/* ── Top bar ── */}
        <div className="rp-topbar">
          <div className="rp-brand">Auto<span>Track</span></div>
          <div className="rp-badge">Garage Management</div>
        </div>

        <div className="rp-center">
          <div className="rp-box">

            {/* ── Heading ── */}
            <div>
              <div className="rp-title">
                Create<br /><span>Account</span>
              </div>
              <div className="rp-subtitle">
                Register your garage to get started with AutoTrack
              </div>
            </div>

            {/* ── Form card ── */}
            <div className="rp-card">

              {error   && <div className="rp-error">⚠ {error}</div>}
              {success && <div className="rp-success">✓ {success}</div>}

              {/* Owner name + Shop name side by side */}
              <div className="rp-grid">
                <div className="rp-field">
                  <label htmlFor="rp-name">Owner Name</label>
                  <input
                    id="rp-name"
                    className="rp-input"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="rp-field">
                  <label htmlFor="rp-shop">Shop Name</label>
                  <input
                    id="rp-shop"
                    className="rp-input"
                    placeholder="Your garage name"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>

              <div className="rp-card-divider" />

              <div className="rp-field">
                <label htmlFor="rp-phone">Phone Number</label>
                <input
                  id="rp-phone"
                  className="rp-input"
                  type="tel"
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="rp-field">
                <label htmlFor="rp-password">Password</label>
                <input
                  id="rp-password"
                  className="rp-input"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <button
                className="rp-btn-register"
                onClick={register}
                disabled={loading}
              >
                {loading ? "Registering…" : "Create Account →"}
              </button>

            </div>

            {/* ── Back to login ── */}
            <div className="rp-divider">or</div>

            <div className="rp-login-row">
              <span>Already have an account?</span>
              <button
                className="rp-btn-login"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default RegisterPage;