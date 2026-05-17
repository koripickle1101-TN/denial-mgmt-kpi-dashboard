Google Sheets Structure Guide

Workbook name

Denial Management KPI Dashboard

Tab 1: DENIAL_LOG

Column headers in order:

1. Denial ID
2. Service Date
3. Denial Date
4. Payer
5. Denial Category
6. Denial Reason
7. Claim Amount
8. Status
9. Tier
10. Current Owner
11. Next Action
12. Defect Source
13. Trust Signal
14. Days Aged
15. Escalation Needed
16. Escalation Owner
17. Notes

Suggested dropdowns:

Payer:

- BCBS TN
- TennCare MCO
- Medicare
- UnitedHealthcare
- Aetna
- Cigna
- Humana
- Other

Denial Category:

- Eligibility
- Prior Authorization
- Medical Necessity
- Coding
- Claim Edit
- Timely Filing Risk
- Payer Pending
- Missing Documentation

Status:

- Open
- In Review
- Escalated
- Resolved
- Closed

Tier:

- Tier 1
- Tier 2
- Tier 3

Defect Source:

- Intake
- Eligibility Verification
- Authorization
- Documentation
- Coding
- Billing
- Follow-up
- Payer Cycle

Trust Signal:

- Status chasing
- Duplicate verification
- Side spreadsheet
- Manual routing
- Callback loop
- Repeated explanation
- Queue stagnation
- Manual audit

Escalation Needed:

- Yes
- No

Formula for Days Aged:

=TODAY()-C2

Tab 2: KPI_SUMMARY

Column headers:

1. KPI
2. Formula
3. Current Value
4. Target
5. Escalation Threshold
6. Status
7. Owner
8. Notes

Rows:

- Denial Rate
- Clean Claim Rate
- Revenue at Risk
- Average Denial Age
- Tier 1 Queue Volume
- Rework Rate
- Ownership Gap Count
- Escalation Count

Tab 3: QUEUE_VIEW

Column headers:

1. Tier
2. Denial ID
3. Payer
4. Category
5. Amount
6. Days Aged
7. Current Owner
8. Next Action
9. Escalation Timing
10. Risk Notes

Tab 4: TRUST_LAYER_LOG

Column headers:

1. Date
2. Trust Category
3. Behavior Observed
4. Workflow Area
5. Severity
6. Operational Impact
7. Suggested Fix
8. Owner
9. Follow-up Date

Trust Category dropdown:

- Timing Trust
- Routing Trust
- Context Trust
- Reconciliation Trust

Severity dropdown:

- Low
- Medium
- High

Tab 5: UPSTREAM_DEFECTS

Column headers:

1. Defect Source
2. Denial Category
3. Count
4. Revenue at Risk
5. Primary Owner
6. Root Cause
7. Correction Action
8. Prevention Rule

Conditional formatting rules

DENIAL_LOG:

- Days Aged greater than 20: light red fill
- Tier equals Tier 1: light red fill
- Status equals Escalated: orange fill
- Escalation Needed equals Yes: red text

KPI_SUMMARY:

- Status equals On Track: green fill
- Status equals Watch: yellow fill
- Status equals Escalate: red fill

TRUST_LAYER_LOG:

- Severity equals High: red fill
- Severity equals Medium: yellow fill

Simulated starter rows

Add 15 to 20 rows of simulated denial data.

Do not use:

- patient names
- dates of birth
- medical record numbers
- real claim numbers
- addresses
- phone numbers
- real clinical details

Use safe identifiers such as:

- DN-1001
- DN-1002
- DN-1003

Suggested workflow

1. Build DENIAL_LOG first.
2. Add dropdowns.
3. Add conditional formatting.
4. Build KPI_SUMMARY.
5. Build QUEUE_VIEW.
6. Build TRUST_LAYER_LOG.
7. Build UPSTREAM_DEFECTS.
8. Add 15 to 20 simulated rows.
9. Screenshot the workbook.
10. Upload screenshots to GitHub.
