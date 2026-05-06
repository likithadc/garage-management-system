import React, { useState, useRef, useEffect } from "react";
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

  .sp-page {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,158,11,0.07) 0%, transparent 70%),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(42,51,71,0.4) 39px, rgba(42,51,71,0.4) 40px),
      repeating-linear-gradient(180deg, transparent, transparent 39px, rgba(42,51,71,0.4) 39px, rgba(42,51,71,0.4) 40px);
    font-family: var(--font-body);
    color: var(--text);
    padding: 0 0 80px 0;
  }

  .sp-topbar {
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
  .sp-brand {
    font-family: var(--font-head);
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 3px;
    color: var(--accent);
    text-transform: uppercase;
  }
  .sp-brand span { color: var(--text); }
  .sp-badge {
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

  .sp-body {
    max-width: 860px;
    margin: 0 auto;
    padding: 40px 24px 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .sp-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: box-shadow 0.2s;
  }
  .sp-card:hover {
    box-shadow: 0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,158,11,0.1);
  }
  .sp-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--surface2);
  }
  .sp-card-num {
    font-family: var(--font-head);
    font-size: 13px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 1px;
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
  .sp-card-title {
    font-family: var(--font-head);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text);
  }
  .sp-card-body { padding: 24px; }

  .sp-customer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .sp-field {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 16px;
  }
  .sp-field-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 4px;
  }
  .sp-field-value { font-size: 15px; font-weight: 500; color: var(--text); }
  .sp-field-value.accent { color: var(--accent); font-weight: 600; }

  .sp-textarea {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 14px;
    line-height: 1.6;
    padding: 14px 16px;
    resize: vertical;
    min-height: 110px;
    transition: border-color 0.2s;
    outline: none;
    margin-bottom: 16px;
  }
  .sp-textarea:focus { border-color: var(--accent); }
  .sp-textarea::placeholder { color: var(--muted); }

  .sp-btn-row { display: flex; gap: 12px; flex-wrap: wrap; }

  .sp-btn {
    font-family: var(--font-head);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    padding: 12px 22px;
    cursor: pointer;
    transition: all 0.18s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .sp-btn-primary { background: var(--accent); color: #0f1117; }
  .sp-btn-primary:hover {
    background: #fbbf24;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(245,158,11,0.4);
  }
  .sp-btn-secondary {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
  }
  .sp-btn-secondary:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: rgba(245,158,11,0.05);
  }
  .sp-btn-record {
    background: transparent;
    color: var(--accent2);
    border: 1px solid var(--accent2);
  }
  .sp-btn-record.active {
    background: var(--accent2);
    color: #fff;
    animation: pulse-red 1.2s infinite;
  }
  @keyframes pulse-red {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
    50%       { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
  }
  .sp-btn-success { background: var(--green); color: #0f1117; }
  .sp-btn-success:hover {
    background: #4ade80;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(34,197,94,0.4);
  }

  .sp-service-block {
    margin-bottom: 24px;
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }
  .sp-service-block:last-child { margin-bottom: 0; }
  .sp-service-name {
    font-family: var(--font-head);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--accent);
    background: rgba(245,158,11,0.06);
    border-bottom: 1px solid var(--border);
    padding: 12px 16px;
  }
  .sp-parts-table { width: 100%; border-collapse: collapse; }
  .sp-parts-table th {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    padding: 10px 16px;
    text-align: left;
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
  }
  .sp-parts-table td {
    padding: 12px 16px;
    font-size: 14px;
    border-bottom: 1px solid rgba(42,51,71,0.5);
    vertical-align: middle;
  }
  .sp-parts-table tr:last-child td { border-bottom: none; }
  .sp-parts-table tr:hover td { background: rgba(255,255,255,0.02); }

  .sp-price-btn {
    font-family: var(--font-head);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    border: none;
    border-radius: 6px;
    padding: 6px 12px;
    cursor: pointer;
    transition: all 0.15s;
    margin-right: 8px;
  }
  .sp-price-btn.original {
    background: rgba(245,158,11,0.12);
    color: var(--accent);
    border: 1px solid rgba(245,158,11,0.3);
  }
  .sp-price-btn.original:hover, .sp-price-btn.original.selected {
    background: var(--accent); color: #0f1117;
  }
  .sp-price-btn.third {
    background: rgba(99,102,241,0.12);
    color: #818cf8;
    border: 1px solid rgba(99,102,241,0.3);
  }
  .sp-price-btn.third:hover, .sp-price-btn.third.selected {
    background: #818cf8; color: #fff;
  }

  .sp-selected-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .sp-selected-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 14px;
  }
  .sp-selected-item-name { color: var(--text); }
  .sp-selected-item-right { display: flex; align-items: center; gap: 12px; }
  .sp-selected-item-price {
    font-family: var(--font-head);
    font-size: 16px;
    font-weight: 700;
    color: var(--accent);
  }
  .sp-remove-btn {
    background: none; border: none; color: var(--muted);
    cursor: pointer; font-size: 18px; line-height: 1;
    transition: color 0.15s; padding: 2px 6px; border-radius: 4px;
  }
  .sp-remove-btn:hover { color: var(--accent2); background: rgba(239,68,68,0.1); }

  .sp-totals {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .sp-total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: var(--muted);
  }
  .sp-total-row.grand {
    border-top: 1px solid var(--border);
    padding-top: 12px;
    font-size: 18px;
    color: var(--text);
    font-weight: 600;
  }
  .sp-total-row.grand .val {
    font-family: var(--font-head);
    font-size: 26px;
    font-weight: 900;
    color: var(--accent);
  }

  .sp-input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 15px;
    padding: 13px 16px;
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 16px;
  }
  .sp-input:focus { border-color: var(--accent); }
  .sp-input::placeholder { color: var(--muted); }

  .sp-empty {
    text-align: center;
    color: var(--muted);
    font-size: 13px;
    padding: 20px;
    letter-spacing: 0.5px;
  }

  .sp-divider { height: 1px; background: var(--border); margin: 16px 0; }

  .sp-btn-whatsapp {
    background: #25d366;
    color: #fff;
    font-family: var(--font-head);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    padding: 12px 22px;
    cursor: pointer;
    transition: all 0.18s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
  }
  .sp-btn-whatsapp:hover {
    background: #1ebe57;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(37,211,102,0.4);
  }

  @media (max-width: 600px) {
    .sp-customer-grid { grid-template-columns: 1fr; }
    .sp-topbar { padding: 14px 18px; }
    .sp-brand { font-size: 20px; }
    .sp-body { padding: 24px 16px 0; }
  }
