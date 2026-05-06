import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  .bp-page {
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
    padding-bottom: 80px;
  }

  /* ── Topbar (hidden on print) ── */
  .bp-topbar {
    background: linear-gradient(135deg, #0a0d14 0%, #131828 100%);
    border-bottom: 2px solid var(--accent);
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 24px rgba(0,0,0,0.5);
  }
  .bp-brand {
    font-family: var(--font-head);
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 3px;
    color: var(--accent);
    text-transform: uppercase;
  }
  .bp-brand span { color: var(--text); }
  .bp-topbar-btns { display: flex; gap: 12px; }
  .bp-btn {
    font-family: var(--font-head);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.18s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .bp-btn-back {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
  }
  .bp-btn-back:hover { color: var(--text); border-color: var(--accent); }
  .bp-btn-print {
    background: var(--accent);
    color: #0f1117;
  }
  .bp-btn-print:hover {
    background: #fbbf24;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(245,158,11,0.4);
  }
  .bp-btn-whatsapp {
    background: #25d366;
    color: #fff;
  }
  .bp-btn-whatsapp:hover {
    background: #1ebe57;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(37,211,102,0.4);
  }

  /* ── Bill container ── */
  .bp-body {
    max-width: 680px;
    margin: 40px auto 0;
    width: 100%;
    padding: 0 24px;
  }

  /* ── Receipt card ── */
  .bp-receipt {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }

  /* Receipt header */
  .bp-receipt-header {
    background: linear-gradient(135deg, #0a0d14, #161b25);
    border-bottom: 2px solid var(--accent);
    padding: 32px;
    text-align: center;
  }
  .bp-shop-name {
    font-family: var(--font-head);
    font-size: 36px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
  }
  .bp-receipt-title {
    font-family: var(--font-head);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 4px;
  }
  .bp-receipt-meta {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
    font-size: 12px;
    color: var(--muted);
  }
  .bp-receipt-meta span { font-weight: 600; color: var(--text); }

  /* Sections */
  .bp-section {
    padding: 24px 32px;
    border-bottom: 1px solid var(--border);
  }
  .bp-section:last-child { border-bottom: none; }
  .bp-section-title {
    font-family: var(--font-head);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
  }

  /* Customer info grid */
  .bp-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .bp-info-field {}
  .bp-info-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 3px;
  }
  .bp-info-value {
    font-size: 15px;
    font-weight: 500;
    color: var(--text);
  }
  .bp-info-value.accent { color: var(--accent); font-weight: 700; }

  /* Parts table */
  .bp-parts-table {
    width: 100%;
    border-collapse: collapse;
  }
  .bp-parts-table th {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    padding: 8px 0;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }
  .bp-parts-table th:last-child { text-align: right; }
  .bp-parts-table td {
    padding: 12px 0;
    font-size: 14px;
    color: var(--text);
    border-bottom: 1px solid rgba(42,51,71,0.4);
  }
  .bp-parts-table td:last-child {
    text-align: right;
    font-family: var(--font-head);
    font-size: 16px;
    font-weight: 700;
    color: var(--accent);
  }
  .bp-parts-table tr:last-child td { border-bottom: none; }
  .bp-no-parts {
    font-size: 13px;
    color: var(--muted);
    font-style: italic;
  }

  /* Totals */
  .bp-totals { display: flex; flex-direction: column; gap: 10px; }
  .bp-total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: var(--muted);
  }
  .bp-total-row.grand {
    border-top: 2px solid var(--accent);
    padding-top: 14px;
    margin-top: 4px;
    font-size: 20px;
    color: var(--text);
    font-weight: 700;
  }
  .bp-total-row.grand .val {
    font-family: var(--font-head);
    font-size: 36px;
    font-weight: 900;
    color: var(--accent);
  }

  /* Footer */
  .bp-footer {
    text-align: center;
    padding: 24px 32px;
    border-top: 1px solid var(--border);
    background: var(--surface2);
  }
  .bp-footer-text {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.8;
  }
  .bp-footer-text strong { color: var(--accent); }

  /* ── Print styles ── */
  @media print {
    .bp-topbar { display: none !important; }
    .bp-page {
      background: #fff !important;
      background-image: none !important;
      padding: 0;
    }
    .bp-body { margin: 0; padding: 0; max-width: 100%; }
    .bp-receipt {
      border: 1px solid #ccc;
      border-radius: 0;
      box-shadow: none;
    }
    .bp-receipt-header { background: #f8f8f8 !important; }
    .bp-shop-name { color: #000 !important; }
    .bp-receipt-title, .bp-section-title { color: #555 !important; }
    .bp-info-value, .bp-parts-table td { color: #000 !important; }
    .bp-total-row.grand .val { color: #000 !important; }
    .bp-footer { background: #f8f8f8 !important; }
  }

  @media (max-width: 480px) {
    .bp-topbar { padding: 14px 18px; }
    .bp-topbar-btns { gap: 8px; }
    .bp-btn { padding: 8px 12px; font-size: 12px; }
    .bp-receipt-header { padding: 20px; }
    .bp-section { padding: 20px; }
    .bp-info-grid { grid-template-columns: 1fr; }
  }
`;

function BillPage() {

  const location = useLocation();
  const navigate  = useNavigate();

  const {
    customer,
    selectedParts = [],
    serviceCost   = 0,
    partsCost     = 0,
    receiptNo     = "---",
  } = location.state || {};

  const shopName   = localStorage.getItem("shop_name") || "Garage";
  const grandTotal = Number(serviceCost || 0) + Number(partsCost || 0);
  const now        = new Date();
  const dateStr    = now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const timeStr    = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const sendWhatsApp = () => {
    if (!customer) return;

    const partsText = selectedParts.length > 0
      ? selectedParts.map(p => `  • ${p.part_name}: ₹${p.price}`).join("\n")
      : "  • No parts";

    const message =
`🔧 *${shopName} - Service Bill*
Receipt No: #${receiptNo}

*Customer:* ${customer.name}
*Vehicle:* ${customer.vehicle_model} (${customer.vehicle_number})

*Parts Used:*
${partsText}

*Service / Labour:* ₹${Number(serviceCost) || 0}
*Parts Total:* ₹${partsCost}
━━━━━━━━━━━━━━
*Grand Total: ₹${grandTotal}*

Date: ${dateStr}
Thank you for choosing ${shopName}! 🙏`;

    const phone = customer.phone.replace(/\D/g, "");
    const url = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (!customer) {
    return (
      <>
        <style>{css}</style>
        <div className="bp-page">
          <div className="bp-topbar">
            <div className="bp-brand">Auto<span>Track</span></div>
            <div className="bp-topbar-btns">
              <button className="bp-btn bp-btn-back" onClick={() => navigate("/dashboard")}>
                ← Dashboard
              </button>
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "80px 24px", color: "var(--muted)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🧾</div>
            <div style={{ fontFamily: "var(--font-head)", fontSize: 24, letterSpacing: 2, textTransform: "uppercase", color: "var(--text)", marginBottom: 8 }}>
              No Bill Data
            </div>
            <div style={{ fontSize: 14 }}>Go back and generate a bill first.</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>

      <div className="bp-page">

        {/* Topbar */}
        <div className="bp-topbar">
          <div className="bp-brand">Auto<span>Track</span></div>
          <div className="bp-topbar-btns">
            <button className="bp-btn bp-btn-back" onClick={() => navigate("/dashboard")}>
              ← Dashboard
            </button>
            <button className="bp-btn bp-btn-whatsapp" onClick={sendWhatsApp}>
              💬 WhatsApp
            </button>
            <button className="bp-btn bp-btn-print" onClick={() => window.print()}>
              🖨 Print
            </button>
          </div>
        </div>

        <div className="bp-body">
          <div className="bp-receipt">

            {/* Header */}
            <div className="bp-receipt-header">
              <div className="bp-shop-name">{shopName}</div>
              <div className="bp-receipt-title">Service Receipt</div>
              <div className="bp-receipt-meta">
                <div>Receipt No: <span>#{receiptNo}</span></div>
                <div>Date: <span>{dateStr}</span></div>
                <div>Time: <span>{timeStr}</span></div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bp-section">
              <div className="bp-section-title">Customer Details</div>
              <div className="bp-info-grid">
                <div className="bp-info-field">
                  <div className="bp-info-label">Name</div>
                  <div className="bp-info-value">{customer.name}</div>
                </div>
                <div className="bp-info-field">
                  <div className="bp-info-label">Phone</div>
                  <div className="bp-info-value">{customer.phone}</div>
                </div>
                <div className="bp-info-field">
                  <div className="bp-info-label">Vehicle Number</div>
                  <div className="bp-info-value accent">{customer.vehicle_number}</div>
                </div>
                <div className="bp-info-field">
                  <div className="bp-info-label">Vehicle Model</div>
                  <div className="bp-info-value">{customer.vehicle_model}</div>
                </div>
              </div>
            </div>

            {/* Parts Used */}
            <div className="bp-section">
              <div className="bp-section-title">Parts Used</div>
              {selectedParts.length > 0 ? (
                <table className="bp-parts-table">
                  <thead>
                    <tr>
                      <th>Part Name</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedParts.map((p, i) => (
                      <tr key={i}>
                        <td>{p.part_name}</td>
                        <td>₹{p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="bp-no-parts">No parts used for this service</div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="bp-section">
              <div className="bp-section-title">Bill Summary</div>
              <div className="bp-totals">
                <div className="bp-total-row">
                  <span>Service / Labour Cost</span>
                  <span>₹{Number(serviceCost) || 0}</span>
                </div>
                <div className="bp-total-row">
                  <span>Parts Cost</span>
                  <span>₹{partsCost}</span>
                </div>
                <div className="bp-total-row grand">
                  <span>Grand Total</span>
                  <span className="val">₹{grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bp-footer">
              <div className="bp-footer-text">
                Thank you for choosing <strong>{shopName}</strong>!<br />
                Drive safe and visit us again 🙏
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default BillPage;