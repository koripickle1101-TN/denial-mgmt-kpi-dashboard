import React, { useMemo, useState } from "react";

const denialLog = [
  {
    id: "DN-1001",
    payer: "BCBS TN",
    category: "Eligibility",
    status: "Open",
    tier: "Tier 1",
    amount: 1840,
    age: 19,
    owner: "Registration Lead",
    nextAction: "Verify coverage date and correct subscriber ID",
    defectSource: "Intake",
    trustSignal: "Duplicate verification",
    escalation: "Same day"
  },
  {
    id: "DN-1002",
    payer: "TennCare MCO",
    category: "Prior Authorization",
    status: "Escalated",
    tier: "Tier 1",
    amount: 2650,
    age: 27,
    owner: "Prior Auth Coordinator",
    nextAction: "Attach missing clinical notes and resubmit",
    defectSource: "Authorization",
    trustSignal: "Callback loop",
    escalation: "Same day"
  },
  {
    id: "DN-1003",
    payer: "Medicare",
    category: "Medical Necessity",
    status: "Open",
    tier: "Tier 1",
    amount: 3920,
    age: 34,
    owner: "Coding Specialist",
    nextAction: "Review LCD support and documentation gap",
    defectSource: "Documentation",
    trustSignal: "Manual audit",
    escalation: "24 hours"
  }
];

const tabs = ["Overview", "Denial Log", "Queue", "Trust Layer", "Upstream"];

function currency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export default function DenialDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [statusFilter, setStatusFilter] = useState("All");
  const [tierFilter, setTierFilter] = useState("All");
  const [payerFilter, setPayerFilter] = useState("All");

  const totalRevenueAtRisk = denialLog.reduce((sum, item) => sum + item.amount, 0);
  const openItems = denialLog.filter((item) => item.status !== "Resolved").length;
  const tierOneItems = denialLog.filter((item) => item.tier === "Tier 1").length;
  const averageAge = Math.round(denialLog.reduce((sum, item) => sum + item.age, 0) / denialLog.length);

  const filteredLog = useMemo(() => {
    return denialLog.filter((item) => {
      const statusMatch = statusFilter === "All" || item.status === statusFilter;
      const tierMatch = tierFilter === "All" || item.tier === tierFilter;
      const payerMatch = payerFilter === "All" || item.payer === payerFilter;
      return statusMatch && tierMatch && payerMatch;
    });
  }, [statusFilter, tierFilter, payerFilter]);

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif", background: "#f4f4f5", minHeight: "100vh" }}>
      <header style={{ background: "#111827", color: "white", padding: "24px", borderRadius: "16px", marginBottom: "20px" }}>
        <p style={{ margin: 0, color: "#d1d5db" }}>Portfolio asset · Simulated data · No PHI</p>
        <h1>Denial Management KPI Dashboard</h1>
        <p>A healthcare operations dashboard for denial visibility, queue prioritization, upstream defect mapping, and trust-layer monitoring.</p>
      </header>

      <nav style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1px solid #d4d4d8",
              background: activeTab === tab ? "#111827" : "white",
              color: activeTab === tab ? "white" : "#111827"
            }}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === "Overview" && (
        <section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
            <KpiCard label="Revenue at risk" value={currency(totalRevenueAtRisk)} />
            <KpiCard label="Open denial items" value={openItems} />
            <KpiCard label="Tier 1 queue" value={tierOneItems} />
            <KpiCard label="Average denial age" value={`${averageAge} days`} />
            <KpiCard label="Rework rate" value="23%" />
            <KpiCard label="Clean claim rate" value="82%" />
            <KpiCard label="Denial rate" value="14%" />
            <KpiCard label="Ownership gaps" value="3" />
          </div>
        </section>
      )}

      {activeTab === "Denial Log" && (
        <section style={{ background: "white", padding: "16px", borderRadius: "16px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All</option>
              <option>Open</option>
              <option>Escalated</option>
              <option>In Review</option>
              <option>Resolved</option>
            </select>
            <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)}>
              <option>All</option>
              <option>Tier 1</option>
              <option>Tier 2</option>
              <option>Tier 3</option>
            </select>
            <select value={payerFilter} onChange={(e) => setPayerFilter(e.target.value)}>
              <option>All</option>
              <option>BCBS TN</option>
              <option>TennCare MCO</option>
              <option>Medicare</option>
            </select>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Payer</th>
                <th>Category</th>
                <th>Status</th>
                <th>Tier</th>
                <th>Amount</th>
                <th>Age</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {filteredLog.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.payer}</td>
                  <td>{item.category}</td>
                  <td>{item.status}</td>
                  <td>{item.tier}</td>
                  <td>{currency(item.amount)}</td>
                  <td>{item.age} days</td>
                  <td>{item.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {activeTab === "Queue" && (
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          {["Tier 1", "Tier 2", "Tier 3"].map((tier) => (
            <div key={tier} style={{ background: "white", padding: "16px", borderRadius: "16px" }}>
              <h2>{tier}</h2>
              {denialLog.filter((item) => item.tier === tier).map((item) => (
                <div key={item.id} style={{ border: "1px solid #e5e7eb", padding: "12px", borderRadius: "12px", marginBottom: "8px" }}>
                  <strong>{item.id}</strong>
                  <p>{item.payer} · {item.category}</p>
                  <p>{currency(item.amount)} · {item.age} days</p>
                  <p>Owner: {item.owner}</p>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      {activeTab === "Trust Layer" && (
        <section style={{ background: "white", padding: "16px", borderRadius: "16px" }}>
          <h2>Trust layer indicators</h2>
          <ul>
            <li>Timing trust: status chasing and aging queues</li>
            <li>Routing trust: duplicate routing and unclear ownership</li>
            <li>Context trust: missing documentation and repeated explanations</li>
            <li>Reconciliation trust: side spreadsheets and manual audits</li>
          </ul>
        </section>
      )}

      {activeTab === "Upstream" && (
        <section style={{ background: "white", padding: "16px", borderRadius: "16px" }}>
          <h2>Upstream defect mapping</h2>
          <p>Denials are mapped back to intake, authorization, documentation, coding, billing, follow-up, and payer cycle sources.</p>
        </section>
      )}
    </div>
  );
}

function KpiCard({ label, value }) {
  return (
    <div style={{ background: "white", padding: "16px", borderRadius: "16px", border: "1px solid #e5e7eb" }}>
      <p style={{ color: "#6b7280", margin: 0 }}>{label}</p>
      <h2>{value}</h2>
    </div>
  );
}