`;

function ServiceProblemPage() {

  const location = useLocation();
  const navigate  = useNavigate();
  const customer  = location.state?.customer;

  const shopOwnerId = localStorage.getItem("shop_owner_id");

  const [problem,       setProblem]       = useState("");
  const [estimates,     setEstimates]     = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [serviceCost,   setServiceCost]   = useState("");
  const [partsCost,     setPartsCost]     = useState(0);
  const [finalTotal,    setFinalTotal]    = useState("");
  const [recording,     setRecording]     = useState(false);
  const recognitionRef                    = useRef(null);
  const isStartingRef                     = useRef(false);

  /* auto-recalculate parts cost */
  useEffect(() => {
    const total = selectedParts.reduce((s, p) => s + Number(p.price), 0);
    setPartsCost(total);
  }, [selectedParts]);

  /* ── Voice ── */
  const initRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome.");
      return false;
    }
    if (recognitionRef.current) return true;

    const rec = new SpeechRecognition();
    rec.continuous      = true;
    rec.interimResults  = true;
    rec.lang            = "en-IN";

    rec.onresult = (e) => {
      let final = "";
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          final += e.results[i][0].transcript;
        } else {
          interim += e.results[i][0].transcript;
        }
      }
      if (final) setProblem(prev => prev + " " + final);
    };

    rec.onend = () => {
      if (!isStartingRef.current) {
        setRecording(false);
      }
    };

    rec.onerror = (e) => {
      console.error("Speech error:", e.error);
      setRecording(false);
      isStartingRef.current = false;
    };

    recognitionRef.current = rec;
    return true;
  };

  const toggleRecording = () => {
    if (recording) {
      recognitionRef.current.stop();
      setRecording(false);
      isStartingRef.current = false;
    } else {
      if (!initRecognition()) return;
      isStartingRef.current = true;
      try {
        recognitionRef.current.start();
        setRecording(true);
        isStartingRef.current = false;
      } catch (e) {
        console.error("Start error:", e);
        isStartingRef.current = false;
      }
    }
  };

  /* ── Save problem ── */
  const saveProblem = async () => {
    try {
      await fetch("http://localhost:5000/add-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id: customer.id, problem, shop_owner_id: shopOwnerId }),
      });
      alert("Problem Saved");
    } catch {
      alert("Error saving problem");
    }
  };

  /* ── Estimate ── */
  const generateEstimate = async () => {
    try {
      const res = await fetch("http://localhost:5000/get-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicle_model: customer.vehicle_model, problem }),
      });
      const data = await res.json();
      setEstimates(data.services || []);
    } catch {
      alert("Estimate error");
    }
  };

  /* ── Parts selection ── */
  const selectPart = (part, price) => {
    setSelectedParts(prev => {
      const exists = prev.find(p => p.part_name === part);
      if (exists) return prev.map(p => p.part_name === part ? { ...p, price } : p);
      return [...prev, { part_name: part, price }];
    });
  };

  const removePart = (partName) =>
    setSelectedParts(prev => prev.filter(p => p.part_name !== partName));

  /* ── Add service ── */
  const addService = async () => {
    try {
      await fetch("http://localhost:5000/add-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id:  customer.id,
          service_name: "Multiple Services",
          cost:         serviceCost,
          shop_owner_id: shopOwnerId,
        }),
      });
      alert("Service Added");
    } catch {
      alert("Service error");
    }
  };

  /* ── WhatsApp ── */
  const sendWhatsApp = () => {
    const shopName = localStorage.getItem("shop_name") || "Garage";
    const partsText = selectedParts.length > 0
      ? selectedParts.map(p => `  • ${p.part_name}: ₹${p.price}`).join("\n")
      : "  • No parts selected";

    const message =
`🔧 *${shopName} - Service Bill*

