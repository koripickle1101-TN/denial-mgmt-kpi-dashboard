Denial Management KPI Dashboard

A simulated healthcare operations portfolio project for denial management, KPI tracking, queue prioritization, escalation logic, and workflow trust analysis.

This project was designed by Kori Pickle as a healthcare operations and revenue cycle management portfolio asset. It uses simulated data only. No PHI is included.

Project purpose

This dashboard shows how denial management can be analyzed upstream through intake, eligibility, authorization, documentation, coding, billing, and follow-up defects.

The goal is to demonstrate practical healthcare administration skills in:

- RCM operations
- KPI dashboard design
- workflow analysis
- bottleneck identification
- queue management
- escalation systems
- operational drift detection
- trust-layer measurement
- denial prevention

Repository structure

```text
denial-mgmt-kpi-dashboard/

README.md

src/
  DenialDashboard.jsx

docs/
  kpi-definitions.md
  denial-system-docs.md
  google-sheets-structure-guide.md

screenshots/
  .gitkeep
```

Dashboard tabs

Overview

Shows 8 KPI cards:

- Revenue at risk
- Open denial items
- Tier 1 queue
- Average denial age
- Rework rate
- Clean claim rate
- Denial rate
- Ownership gaps

Also includes payer and denial-category breakdowns.

Denial log

Shows simulated denial records with filters for:

- status
- tier
- payer
- search

Queue

Organizes denials into Tier 1, Tier 2, and Tier 3 lanes.

It answers 7 operational questions:

1. What is delayed?
2. What is aging?
3. What is growing?
4. Who owns the next action?
5. What upstream defect caused the issue?
6. Which queues require escalation?
7. Where are teams compensating manually?

Trust layer

Tracks workflow trust through 4 categories:

- timing trust
- routing trust
- context trust
- reconciliation trust

Upstream

Maps denial categories back to upstream defect sources:

- intake
- authorization
- documentation
- coding
- billing
- follow-up
- payer cycle

Data disclaimer

All data is simulated for portfolio demonstration. No patient names, dates of birth, claim numbers, medical record numbers, or protected health information are included.

Portfolio positioning

This project should be described as a healthcare operations KPI framework and dashboard prototype designed to analyze denial management workflows.

Recommended LinkedIn description:

I built a simulated denial management KPI dashboard to practice healthcare operations analysis, queue prioritization, escalation logic, and workflow trust measurement.

This project uses simulated data only. No PHI.

The dashboard connects denial outcomes back to upstream workflow defects across intake, eligibility, authorization, documentation, coding, billing, and follow-up.
