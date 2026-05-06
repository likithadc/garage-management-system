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

  .bl-page {
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

  .bl-topbar {
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
  .bl-brand {
    font-family: var(--font-head);
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 3px;
    color: var(--accent);
    text-transform: uppercase;
  }
  .bl-brand span { color: var(--text); }
  .bl-back-btn {
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
  .bl-back-btn:hover { color: var(--text); border-color: var(--accent); }

  .bl-body {
    max-width: 640px;
    margin: 0 auto;
    width: 100%;
    padding: 48px 24px 80px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .bl-heading {
    font-family: var(--font-head);
    font-size: 40px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 1.1;
  }
  .bl-heading span { color: var(--accent); }
  .bl-subheading { font-size: 14px; color: var(--muted); margin-top: 6px; }

  .bl-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .bl-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--surface2);
  }
  .bl-card-num {
    font-family: var(--font-head);
    font-size: 13px;
    font-weight: 700;
    color: var(--accent);
    background: rgba(245,158,11,0.12);
    border: 1px solid rgba(245,158,11,0.3);
    width: 28px; height: 28px;
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .bl-card-title {
    font-family: var(--font-head);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  .bl-card-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }

  .bl-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
    display: block;
  }

  .bl-input {
    display: block;
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 16px;
    padding: 14px 16px;
    outline: none;
    transition: border-color 0.2s;
  }
  .bl-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(245,158,11,0.1); }
  .bl-input::placeholder { color: var(--muted); }

  .bl-btn-search {
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
    padding: 15px;
    cursor: pointer;
    transition: all 0.18s;
  }
  .bl-btn-search:hover {
    background: #fbbf24;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(245,158,11,0.4);
  }
  .bl-btn-search:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .bl-error {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 8px;
    padding: 14px 18px;
    color: var(--accent2);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ── Bill result ── */
  .bl-result {
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
  .bl-result-header {
    background: linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.05));
    border-bottom: 1px solid var(--border);
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .bl-result-dot {
    width: 12px; height: 12px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 10px rgba(34,197,94,0.6);
    flex-shrink: 0;
  }
  .bl-result-title {
    font-family: var(--font-head);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--green);
  }
  .bl-result-body { padding: 24px; display: flex; flex-direction: column; gap: 20px; }

  .bl-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .bl-info-field {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 16px;
  }
  .bl-info-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 4px;
  }
  .bl-info-value { font-size: 15px; font-weight: 500; color: var(--text); }
  .bl-info-value.accent { color: var(--accent); font-weight: 700; }

  .bl-section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .bl-problem-box {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 16px;
    font-size: 14px;
    color: var(--text);
    line-height: 1.6;
  }

  .bl-totals {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .bl-total-row {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: var(--muted);
  }
  .bl-total-row.grand {
    border-top: 1px solid var(--border);
    padding-top: 12px;
    font-size: 18px;
    color: var(--text);
    font-weight: 600;
  }
  .bl-total-row.grand .val {
    font-family: var(--font-head);
    font-size: 28px;
    font-weight: 900;
    color: var(--accent);
  }

  .bl-btn-row { display: flex; gap: 12px; flex-wrap: wrap; }

  .bl-btn-print {
    flex: 1;
    background: var(--accent);
    color: #0f1117;
    font-family: var(--font-head);
    font-size: 15px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.18s;
  }
  .bl-btn-print:hover {
    background: #fbbf24;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(245,158,11,0.4);
  }

  .bl-btn-whatsapp {
    flex: 1;
    background: #25d366;
    color: #fff;
    font-family: var(--font-head);
    font-size: 15px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.18s;
  }
  .bl-btn-whatsapp:hover {
    background: #1ebe57;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(37,211,102,0.4);
  }

  @media (max-width: 480px) {
    .bl-topbar { padding: 14px 18px; }
    .bl-brand  { font-size: 20px; }
    .bl-heading { font-size: 30px; }
    .bl-info-grid { grid-template-columns: 1fr; }
    .bl-btn-row { flex-direction: column; }
  }
`;

function BillLookupPage() {

  const navigate = useNavigate();

  const [phone,   setPhone]   = useState("");
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const searchBill = async () => {

    setError("");
    setResult(null);

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/bill/${phone}`);

      if (res.status === 404) {
        const data = await res.json();
        setError(data.message || "No bill found for this number.");
        return;
      }
      if (!res.ok) {
        setError("Server error. Please try again.");
        return;
      }

      const data = await res.json();
      setResult(data);

    } catch (err) {
      setError("Could not reach the server. Make sure it is running.");
    } finally {
      setLoading(false);
    }
  };

  const printBill = () => window.print();

  const sendWhatsApp = () => {
    if (!result) return;
    const { customer, bill, problem, service } = result;
    const shopName = localStorage.getItem("shop_name") || "Garage";

    const message =
`🔧 *${shopName} - Service Bill*

*Customer:* ${customer.name}
*Phone:* ${customer.phone}
*Vehicle:* ${customer.vehicle_model} (${customer.vehicle_number})

*Problem:* ${problem?.problem || "N/A"}
*Service:* ${service?.service || "N/A"}

*Grand Total: ₹${bill.total_amount}*

Thank you for choosing ${shopName}! 🙏`;

    const url = `https://wa.me/91${customer.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <style>{css}</style>

      <div className="bl-page">

        <div className="bl-topbar">
          <div className="bl-brand">Auto<span>Track</span></div>
          <button className="bl-back-btn" onClick={() => navigate("/dashboard")}>
            ← Dashboard
          </button>
        </div>

        <div className="bl-body">

          <div>
            <div className="bl-heading">Retrieve<br /><span>Bill</span></div>
            <div className="bl-subheading">Search by customer phone to pull up their latest bill</div>
          </div>

          {/* Search */}
          <div className="bl-card">
            <div className="bl-card-header">
              <div className="bl-card-num">01</div>
              <div className="bl-card-title">Search by Phone</div>
            </div>
            <div className="bl-card-body">
              {error && <div className="bl-error">⚠ {error}</div>}
              <div>
                <label className="bl-label">Customer Phone Number</label>
                <input
                  className="bl-input"
                  type="tel"
                  placeholder="Enter 10-digit number"
                  maxLength="10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchBill()}
                />
              </div>
              <button
                className="bl-btn-search"
                onClick={searchBill}
                disabled={loading}
              >
                {loading ? "Searching…" : "Find Bill →"}
              </button>
            </div>
          </div>

          {/* Bill Result */}
          {result && (
            <div className="bl-result">
              <div className="bl-result-header">
                <div className="bl-result-dot" />
                <div className="bl-result-title">Bill Found</div>
              </div>
              <div className="bl-result-body">

                {/* Customer info */}
                <div>
                  <div className="bl-section-label">Customer Details</div>
                  <div className="bl-info-grid">
                    <div className="bl-info-field">
                      <div className="bl-info-label">Name</div>
                      <div className="bl-info-value">{result.customer.name}</div>
                    </div>
                    <div className="bl-info-field">
                      <div className="bl-info-label">Phone</div>
                      <div className="bl-info-value">{result.customer.phone}</div>
                    </div>
                    <div className="bl-info-field">
                      <div className="bl-info-label">Vehicle Number</div>
                      <div className="bl-info-value accent">{result.customer.vehicle_number}</div>
                    </div>
                    <div className="bl-info-field">
                      <div className="bl-info-label">Vehicle Model</div>
                      <div className="bl-info-value">{result.customer.vehicle_model}</div>
                    </div>
                  </div>
                </div>

                {/* Problem */}
                {result.problem && (
                  <div>
                    <div className="bl-section-label">Problem Reported</div>
                    <div className="bl-problem-box">{result.problem.problem}</div>
                  </div>
                )}

                {/* Bill total */}
                <div>
                  <div className="bl-section-label">Bill Summary</div>
                  <div className="bl-totals">
                    <div className="bl-total-row">
                      <span>Service</span>
                      <span>{result.service?.service || "N/A"}</span>
                    </div>
                    <div className="bl-total-row grand">
                      <span>Total Amount</span>
                      <span className="val">₹{result.bill.total_amount}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bl-btn-row">
                  <button className="bl-btn-print" onClick={printBill}>
                    🖨 Print Bill
                  </button>
                  <button className="bl-btn-whatsapp" onClick={sendWhatsApp}>
                    💬 WhatsApp
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default BillLookupPage;