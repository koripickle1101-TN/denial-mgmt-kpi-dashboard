Denial System Documentation

Purpose

This document defines the denial taxonomy, trust-layer framework, operational drift indicators, queue logic, and escalation rules for the denial management KPI dashboard.

All examples use simulated data.

Denial taxonomy

Eligibility

Cause:

Coverage, subscriber ID, plan status, or coordination of benefits does not match payer requirements.

Common upstream source:

Intake or registration.

Owner:

Registration Lead.

Prior authorization

Cause:

Authorization was missing, expired, incomplete, or mismatched to the service.

Common upstream source:

Authorization workflow.

Owner:

Prior Auth Coordinator.

Medical necessity

Cause:

Documentation does not support payer medical necessity requirements.

Common upstream source:

Provider documentation or clinical documentation review.

Owner:

Clinical Documentation Lead or Coding Specialist.

Coding

Cause:

Diagnosis, procedure code, modifier, or code pairing does not meet claim requirements.

Common upstream source:

Coding workflow.

Owner:

Coding Specialist.

Claim edit

Cause:

Claim failed internal or payer edit rules.

Common upstream source:

Billing workflow.

Owner:

Billing Rep.

Timely filing risk

Cause:

Claim or corrected claim is approaching payer filing deadline.

Common upstream source:

Follow-up workflow.

Owner:

RCM Manager.

Payer pending

Cause:

The payer has not completed processing or response.

Common upstream source:

Payer cycle.

Owner:

Billing Rep or Follow-up Rep.

Tennessee payer context

Tennessee outpatient clinics may interact with:

- TennCare managed care organizations
- BCBS TN
- Medicare
- Medicare Advantage plans
- commercial payers

Operational risk areas may include:

- TennCare documentation rules
- payer-specific authorization requirements
- Medicare LCD documentation support
- BCBS TN eligibility and plan-matching issues
- timely filing windows

This project uses payer names only as simulated operational context.

Queue tiers

Tier 1

High financial or operational risk.

Examples:

- high-dollar denials
- timely filing risk
- active escalations
- prior authorization defects blocking payment
- Medicare documentation exposure

Action timing:

Same day or within 24 hours.

Tier 2

Moderate operational risk.

Examples:

- aging claims nearing follow-up threshold
- documentation deficiency
- repeated claim edits
- coding corrections

Action timing:

Within 48 hours.

Tier 3

Routine workload.

Examples:

- low-dollar corrections
- payer-pending claims
- standard follow-up

Action timing:

Routine queue review.

Trust-layer framework

Timing trust

Confidence that tasks occur within expected timeframes.

Failure indicators:

- callbacks
- status chasing
- manual reminders
- delayed escalations
- queue stagnation

Routing trust

Confidence that work reaches the correct owner.

Failure indicators:

- duplicate routing
- rerouted tasks
- ownership confusion
- side messaging
- manual reassignment

Context trust

Confidence that required information travels with the workflow.

Failure indicators:

- repeated explanations
- missing documentation
- duplicate data entry
- fragmented communication
- reconciliation corrections

Reconciliation trust

Confidence that system status matches operational reality.

Failure indicators:

- side spreadsheets
- shadow tracking systems
- manual audits
- duplicate verification
- staff-created monitoring systems

Operational drift indicators

Operational drift appears when the workflow still functions because staff compensate manually.

Examples:

- personal tracking systems
- side spreadsheets
- undocumented routing
- manual reminders
- duplicate reviews
- informal escalation chains
- callback loops
- repeated status checks

Escalation rules

Escalate when:

- Tier 1 item has no action within 24 hours
- denial age exceeds 20 days
- revenue at risk exceeds $2,000 on one denial
- authorization defect blocks billing
- timely filing risk appears
- ownership is unclear for more than 48 hours
- payer rejection repeats after correction
- manual workaround frequency increases

Operational questions

Every denial queue review should answer:

1. What is delayed?
2. What is aging?
3. What is growing?
4. Who owns the next action?
5. What upstream defect caused the issue?
6. Which queues require escalation?
7. Where are teams compensating manually?
