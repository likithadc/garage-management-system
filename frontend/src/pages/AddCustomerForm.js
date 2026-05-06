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

  .ac-page {
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

  .ac-topbar {
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
  .ac-brand {
    font-family: var(--font-head);
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 3px;
    color: var(--accent);
    text-transform: uppercase;
  }
  .ac-brand span { color: var(--text); }
  .ac-back-btn {
    font-family: var(--font-head);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 6px 16px;
    cursor: pointer;
    transition: all 0.18s;
  }
  .ac-back-btn:hover {
    color: var(--text);
    border-color: var(--accent);
  }

  .ac-body {
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
    padding: 48px 24px 80px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .ac-heading {
    font-family: var(--font-head);
    font-size: 42px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 1.1;
  }
  .ac-heading span { color: var(--accent); }
  .ac-subheading {
    font-size: 14px;
    color: var(--muted);
    margin-top: 6px;
  }

  .ac-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .ac-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--surface2);
  }
  .ac-card-num {
    font-family: var(--font-head);
    font-size: 13px;
    font-weight: 700;
    color: var(--accent);
    background: rgba(245,158,11,0.12);
    border: 1px solid rgba(245,158,11,0.3);
    width: 28px;
    height: 28px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .ac-card-title {
    font-family: var(--font-head);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  .ac-card-body {
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .ac-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .ac-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ac-field label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
  }

  .ac-input, .ac-select {
    display: block;
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 15px;
    padding: 13px 16px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ac-input:focus, .ac-select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
  }
  .ac-input::placeholder { color: var(--muted); }
  .ac-select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7a99' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
  }
  .ac-select option { background: var(--surface2); color: var(--text); }

  .ac-type-toggle {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .ac-type-btn {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--muted);
    font-family: var(--font-head);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 14px;
    cursor: pointer;
    transition: all 0.18s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .ac-type-btn:hover { border-color: rgba(245,158,11,0.4); color: var(--text); }
  .ac-type-btn.selected {
    background: rgba(245,158,11,0.1);
    border-color: var(--accent);
    color: var(--accent);
  }

  .ac-divider { height: 1px; background: var(--border); }

  .ac-btn-primary {
    display: block;
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
  }
  .ac-btn-primary:hover {
    background: #fbbf24;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(245,158,11,0.4);
  }
  .ac-btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .ac-btn-search {
    display: block;
    width: 100%;
    background: var(--green);
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
  }
  .ac-btn-search:hover {
    background: #4ade80;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(34,197,94,0.4);
  }
  .ac-btn-search:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .ac-error {
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

  @media (max-width: 560px) {
    .ac-topbar  { padding: 14px 18px; }
    .ac-brand   { font-size: 20px; }
    .ac-heading { font-size: 32px; }
    .ac-grid-2  { grid-template-columns: 1fr; }
    .ac-body    { padding: 28px 16px 60px; }
  }
`;

const TWO_WHEELERS  = ["Activa", "Access 125", "Jupiter", "Splendor", "Shine", "Pulsar", "Apache"];
const FOUR_WHEELERS = ["Swift", "Alto", "Baleno", "Creta", "i20", "Verna"];

function AddCustomerForm() {

  const navigate = useNavigate();
  const shopOwnerId = localStorage.getItem("shop_owner_id");

  const [name,          setName]          = useState("");
  const [phone,         setPhone]         = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType,   setVehicleType]   = useState("");
  const [vehicleModel,  setVehicleModel]  = useState("");
  const [addError,      setAddError]      = useState("");
  const [addLoading,    setAddLoading]    = useState(false);

  const [searchPhone,   setSearchPhone]   = useState("");
  const [searchError,   setSearchError]   = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const models = vehicleType === "2-wheeler" ? TWO_WHEELERS : FOUR_WHEELERS;

  const addCustomer = async () => {

    setAddError("");

    if (!name || !phone || !vehicleNumber || !vehicleType || !vehicleModel) {
      setAddError("Please fill in all fields before continuing.");
      return;
    }
    if (phone.length !== 10) {
      setAddError("Phone number must be exactly 10 digits.");
      return;
    }

    setAddLoading(true);

    try {
      const res = await fetch("http://localhost:5000/add-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone,
          vehicle_number: vehicleNumber,
          vehicle_type:   vehicleType,
          vehicle_model:  vehicleModel,
          shop_owner_id:  shopOwnerId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/service-problem", {
          state: {
            customer: { name, phone, vehicle_number: vehicleNumber, vehicle_model: vehicleModel },
          },
        });
      } else {
        setAddError(data.message || "Failed to add customer.");
      }

    } catch (err) {
      console.error(err);
      setAddError("Could not reach the server. Make sure it is running.");
    } finally {
      setAddLoading(false);
    }
  };

  const searchCustomer = async () => {

    setSearchError("");

    if (searchPhone.length !== 10) {
      setSearchError("Please enter a valid 10-digit phone number.");
      return;
    }

    setSearchLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/customer/${searchPhone}`);

      if (res.status === 404) {
        setSearchError("No customer found with that phone number.");
        return;
      }
      if (!res.ok) {
        setSearchError("Server error. Please try again.");
        return;
      }

      const data = await res.json();
      navigate("/service-problem", { state: { customer: data.customer } });

    } catch (err) {
      console.error(err);
      setSearchError("Could not reach the server. Make sure it is running.");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>

      <div className="ac-page">

        <div className="ac-topbar">
          <div className="ac-brand">Auto<span>Track</span></div>
          <button className="ac-back-btn" onClick={() => navigate("/dashboard")}>
            ← Dashboard
          </button>
        </div>

        <div className="ac-body">

          <div>
            <div className="ac-heading">Customer<br /><span>Entry</span></div>
            <div className="ac-subheading">Add a new customer or search an existing one to begin service</div>
          </div>

          {/* ── Card 01: Add Customer ── */}
          <div className="ac-card">
            <div className="ac-card-header">
              <div className="ac-card-num">01</div>
              <div className="ac-card-title">Add New Customer</div>
            </div>
            <div className="ac-card-body">

              {addError && <div className="ac-error">⚠ {addError}</div>}

              <div className="ac-grid-2">
                <div className="ac-field">
                  <label>Customer Name</label>
                  <input
                    className="ac-input"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="ac-field">
                  <label>Phone Number</label>
                  <input
                    className="ac-input"
                    type="tel"
                    placeholder="10-digit number"
                    maxLength="10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="ac-field">
                <label>Vehicle Number</label>
                <input
                  className="ac-input"
                  placeholder="e.g. KA 01 AB 1234"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                />
              </div>

              <div className="ac-divider" />

              <div className="ac-field">
                <label>Vehicle Type</label>
                <div className="ac-type-toggle">
                  <button
                    className={`ac-type-btn ${vehicleType === "2-wheeler" ? "selected" : ""}`}
                    onClick={() => { setVehicleType("2-wheeler"); setVehicleModel(""); }}
                  >
                    🛵 2 Wheeler
                  </button>
                  <button
                    className={`ac-type-btn ${vehicleType === "4-wheeler" ? "selected" : ""}`}
                    onClick={() => { setVehicleType("4-wheeler"); setVehicleModel(""); }}
                  >
                    🚗 4 Wheeler
                  </button>
                </div>
              </div>

              {vehicleType && (
                <div className="ac-field">
                  <label>Vehicle Model</label>
                  <select
                    className="ac-select"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                  >
                    <option value="">Select model</option>
                    {models.map((m, i) => (
                      <option key={i} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                className="ac-btn-primary"
                onClick={addCustomer}
                disabled={addLoading}
              >
                {addLoading ? "Adding…" : "Add Customer & Start Service →"}
              </button>

            </div>
          </div>

          {/* ── Card 02: Search Customer ── */}
          <div className="ac-card">
            <div className="ac-card-header">
              <div className="ac-card-num">02</div>
              <div className="ac-card-title">Search Existing Customer</div>
            </div>
            <div className="ac-card-body">

              {searchError && <div className="ac-error">⚠ {searchError}</div>}

              <div className="ac-field">
                <label>Phone Number</label>
                <input
                  className="ac-input"
                  type="tel"
                  placeholder="Enter 10-digit number"
                  maxLength="10"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchCustomer()}
                />
              </div>

              <button
                className="ac-btn-search"
                onClick={searchCustomer}
                disabled={searchLoading}
              >
                {searchLoading ? "Searching…" : "Search & Start Service →"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AddCustomerForm;