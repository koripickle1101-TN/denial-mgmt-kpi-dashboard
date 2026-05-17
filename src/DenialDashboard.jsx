import React, { useMemo, useState } from "react";

const BRAND = {
  orange: "#FF8200",
  gray: "#4B4B4B",
  black: "#0A0A0A",
  white: "#FFFFFF",
  lightGray: "#F6F6F6",
  border: "#D9D9D9"
};

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
    <div style={{ padding: "28px", fontFamily: "Arial, sans-serif", background: BRAND.lightGray, minHeight: "100vh", color: BRAND.black }}>
      <header style={{ background: BRAND.black, color: BRAND.white, padding: "30px", borderRadius: "18px", marginBottom: "22px", borderBottom: `6px solid ${BRAND.orange}` }}>
        <p style={{ margin: 0, color: BRAND.orange, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "12px" }}>Kori Pickle Healthcare Operations Portfolio</p>
        <h1 style={{ margin: "12px 0 8px", fontSize: "34px", lineHeight: 1.1 }}>Denial Management KPI Dashboard</h1>
        <p style={{ color: "#E8E8E8", maxWidth: "860px", lineHeight: 1.6 }}>A Tennessee-rooted healthcare operations dashboard for denial visibility, queue prioritization, upstream defect mapping, and trust-layer monitoring.</p>
        <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Badge>Simulated data only</Badge>
          <Badge>No PHI</Badge>
          <Badge>RCM workflow analysis</Badge>
          <Badge>Patient-to-professional POV</Badge>
        </div>
      </header>

      <nav style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "22px" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "11px 16px",
              borderRadius: "999px",
              border: activeTab === tab ? `2px solid ${BRAND.orange}` : `1px solid ${BRAND.border}`,
              background: activeTab === tab ? BRAND.orange : BRAND.white,
              color: activeTab === tab ? BRAND.black : BRAND.gray,
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === "Overview" && (
        <section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "14px" }}>
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
        <section style={panelStyle}>
          <SectionTitle title="Denial log" subtitle="Filter simulated denial records by status, tier, and payer." />
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "18px" }}>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={["All", "Open", "Escalated", "In Review", "Resolved"]} />
            <Select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)} options={["All", "Tier 1", "Tier 2", "Tier 3"]} />
            <Select value={payerFilter} onChange={(e) => setPayerFilter(e.target.value)} options={["All", "BCBS TN", "TennCare MCO", "Medicare"]} />
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", overflow: "hidden" }}>
            <thead style={{ background: BRAND.black, color: BRAND.white }}>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Payer</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Tier</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Age</TableHeader>
                <TableHeader>Owner</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredLog.map((item) => (
                <tr key={item.id} style={{ borderBottom: `1px solid ${BRAND.border}` }}>
                  <TableCell strong>{item.id}</TableCell>
                  <TableCell>{item.payer}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.tier}</TableCell>
                  <TableCell>{currency(item.amount)}</TableCell>
                  <TableCell>{item.age} days</TableCell>
                  <TableCell>{item.owner}</TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {activeTab === "Queue" && (
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "14px" }}>
          {["Tier 1", "Tier 2", "Tier 3"].map((tier) => (
            <div key={tier} style={panelStyle}>
              <h2 style={{ marginTop: 0, borderLeft: `5px solid ${BRAND.orange}`, paddingLeft: "10px" }}>{tier}</h2>
              {denialLog.filter((item) => item.tier === tier).map((item) => (
                <div key={item.id} style={{ border: `1px solid ${BRAND.border}`, padding: "13px", borderRadius: "14px", marginBottom: "10px", background: BRAND.white }}>
                  <strong style={{ color: BRAND.black }}>{item.id}</strong>
                  <p style={{ color: BRAND.gray }}>{item.payer} · {item.category}</p>
                  <p>{currency(item.amount)} · {item.age} days</p>
                  <p style={{ color: BRAND.orange, fontWeight: 700 }}>Owner: {item.owner}</p>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      {activeTab === "Trust Layer" && (
        <section style={panelStyle}>
          <SectionTitle title="Trust layer indicators" subtitle="Behavioral signals that show where teams are manually stabilizing the workflow." />
          <ul style={{ lineHeight: 1.9 }}>
            <li><strong>Timing trust:</strong> status chasing and aging queues</li>
            <li><strong>Routing trust:</strong> duplicate routing and unclear ownership</li>
            <li><strong>Context trust:</strong> missing documentation and repeated explanations</li>
            <li><strong>Reconciliation trust:</strong> side spreadsheets and manual audits</li>
          </ul>
        </section>
      )}

      {activeTab === "Upstream" && (
        <section style={panelStyle}>
          <SectionTitle title="Upstream defect mapping" subtitle="Denials are connected back to operational defect sources before the claim reaches A/R." />
          <p style={{ color: BRAND.gray, lineHeight: 1.7 }}>Denials are mapped back to intake, authorization, documentation, coding, billing, follow-up, and payer cycle sources.</p>
        </section>
      )}
    </div>
  );
}

const panelStyle = {
  background: BRAND.white,
  padding: "20px",
  borderRadius: "18px",
  border: `1px solid ${BRAND.border}`,
  boxShadow: "0 10px 26px rgba(10, 10, 10, 0.06)"
};

function KpiCard({ label, value }) {
  return (
    <div style={{ background: BRAND.white, padding: "18px", borderRadius: "18px", border: `1px solid ${BRAND.border}`, borderTop: `5px solid ${BRAND.orange}`, boxShadow: "0 8px 22px rgba(10, 10, 10, 0.05)" }}>
      <p style={{ color: BRAND.gray, margin: 0, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
      <h2 style={{ color: BRAND.black, marginBottom: 0 }}>{value}</h2>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span style={{ border: `1px solid ${BRAND.orange}`, color: BRAND.white, padding: "7px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>
      {children}
    </span>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <h2 style={{ margin: 0, color: BRAND.black }}>{title}</h2>
      <p style={{ marginTop: "6px", color: BRAND.gray }}>{subtitle}</p>
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={onChange} style={{ padding: "10px 12px", borderRadius: "10px", border: `1px solid ${BRAND.border}`, color: BRAND.black, background: BRAND.white }}>
      {options.map((option) => <option key={option}>{option}</option>)}
    </select>
  );
}

function TableHeader({ children }) {
  return <th style={{ padding: "12px", textAlign: "left", borderBottom: `3px solid ${BRAND.orange}` }}>{children}</th>;
}

function TableCell({ children, strong }) {
  return <td style={{ padding: "12px", color: strong ? BRAND.black : BRAND.gray, fontWeight: strong ? 700 : 400 }}>{children}</td>;
}