*Customer:* ${customer.name}
*Phone:* ${customer.phone}
*Vehicle:* ${customer.vehicle_model} (${customer.vehicle_number})

*Problem:* ${problem || "N/A"}

*Parts Used:*
${partsText}

*Service / Labour:* ₹${Number(serviceCost) || 0}
*Parts Total:* ₹${partsCost}
━━━━━━━━━━━━━━
*Grand Total: ₹${grandTotal}*

Thank you for choosing ${shopName}! 🙏`;

    const phone = customer.phone.replace(/\D/g, "");
    const url = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  /* ── Final bill ── */
  const generateFinalBill = async () => {
    const total = Number(serviceCost || 0) + Number(partsCost || 0);
    setFinalTotal(total);
    try {
      const res = await fetch("http://localhost:5000/generate-bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id:   customer.id,
          service_cost:  serviceCost,
          parts_cost:    partsCost,
          shop_owner_id: shopOwnerId,
          shop_name:     localStorage.getItem("shop_name") || "Garage",
        }),
      });
      const data = await res.json();
      alert(data.message);
      navigate("/bill", {
        state: {
          customer, selectedParts, serviceCost, partsCost,
          receiptNo: Math.floor(Math.random() * 900) + 100,
        },
      });
    } catch {
      alert("Bill error");
    }
  };

  if (!customer) return <h2 style={{ color: "#fff", padding: 40 }}>No customer selected</h2>;

  const grandTotal = Number(serviceCost || 0) + Number(partsCost || 0);

  return (
    <>
      <style>{css}</style>

      <div className="sp-page">

        <div className="sp-topbar">
          <div className="sp-brand">Auto<span>Track</span></div>
          <div className="sp-badge">Service Order</div>
        </div>

        <div className="sp-body">

          {/* 01 Customer Details */}
          <div className="sp-card">
            <div className="sp-card-header">
              <div className="sp-card-num">01</div>
              <div className="sp-card-title">Customer Details</div>
            </div>
            <div className="sp-card-body">
              <div className="sp-customer-grid">
                <div className="sp-field">
                  <div className="sp-field-label">Name</div>
                  <div className="sp-field-value">{customer.name}</div>
                </div>
                <div className="sp-field">
                  <div className="sp-field-label">Phone</div>
                  <div className="sp-field-value">{customer.phone}</div>
                </div>
                <div className="sp-field">
                  <div className="sp-field-label">Vehicle Number</div>
                  <div className="sp-field-value accent">{customer.vehicle_number}</div>
                </div>
                <div className="sp-field">
                  <div className="sp-field-label">Vehicle Model</div>
                  <div className="sp-field-value">{customer.vehicle_model}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 02 Service Problem */}
          <div className="sp-card">
            <div className="sp-card-header">
              <div className="sp-card-num">02</div>
              <div className="sp-card-title">Service Problem</div>
            </div>
            <div className="sp-card-body">
              <textarea
                className="sp-textarea"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Describe the vehicle problem here, or use voice recording…"
              />
              <div className="sp-btn-row">
                <button
                  className={`sp-btn sp-btn-record ${recording ? "active" : ""}`}
                  onClick={toggleRecording}
                >
                  {recording ? "⏹ Stop" : "🎙 Record"}
                </button>
                <button className="sp-btn sp-btn-secondary" onClick={saveProblem}>
                  💾 Save Problem
                </button>
                <button className="sp-btn sp-btn-primary" onClick={generateEstimate}>
                  ⚙ Generate Estimate
                </button>
              </div>
            </div>
          </div>

          {/* 03 Estimates */}
          {estimates.length > 0 && (
            <div className="sp-card">
              <div className="sp-card-header">
                <div className="sp-card-num">03</div>
                <div className="sp-card-title">Estimate — Select Parts</div>
              </div>
              <div className="sp-card-body">

                {estimates.map((est, index) => (
                  <div key={index} className="sp-service-block">
                    <div className="sp-service-name">⚡ {est.service}</div>
                    <table className="sp-parts-table">
                      <thead>
                        <tr>
                          <th>Part Name</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {est.parts.map((part) => {
                          const sel = selectedParts.find(p => p.part_name === part.part_name);
                          return (
                            <tr key={part.id}>
                              <td>{part.part_name}</td>
                              <td>
                                <button
                                  className={`sp-price-btn original ${sel?.price === part.original_price ? "selected" : ""}`}
                                  onClick={() => selectPart(part.part_name, part.original_price)}
                                >
                                  OEM ₹{part.original_price}
                                </button>
                                <button
                                  className={`sp-price-btn third ${sel?.price === part.third_party_price ? "selected" : ""}`}
                                  onClick={() => selectPart(part.part_name, part.third_party_price)}
                                >
                                  3rd Party ₹{part.third_party_price}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ))}

                {selectedParts.length > 0 && (
                  <>
                    <div className="sp-divider" />
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                      Selected Parts
                    </div>
                    <div className="sp-selected-list">
                      {selectedParts.map((p) => (
                        <div key={p.part_name} className="sp-selected-item">
                          <span className="sp-selected-item-name">{p.part_name}</span>
                          <div className="sp-selected-item-right">
                            <span className="sp-selected-item-price">₹{p.price}</span>
                            <button className="sp-remove-btn" onClick={() => removePart(p.part_name)}>✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", textAlign: "right" }}>
                      Parts Total: <span style={{ color: "var(--accent)", fontFamily: "var(--font-head)", fontSize: 20 }}>₹{partsCost}</span>
                    </div>
                  </>
                )}

                {selectedParts.length === 0 && (
                  <div className="sp-empty">No parts selected yet — click OEM or 3rd Party above</div>
                )}

              </div>
            </div>
          )}

          {/* 04 Service Done */}
          <div className="sp-card">
            <div className="sp-card-header">
              <div className="sp-card-num">{estimates.length > 0 ? "04" : "03"}</div>
              <div className="sp-card-title">Service Done</div>
            </div>
            <div className="sp-card-body">
              <input
                className="sp-input"
                placeholder="Enter service / labour cost (₹)"
                value={serviceCost}
                onChange={(e) => setServiceCost(e.target.value)}
                type="number"
              />
              <button className="sp-btn sp-btn-secondary" onClick={addService}>
                ✅ Confirm Service
              </button>
            </div>
          </div>

          {/* 05 Final Bill */}
          <div className="sp-card">
            <div className="sp-card-header">
              <div className="sp-card-num">{estimates.length > 0 ? "05" : "04"}</div>
              <div className="sp-card-title">Final Bill</div>
            </div>
            <div className="sp-card-body">
              <div className="sp-totals" style={{ marginBottom: 20 }}>
                <div className="sp-total-row">
                  <span>Service / Labour</span>
                  <span>₹{Number(serviceCost) || 0}</span>
                </div>
                <div className="sp-total-row">
                  <span>Parts</span>
                  <span>₹{partsCost}</span>
                </div>
                <div className="sp-total-row grand">
                  <span>Grand Total</span>
                  <span className="val">₹{grandTotal}</span>
                </div>
              </div>
              <div className="sp-btn-row">
                <button className="sp-btn sp-btn-success" onClick={generateFinalBill}>
                  🧾 Generate Bill &amp; Print
                </button>
                <button className="sp-btn-whatsapp" onClick={sendWhatsApp}>
                  💬 Send via WhatsApp
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ServiceProblemPage;