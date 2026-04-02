# Credit Catalyst — Anti-Gaming & Bust-Out Fraud Prevention Framework

**Document Type:** Risk Mitigation Strategy Paper  
**Platform:** NCBA Credit Catalyst — AI-Powered Merchant Credit  
**Date:** March 2026  
**Classification:** Internal — Risk & Credit Operations

---

## 1. Problem Statement

### 1.1 The Core Vulnerability

AI-powered credit scoring systems that reward positive merchant behavior create an inherent paradox: **the same transparency that motivates genuine merchants also provides a playbook for fraudsters**.

When a merchant can see exactly which actions improve their credit score — on-time payments, revenue consistency, low utilization, channel diversity — a sufficiently motivated bad actor can *manufacture* these signals over time, systematically inflate their credit limit, then draw the maximum facility and exit the platform.

This is known in credit risk as **bust-out fraud** or **credit farming**.

It is not "bad borrowers" — it is **strategic behavior executed over time**, often by actors who fully understand the system's reward mechanics.

### 1.2 The Anatomy of a Bust-Out

Bust-out fraud follows a consistent 4-phase pattern across markets:

```
Phase 1: SEED          Phase 2: CULTIVATE       Phase 3: HARVEST         Phase 4: EXIT
─────────────────      ─────────────────        ─────────────────        ────────────────
Small, well-behaved    Gradual limit            Increased utilization    Sudden full drawdown
early loans            increases                across products &        + default + disappear
                                                channels
```

Each phase appears legitimate in isolation. Traditional credit models evaluate **snapshots** — a point-in-time assessment of what has happened. Bust-out fraud can only be detected by evaluating **trajectories** — the velocity, direction, and authenticity of behavioral change over time.

> **Key paradigm shift:** Think "trajectory" over "snapshot." Static risk scoring looks at *where* a merchant is. Behavioral risk scoring looks at *how fast they're moving, in which direction, and whether the movement is organic*.

### 1.3 The Amina Scenario

Consider a merchant — call her Amina — who onboards to the platform and exhibits textbook positive behavior:

| Phase | Month | Action | Score Impact |
|-------|-------|--------|-------------|
| Seed | 1–6 | Consistent LOOP transactions, on-time payments | 650 → 700 (Bronze → Silver) |
| Cultivate | 7–12 | Revenue grows steadily, diversifies channels | 700 → 742 (Silver → Gold) |
| Cultivate | 13–24 | Perfect repayment streak, low utilization | 742 → 800 (Gold → Platinum) |
| Cultivate | 25–48 | Maintains trajectory, adds trade references | 800 → 812 (Platinum, approaching Diamond) |
| Harvest | 49 | Requests maximum loan at newly vested limit | — |
| Exit | 50+ | Ceases business activity, defaults on facility | Default |

At no point does the traditional credit model flag Amina. Her trajectory is uniformly positive. She appears to be a model merchant.

**The attack:** Once Amina reaches her target limit (e.g., KES 5M at Platinum, or KES 10M at Diamond), she requests the maximum loan, receives disbursement, and exits the platform — ceasing business operations and defaulting on the facility.

### 1.4 Why Traditional Models Fail

Traditional credit scoring operates as a **static risk snapshot**:

| Model Feature | Why It Misses This |
|---------------|-------------------|
| Payment history (35%) | Amina pays perfectly — by design |
| Revenue consistency (25%) | She manufactures steady growth |
| Credit utilization (20%) | She keeps it strategically low before the draw |
| Business age (10%) | She's patient — willing to wait 2–4 years |
| Industry risk (10%) | Not relevant to individual intent |

The fundamental problem: **these models evaluate what has happened, not why it happened.** They measure behavioral outputs without questioning behavioral authenticity. They detect *behavior*, not *intent*.

What's needed is a **continuous behavioral risk assessment** system that asks not just "Is this merchant performing well?" but "Does this merchant's performance pattern look organic?"

### 1.5 The Cross-Product Blind Spot

The problem compounds when a merchant platform offers multiple lending products. Credit Catalyst operates across **LOOP**, **BNPL**, **Device Finance**, and **CaaS (Credit as a Service)**.

Each product team sees only its own data:
- LOOP sees a merchant with perfect M-Pesa repayments
- BNPL sees low utilization on buy-now-pay-later
- Device Finance sees timely payments on a financed phone

What no single product sees: the merchant is **stacking credit across all four channels**, building exposure that is individually manageable but collectively dangerous. When the bust-out happens, it happens simultaneously across all products.

> **Bust-out risk increases when users stack credit across products and each product sees only "its own good behavior."**

### 1.6 Scale of Exposure

In a portfolio of 10,000 merchants:
- Even a 0.5% gaming rate (50 merchants) at an average Platinum limit of KES 5M = **KES 250M potential exposure**
- At Diamond tier (KES 10M), 50 merchants = **KES 500M exposure**
- With cross-product stacking, actual exposure per merchant could be 1.5–2× the single-product limit
- Recovery rate on bust-out fraud is typically 5–15%, making net loss **KES 212M–475M** on single-product, potentially **KES 500M+** with stacking

---

## 2. Key Indicators — Early Warning Signals

The following indicators should be continuously monitored. No single indicator confirms gaming, but clusters of signals significantly raise the probability.

**The core principle is continuous risk assessment, not periodic review.** Every indicator below should be evaluated in real time or near-real time, with signals feeding into the composite Bust-Out Risk Score (see Section 3.2.4).

### 2.1 Behavioral Authenticity Indicators

These detect whether merchant behavior is *organic* or *manufactured*.

| # | Indicator | What to Measure | Red Flag Threshold | Rationale |
|---|-----------|----------------|-------------------|-----------|
| 1 | **Transaction Entropy** | Statistical variance in transaction amounts over 90-day windows | Variance < 15% of mean | Real businesses have irregular transaction sizes. Tight clustering suggests manufactured activity. |
| 2 | **Revenue Volatility** | Standard deviation of month-on-month revenue growth | MoM deviation < 2% over 6+ months | Genuine businesses experience seasonal dips, supplier disruptions, and demand shifts. Unnaturally smooth growth is a signal. |
| 3 | **Payment Timing Regularity** | Distribution of payment-to-due-date intervals | All payments within 1-day window of due date | Natural payment behavior shows 5–15 day spread. Robotic timing suggests optimization. |
| 4 | **Counterparty Diversity** | Unique transaction counterparties per 90-day period | < 5 unique counterparties, or > 60% volume with 1 counterparty | Low diversity may indicate circular transactions or manufactured volume. |
| 5 | **Channel Usage Pattern** | Distribution across payment channels (LOOP, POS, bank, e-commerce) | Sudden new channel adoption coinciding with score incentives | Adding channels purely for score benefit without organic transaction growth. |
| 6 | **Peer Cohort Deviation** | Merchant's score trajectory vs. peer cohort (same tier, industry, tenure) | Score growth > 2σ above peer mean | Exceptional performance is possible but statistically improbable — warrants investigation. |

### 2.2 Intent & Exit Velocity Indicators

These detect the *transition from farming to extraction* — the shift from Phase 2 (Cultivate) to Phase 3 (Harvest).

| # | Indicator | What to Measure | Red Flag Threshold | Rationale |
|---|-----------|----------------|-------------------|-----------|
| 7 | **Limit-Proximity Loan Request** | Loan amount requested as % of current limit, timed against tier upgrades | Loan > 70% of limit within 30 days of tier upgrade | A merchant who waits for a tier upgrade and immediately requests near-max facility is exhibiting classic bust-out timing. |
| 8 | **Post-Disbursement Activity Drop** | Transaction volume and revenue in 30/60/90 days after loan disbursement vs. pre-disbursement baseline | Volume drops > 30% post-disbursement | Genuine borrowers use credit to grow — their activity should increase, not decrease. |
| 9 | **Fund Outflow Velocity** | Rate of fund transfers OUT of business accounts post-disbursement | > 50% of disbursed amount transferred out within 14 days | Rapid fund extraction to personal or third-party accounts is a primary bust-out behavior. |
| 10 | **Account Balance Pattern** | Minimum daily balance trend post-disbursement | Multiple zero-balance days within 30 days of draw | Business accounts should maintain operational float. Systematic drainage is a signal. |
| 11 | **Counterparty Shift** | Change in transaction counterparties post-disbursement vs. pre-disbursement | > 40% new counterparties post-disbursement (especially if they appear related to the merchant) | New counterparties appearing only after a large draw may indicate fund laundering through shell entities. |

### 2.3 Repayment Cycling & Credit Stacking Indicators

These detect **strategic borrowing patterns** — the telltale rhythm of someone who is optimizing for limit growth rather than genuine business financing.

| # | Indicator | What to Measure | Red Flag Threshold | Rationale |
|---|-----------|----------------|-------------------|-----------|
| 12 | **Repayment Cycling** | Pattern of rapid repayment followed by immediate re-borrowing | Pay-then-borrow cycle < 48 hours, occurring 3+ times | Paying fast and borrowing bigger is not financial prudence — it's limit-growth optimization. Genuine merchants don't repay and re-borrow within hours. |
| 13 | **Shortening Repayment Intervals** | Trend in days between disbursement and repayment over successive loans | Each successive loan repaid faster than the last, across 3+ cycles | Accelerating repayment pace (3 months → 2 months → 1 month → 2 weeks) signals a merchant racing to build repayment history before a large draw. |
| 14 | **Cross-Product Utilization Spike** | Total credit utilization across LOOP, BNPL, Device Finance, and CaaS combined | Aggregate utilization > 80% across 2+ products within a 30-day window | Each product's utilization may look safe individually. Aggregate exposure is the real risk. |
| 15 | **Channel Hopping** | Movement between lending channels in rapid succession | Borrowing from 3+ channels within 14 days | Sequential borrowing from LOOP → BNPL → Device Finance suggests a merchant is exhausting each channel in turn. |
| 16 | **Cash Flow vs. Borrowing Divergence** | Ratio of net cash inflow to outstanding borrowing over time | Cash inflow declining while borrowing increasing for 2+ consecutive months | This is the most fundamental signal: a real business borrows to grow revenue. A gaming merchant borrows regardless of revenue trajectory. |

### 2.4 Portfolio-Level & Ring Detection Indicators

These detect coordinated or systemic gaming — **credit farming rings** that are particularly prevalent in the Kenyan market.

| # | Indicator | What to Measure | Red Flag Threshold | Rationale |
|---|-----------|----------------|-------------------|-----------|
| 17 | **Cluster Detection** | Groups of merchants with similar onboarding dates, transaction patterns, and score trajectories | 3+ merchants with > 85% pattern correlation | Coordinated bust-out rings operate multiple merchant accounts simultaneously. |
| 18 | **Referral Chain Risk** | Credit performance of referred merchants by referrer | Referrer's referrals have > 2x average default rate | Gaming merchants may recruit others into the scheme, especially if referral bonuses exist. |
| 19 | **Geographic Concentration** | Default rate by region, market, or physical location cluster | Default rate > 3x portfolio average in a micro-geography | Physical proximity of defaulting merchants may indicate a local fraud ring. |
| 20 | **Shared Device / SIM Fingerprinting** | Merchants accessing accounts from the same device or SIM card | 2+ merchant accounts from same device IMEI or SIM ICCID | In Kenya, coordinated rings often share physical devices or SIM cards. A single phone managing multiple "independent" merchant accounts is a strong ring indicator. |
| 21 | **Common Withdrawal Endpoints** | Destination accounts, wallets, or withdrawal patterns across merchants | 3+ merchants sending funds to same M-Pesa wallet or bank account | If multiple merchants are funneling proceeds to the same withdrawal endpoint, they are likely controlled by the same actor. |
| 22 | **Identity Linkage** | Cross-referencing merchant identity data (phone numbers, national IDs, GPS locations, next-of-kin) | 2+ accounts sharing a phone number, ID field, or GPS location within 50 meters | Multiple business accounts at the same physical location, or with overlapping identity documents, indicate manufactured merchant accounts. |

### 2.5 Early Warning Triggers — Automated Escalation

The following triggers should fire **automatically**, requiring no human judgment to initiate:

| Trigger | Condition | Action |
|---------|-----------|--------|
| **Utilization Alert** | > 80% utilization across products within a 14-day window | Freeze limit increases, flag for review |
| **Rapid Cycling** | 2–3 complete loan cycles (borrow → repay → borrow) within 7 days | Hold new disbursements, trigger early-warning review |
| **Post-Borrow Silence** | Sudden inactivity (< 20% of normal transaction volume) after heavy borrowing | Freeze pending tranches, escalate to relationship manager |
| **Cash Flow Divergence** | Cash inflows declining while borrowing is increasing for 2+ months | Reduce available credit by 25%, require cash flow re-validation |
| **Cross-Product Spike** | New borrowing initiated on 3+ products within 48 hours | Block further disbursements pending unified exposure review |
| **Ring Signal** | Shared device/SIM or withdrawal endpoint match detected | Immediate investigation — freeze all linked accounts |

---

## 3. Recommended Solutions

### 3.1 Structural Controls (Limit the Blast Radius)

These are systemic controls that limit maximum loss regardless of gaming detection accuracy.

#### 3.1.1 Graduated Limit Vesting

**Principle:** Credit limits unlock over time, not all at once.

| Tenure | Cumulative Vested Limit (Example) |
|--------|----------------------------------|
| Month 1–6 | KES 500K (initial facility) |
| Month 7–12 | KES 1.5M (+KES 1M unlocked) |
| Month 13–24 | KES 2.5M (+KES 1M unlocked) |
| Month 25–36 | KES 3.5M (+KES 1M unlocked) |
| Month 37–48 | KES 5M (+KES 1.5M unlocked) |

**Impact:** Even if a merchant games their way to Platinum score, they can only access the vested portion. A merchant at month 18 with a Platinum score of 800 would have KES 2.5M vested — not KES 5M.

**Key design choice:** Vesting schedules should be **non-linear and back-loaded** — the majority of limit capacity should vest in later tranches to reward genuine long-term engagement.

#### 3.1.2 Exposure Velocity Caps

**Principle:** Limit how fast a merchant's credit limit can grow, regardless of score performance.

| Period | Maximum Limit Growth |
|--------|---------------------|
| Per month | ≤ 15% of current limit |
| Per quarter | ≤ 35% of current limit |
| Per year | ≤ 100% of starting-year limit |

**Rationale:** Predictable, linear limit growth is gameable — a merchant knows exactly what performance is needed for a given outcome. Velocity caps ensure that even a merchant with a perfect score cannot reach Diamond (KES 10M) faster than the structural timeline allows.

**Critical distinction:** The score determines *eligibility* for a limit increase. The velocity cap determines the *maximum size* of that increase. A merchant can have a perfect score and still be velocity-limited.

#### 3.1.3 Single-Disbursement Cap

**Principle:** No single loan can exceed 40% of the total approved limit.

- Platinum merchant with KES 5M limit → max single loan of KES 2M
- Diamond merchant with KES 10M limit → max single loan of KES 4M

This ensures that even in a worst-case scenario, the platform's exposure on any single bust-out is capped at 40% of the facility.

#### 3.1.4 Staggered Loan Release (Tranche Disbursement)

**Principle:** Loans above a threshold (e.g., KES 1M) are released in tranches over 60–90 days.

| Tranche | Amount | Release Timing | Condition |
|---------|--------|---------------|-----------|
| 1 | 40% of loan | Immediate | On approval |
| 2 | 30% of loan | Day 30 | Continued business activity at ≥ 80% of pre-disbursement levels |
| 3 | 30% of loan | Day 60 | No negative signals + revenue maintenance |

**Impact:** If a merchant's activity drops after tranche 1, tranches 2 and 3 are frozen. Maximum loss is limited to 40% of the loan amount (itself capped at 40% of the facility).

**Net effect:** For a Platinum merchant with KES 5M limit, maximum instant exposure = 40% × 40% = **16% of the total facility** (KES 800K), not KES 5M.

#### 3.1.5 Cooling Period After Tier Upgrades

**Principle:** After every tier upgrade, a mandatory waiting period (60–90 days) must elapse before the new increased limit can be drawn.

This specifically targets the timing aspect of bust-out fraud — where a merchant would want to draw immediately after reaching a new tier.

#### 3.1.6 Cash Flow Re-Validation Before Large Draws

**Principle:** Before any disbursement above a threshold (e.g., KES 500K), require **fresh business data** — not just historical data already in the system.

| Threshold | Re-validation Required |
|-----------|----------------------|
| KES 500K–1M | Latest 30-day M-Pesa / LOOP till statement |
| KES 1M–2.5M | Latest 90-day statements + current inventory proof |
| KES 2.5M+ | Fresh M-Pesa statements + bank statements + site verification call |

**Rationale:** This creates **strategic friction at the right moment** — not at onboarding (where it hurts conversion) but immediately before the risk peak (where it costs a fraudster the most).

### 3.2 Behavioral Intelligence (Detect the Play)

These are AI/ML-driven detection mechanisms that identify gaming patterns.

#### 3.2.1 Behavioral Authenticity Score (BAS)

A composite score (0–100) that evaluates how *organic* a merchant's activity appears. The BAS sits alongside the credit score but is **not visible to the merchant** — it is an internal risk tool.

**Scoring components:**

| Component | Weight | What It Measures |
|-----------|--------|-----------------|
| Transaction entropy | 20% | Statistical randomness of transaction amounts |
| Revenue volatility | 20% | Natural variance in revenue patterns |
| Payment timing spread | 15% | Distribution of payment dates relative to due dates |
| Counterparty diversity | 15% | Breadth and stability of transaction relationships |
| Channel usage pattern | 10% | Organic vs. incentive-driven channel adoption |
| Peer cohort deviation | 20% | Score trajectory vs. comparable merchants |

**Interpretation scale:**

| BAS Range | Label | Action |
|-----------|-------|--------|
| 85–100 | High authenticity | Standard processing |
| 70–84 | Moderate authenticity | Elevated monitoring — delay limit increases |
| 50–69 | Low authenticity | Enhanced review — manual investigation, hold disbursements |
| 0–49 | Critical | Suspend new credit, escalate to fraud team |

**Key insight:** A merchant with a perfect credit score (850) but a low authenticity score (55) is a higher risk than a merchant with a good credit score (720) and a high authenticity score (90). The BAS captures what the credit score cannot — whether the underlying behavior is genuine.

#### 3.2.2 Trust Decay Model

Traditional credit systems only **accumulate** trust — good behavior raises the score, and the score only goes down with bad behavior. This creates a one-way ratchet that gaming merchants exploit.

The Trust Decay Model introduces a critical concept: **trust should also decay when behavioral patterns look opportunistic**, even in the absence of explicit negative events.

**How it works:**

A Trust Score operates alongside (but independent of) the credit score:
- **Increases slowly** with consistent, organic repayment and business activity
- **Decays** when the system detects patterns associated with gaming:

| Decay Trigger | Trust Decay Amount | Rationale |
|--------------|-------------------|-----------|
| Frequent early repayments timed just before limit increases | -5 per occurrence | Strategic timing suggests the merchant is "gaming the gate" — repaying early specifically to unlock the next tier, not because of genuine cash flow surplus. |
| Borrowing immediately after repayment (< 48 hours) | -8 per cycle | Rapid borrow-repay-borrow cycling is a classic bust-out acceleration pattern — building repayment count without genuine credit need. |
| Sudden channel diversification coinciding with score incentives | -3 per event | Adding a new channel the same week a "multi-channel bonus" is announced suggests incentive optimization, not organic business growth. |
| Score acceleration without corresponding cash flow growth | -10 per month | If the credit score is climbing but revenue growth isn't keeping pace, the score improvement may be manufactured through non-revenue signals. |
| Rapid limit exhaustion after increase | -15 per event | Drawing 70%+ of a newly increased limit within 14 days of the increase is a primary bust-out signal. |

**Key principle:** The Trust Score has **asymmetric dynamics** — it takes months to build but can decay in days. This mirrors reality: genuine businesses build trust over years, but bad actors reveal intent over hours.

**Critical difference from credit score:** The merchant never sees the Trust Score. It is an internal risk control. The credit score is the merchant-facing metric that motivates good behavior. The Trust Score is the bank-facing metric that validates whether that good behavior is authentic.

#### 3.2.3 Post-Disbursement Monitoring Engine

Automated, continuous monitoring activated after every significant credit draw:

- **Transaction continuity check** (daily for 90 days): Is merchant maintaining pre-disbursement transaction volumes?
- **Fund retention analysis** (weekly): What percentage of disbursed funds remain in business operations vs. transferred out?
- **Revenue maintenance** (monthly): Is revenue trend consistent with pre-disbursement projections?
- **Balance pattern analysis** (daily): Are there suspicious zero-balance or bulk withdrawal patterns?

**Trigger actions:**
- Volume drops > 30% → Freeze pending tranches, alert relationship manager
- Fund outflow > 50% within 14 days → Automatic hold on further disbursements, investigative review
- Revenue decline > 25% post-disbursement → Escalate to credit committee

#### 3.2.4 Bust-Out Risk Score — MVP Heuristic Model

For early implementation, a weighted composite score provides an actionable risk signal without requiring a full ML pipeline:

```
BustOutRiskScore =
    (Utilization Velocity  × 0.30) +
    (Repayment Cycling     × 0.25) +
    (Cross-Product Exposure × 0.20) +
    (Cash Flow Decline      × 0.15) +
    (Device / Identity Risk × 0.10)
```

**Component definitions:**

| Component | Calculation | Range |
|-----------|------------|-------|
| **Utilization Velocity** | Rate of credit utilization increase over 30/60/90 days, normalized to 0–100 | 0 = stable, 100 = maxing out rapidly |
| **Repayment Cycling** | Number of borrow-repay-borrow cycles in last 30 days × 20, capped at 100 | 0 = no cycling, 100 = daily cycles |
| **Cross-Product Exposure** | Aggregate utilization across all lending products as % of combined limits | 0 = no cross-product debt, 100 = maxed everywhere |
| **Cash Flow Decline** | Revenue MoM decline rate × 5, capped at 100 (0 if growing) | 0 = growing, 100 = declining 20%+ |
| **Device / Identity Risk** | Weighted signals: shared device (40), shared SIM (30), shared withdrawal endpoint (20), suspicious GPS (10) | 0 = unique fingerprint, 100 = all signals flagged |

**Action thresholds:**

| Score Range | Risk Level | Action |
|-------------|-----------|--------|
| 0–25 | Low | Standard processing |
| 26–50 | Moderate | Enhanced monitoring, delay limit increases |
| 51–75 | High | Hold disbursements, require manual approval, relationship manager contact |
| 76–100 | Critical | Suspend all new credit, freeze available limits, escalate to fraud team |

**Velocity alert:** If the BustOutRiskScore is **rising rapidly** (e.g., +15 points in a week), intervene even if the absolute score hasn't crossed a threshold. A rapidly rising risk score signals a transition from Cultivate to Harvest phase.

#### 3.2.5 Exit Velocity Detection Model

A purpose-built model that detects the *transition point* from farming to extraction:

**Feature set:**
- Ratio of largest-ever loan request to historical average
- Time between tier upgrade and loan application
- Change in transaction behavior 30/60/90 days pre-application
- Deviation from established counterparty patterns
- Sudden increase in cash withdrawals or outward transfers
- Trust Score trajectory (is it decaying while credit score is stable/rising?)

**Output:** An exit-risk probability (0–100%) that determines whether a loan application receives:
- Standard processing (0–25%)
- Enhanced review (26–50%)
- Manual approval required (51–75%)
- Automatic decline pending investigation (76–100%)

### 3.3 Self-Healing as a Fraud Detection Tool

The Credit Catalyst platform already includes Self-Healing Loans — automatic restructuring when a merchant shows signs of distress. This mechanism doubles as a **powerful fraud detection tool**.

**The principle:** When distress signals appear, the system proactively offers:
- Auto-adjusted repayment terms
- Extended tenor
- Reduced installment pressure

**How this catches gaming:**

| Merchant Type | Response to Self-Healing Offer | Interpretation |
|--------------|-------------------------------|----------------|
| **Genuine merchant in distress** | Accepts restructuring, engages with relationship manager, transaction activity continues at reduced levels | Authentic distress — the system is working as intended |
| **Gaming merchant (bust-out intent)** | Ignores the offer, does not engage, no activity, no response to outreach | **This is a strong fraud signal** — a genuine merchant in trouble will always take a lifeline. A merchant who doesn't respond has already exited mentally. |

**Automated interpretation:**
- Self-healing offered + engaged within 7 days → Genuine distress pathway
- Self-healing offered + no engagement after 14 days + no transaction activity → Escalate to fraud review, freeze remaining credit
- Self-healing offered + merchant repays in full immediately → Suspicious — may be preparing for a larger draw (trust score decays)

**Key insight:** Self-healing separates genuine merchants from fraudsters at the exact moment the fraud would otherwise be consummated. It acts as a **litmus test** — the genuine take the help, the fraudulent ignore it.

### 3.4 Cross-Product Unified Exposure Layer

**This is the single most critical architectural requirement for multi-product platforms.**

#### 3.4.1 The Problem

Each lending product (LOOP, BNPL, Device Finance, CaaS) currently evaluates risk independently. A merchant could have:

| Product | Individual Utilization | Product's View |
|---------|----------------------|----------------|
| LOOP Credit | 35% | "Low risk" |
| BNPL | 45% | "Moderate risk" |
| Device Finance | 60% | "Acceptable" |
| CaaS Credit | 30% | "Low risk" |
| **Aggregate** | **42.5% of combined limits** | **Not visible to any single product** |

When the aggregate tips to 80%+ across products simultaneously, no single product team sees the danger.

#### 3.4.2 The Solution: Unified Credit Exposure Layer (UCEL)

A shared data layer that tracks:

| Metric | Scope | Update Frequency |
|--------|-------|-----------------|
| Total outstanding exposure | All products combined | Real-time |
| Aggregate utilization rate | Outstanding / combined limits | Real-time |
| Repayment stress score | Upcoming repayments / monthly cash flow | Daily |
| Cross-channel utilization velocity | Rate of utilization increase across products | Hourly |
| Product-stacking indicator | Number of products with active borrowing | On each new disbursement |

**Enforcement rules:**

| Rule | Threshold | Action |
|------|-----------|--------|
| Aggregate utilization cap | > 60% combined | Block new credit on any product until reduced |
| Cross-product stacking limit | Active borrowing on 3+ products | Require unified approval for any new credit |
| Repayment stress ceiling | Upcoming repayments > 50% of monthly cash flow | Reduce available limits, offer restructuring |
| Utilization velocity alarm | Aggregate utilization rising > 10% per week | Immediate review, potentially freeze new credit |

### 3.5 Credit Farming Ring Detection

In the Kenyan market, bust-out fraud is often **coordinated** — not individual. Multiple accounts are controlled by a single actor or organized group.

#### 3.5.1 Detection Mechanisms

| Mechanism | Implementation | What It Catches |
|-----------|---------------|-----------------|
| **Device Fingerprinting** | Track IMEI, device model, OS fingerprint, browser fingerprint across all sessions | Multiple "independent" merchants accessing from the same phone |
| **SIM / Phone Number Linkage** | Cross-reference registered phone numbers, SIM ICCIDs, and USSD-originating numbers | Shared SIM cards or phone numbers across merchant accounts |
| **Network / Graph Analysis** | Build a transaction graph — merchants as nodes, fund flows as edges — and detect tightly connected subgraphs | Circular transaction patterns where funds flow between ring members to simulate legitimate revenue |
| **GPS Clustering** | Compare GPS coordinates of merchant app sessions | Multiple "different businesses" operating from the same physical location |
| **Withdrawal Endpoint Analysis** | Map all fund-out destinations (M-Pesa wallets, bank accounts) across the portfolio | Multiple merchants funneling funds to the same destination account |
| **Behavioral Correlation** | Statistical correlation of transaction patterns, repayment timing, and score trajectories | Merchants that move in lockstep — same patterns, same timing — are likely coordinated |

#### 3.5.2 Ring Response Protocol

When a ring is detected:

1. **Immediate:** Freeze all new credit across all linked accounts
2. **24 hours:** Relationship managers contact each merchant individually
3. **48 hours:** If engagement is low (< 50% of linked merchants respond), escalate to fraud investigation
4. **7 days:** If ring is confirmed, report to credit bureau, initiate recovery proceedings, and update detection models with ring-specific features

### 3.6 Structural Accountability (Raise the Cost of Gaming)

These controls increase the *real-world cost* of attempting a bust-out.

#### 3.6.1 Progressive Security Escalation

Higher credit tiers require progressively stronger verification that creates accountability:

| Tier | Credit Limit | Additional Requirements |
|------|-------------|------------------------|
| Bronze (650) | KES 500K | KYC Level 1, national ID |
| Silver (700) | KES 1M | KYC Level 2, business registration |
| Gold (742) | KES 2.5M | KRA PIN certificate, 2 trade references |
| Platinum (800) | KES 5M | Personal guarantee, physical business inspection, 3 verified trade references |
| Diamond (850) | KES 10M | Registered asset security (logbook, title deed), director guarantees, audited financials |

**Rationale:** A fraudster aiming for Diamond tier would need to provide verifiable assets as security. The cost of fabricating an inspectable business with auditable financials and registered assets exceeds the potential fraud gain for most actors.

#### 3.6.2 Relationship-Based Controls

- **Named relationship manager** assigned at Gold tier and above — human oversight adds a layer that is difficult to game algorithmically
- **Annual business review** required for Platinum and Diamond — face-to-face assessment of genuine business operations
- **Mandatory physical site visit** before any limit increase above KES 2.5M

#### 3.6.3 Legal & Contractual Deterrents

- **Personal guarantees** at Platinum tier create individual liability beyond the business entity
- **Credit bureau reporting** — all facility activity reported to TransUnion/Metropol, meaning a bust-out permanently damages the individual's credit profile across all Kenyan lenders
- **Cross-default clauses** — a default on the Credit Catalyst facility triggers default on any other NCBA facilities the merchant holds

### 3.7 Product Design Defenses (Most Overlooked)

Many gaming vulnerabilities are created by **product design decisions** that make the system predictable. These are often the cheapest controls to implement.

#### 3.7.1 Obscure the Playbook

| Design Choice | Gaming Risk | Better Alternative |
|--------------|-------------|-------------------|
| Showing exact next-eligible limit (e.g., "You're 38 points from KES 10M") | Merchant knows exactly what target to hit | Show tier benefits without revealing exact limit thresholds. Use ranges: "Platinum merchants enjoy limits of KES 3M–5M." |
| Predictable limit increase rules (e.g., "+KES 500K every 3 months") | Merchant can forecast exactly when to strike | Introduce variability — increase amounts vary based on BAS, market conditions, and non-transparent factors |
| Showing all score factors and their weights | Merchant optimizes each factor individually | Show factor categories (e.g., "Payment History: Strong") without exact weights or point values |
| Linear rewards (higher score → proportionally higher limit) | Gaming effort scales linearly with reward | Use **non-linear rewards** — diminishing returns at higher tiers, unpredictable bonus rewards for genuinely exceptional behavior |

#### 3.7.2 Reward Cash Flow Stability, Not Just Repayment

Current system rewards:
- On-time payments ✓
- Revenue growth ✓
- Low utilization ✓

**Add rewards for signals that are hard to fake:**
- Consistent cash flow *volatility* within normal ranges (not too smooth, not too erratic)
- Long-term counterparty relationship stability (same suppliers over 12+ months)
- Organic seasonal patterns that match industry norms
- Cash reserves maintained above minimum thresholds — stability, not just growth

#### 3.7.3 Introduce Non-Linear Incentives

Instead of "higher score = bigger loan," introduce incentive structures that reward sustained engagement:

| Level | Incentive | Why It's Anti-Gaming |
|-------|-----------|---------------------|
| Gold | Partner discounts (Twiga, DHL, Safaricom) | These have ongoing business value — a gaming merchant gains nothing from them |
| Platinum | Reduced interest rates (not just higher limits) | Lower cost of capital rewards continued borrowing, not one-time extraction |
| Diamond | Revenue-sharing on ecosystem transactions | Ongoing income stream that only benefits merchants who continue operating |

**Key principle:** Make the *ongoing* value of being in the system higher than the *one-time* value of gaming out of it.

### 3.8 Portfolio-Level Defenses

#### 3.8.1 Concentration Limits

- No single merchant can represent more than 0.5% of total portfolio exposure
- No single industry segment can exceed 20% of portfolio
- Geographic concentration limits per county/sub-county
- Cross-product concentration: no merchant's aggregate exposure > 2× their single highest product limit

#### 3.8.2 Cohort Analysis

Monthly analysis comparing:
- Default rates by onboarding cohort (merchants who joined in the same period)
- Score trajectory distributions by cohort
- Correlation analysis across merchants to detect ring patterns
- Trust Score distribution shifts — is the portfolio's average trust decaying?

#### 3.8.3 Economic Stress Testing

Regular portfolio stress tests simulating:
- Coordinated bust-out by top 1% of merchants by limit
- Simultaneous default by all merchants with BAS < 70
- Industry-specific shocks affecting high-concentration segments
- Cross-product stacking scenario: what if all merchants at >60% aggregate utilization default simultaneously?

---

## 4. Implementation Priority Matrix

| Priority | Control | Effort | Impact | Timeline |
|----------|---------|--------|--------|----------|
| **P0** | Single-disbursement cap (40% rule) | Low | High | Immediate |
| **P0** | Staggered loan release (tranche disbursement) | Medium | Very High | Sprint 1 |
| **P0** | Cooling period after tier upgrades | Low | High | Sprint 1 |
| **P0** | Unified Credit Exposure Layer (cross-product) | Medium | Critical | Sprint 1 |
| **P1** | Graduated limit vesting | Medium | Very High | Sprint 2 |
| **P1** | Exposure velocity caps | Low | High | Sprint 2 |
| **P1** | Bust-Out Risk Score (MVP heuristic) | Medium | Very High | Sprint 2 |
| **P1** | Post-disbursement monitoring engine | High | Very High | Sprint 2–3 |
| **P1** | Progressive security escalation | Medium | High | Sprint 2 |
| **P1** | Cash flow re-validation before large draws | Low | High | Sprint 2 |
| **P2** | Behavioral Authenticity Score (BAS) | High | Very High | Sprint 3–4 |
| **P2** | Trust Decay Model | High | Very High | Sprint 3–4 |
| **P2** | Self-healing as fraud detection | Medium | High | Sprint 3 |
| **P2** | Product design defenses (obscure playbook) | Low | High | Sprint 3 |
| **P2** | Exit velocity detection model | High | High | Sprint 4–5 |
| **P2** | Early warning trigger automation | Medium | High | Sprint 4 |
| **P3** | Device fingerprinting + ring detection | High | Very High | Sprint 5–6 |
| **P3** | Network/graph analysis | High | High | Sprint 5–6 |
| **P3** | Cohort/cluster analysis | Medium | Medium | Sprint 5–6 |
| **P3** | Portfolio stress testing | Medium | Medium | Sprint 6 |

---

## 5. Key Metrics & KPIs

| Metric | Target | Frequency |
|--------|--------|-----------|
| Portfolio bust-out rate | < 0.1% of merchants | Monthly |
| Average BAS score (portfolio) | > 80 | Monthly |
| Average Trust Score (portfolio) | > 75 | Monthly |
| Trust Score decay rate (merchants with declining trust) | < 3% of active merchants | Weekly |
| False positive rate (genuine merchants flagged) | < 5% | Monthly |
| False negative rate (gaming merchants missed) | < 2% | Quarterly (retrospective) |
| Maximum single-merchant exposure | < 0.5% of portfolio | Daily |
| Maximum aggregate cross-product exposure per merchant | < 2× single-product limit | Real-time |
| Post-disbursement activity maintenance rate | > 85% of merchants maintain ≥ 80% activity | Monthly |
| Tranche 2/3 freeze rate | < 3% of multi-tranche loans | Monthly |
| Self-healing engagement rate (among offered merchants) | > 70% engage within 7 days | Monthly |
| Time to detect bust-out intent | < 14 days post-first-signal | Per incident |
| Recovery rate on detected gaming attempts | > 70% of exposed amount | Per incident |
| Ring detection rate | > 90% of coordinated rings detected pre-default | Quarterly |
| Bust-Out Risk Score distribution | < 5% of merchants with score > 50 | Monthly |

---

## 6. Design Principles — What "Good" Looks Like

A well-designed anti-gaming system:

| Principle | Description |
|-----------|-------------|
| **Doesn't punish genuine growth** | A real merchant who grows quickly should not be penalized. The system should distinguish between organic rapid growth and manufactured rapid growth. |
| **Detects intent, not just behavior** | Behavior is gameable. Intent is revealed by patterns across time, products, and contexts. The system should assess *why*, not just *what*. |
| **Acts before default, not after** | Traditional loan servicing waits for a missed payment. This system intervenes at behavioral signals — weeks or months before a default would occur. |
| **Works across all lending channels** | No single product should be evaluating risk in isolation. The Unified Credit Exposure Layer is the architectural backbone. |
| **Makes gaming expensive** | Through personal guarantees, progressive verification, credit bureau reporting, and cross-default clauses, the real-world cost of gaming should exceed the potential gain. |
| **Rewards sustained engagement over one-time extraction** | The ongoing value of staying in the system (reduced rates, partner benefits, ecosystem revenue) should exceed the one-time value of maxing out and exiting. |
| **Uses asymmetric trust dynamics** | Trust builds slowly but decays quickly — mirroring how real trust works in business relationships. |
| **Remains invisible to the merchant** | The merchant sees the credit score, the gamification, the incentives. The business sees the Trust Score, the BAS, the ring detection. These are separate systems serving separate purposes. |

---

## 7. Summary

The anti-gaming framework operates on a fundamental principle: **defense in depth**. No single control prevents all gaming — but the layered combination of structural limits, behavioral intelligence, trust dynamics, cross-product visibility, and accountability mechanisms makes bust-out fraud:

1. **Harder to execute** — graduated vesting, velocity caps, and cooling periods mean gaming requires years of sustained effort with diminishing certainty of payoff
2. **Lower reward** — disbursement caps and tranche release limit maximum extraction to ~16% of total facility; cross-product exposure limits prevent stacking
3. **Easier to detect** — behavioral authenticity scoring, trust decay models, and ring detection catch manufactured patterns; self-healing engagement tests reveal intent
4. **Costlier to attempt** — personal guarantees, asset security, credit bureau reporting, and cross-default clauses create consequences that outlast the fraud
5. **Unprofitable in expectation** — the combination of limited extraction (low reward), high detection probability (high risk), and severe consequences (high penalty) makes the expected value of gaming **negative** for the fraudster

The goal is not to eliminate all risk — that would also eliminate all lending. The goal is to make the **expected value of gaming negative** for the fraudster while keeping the system accessible, transparent, and rewarding for genuine merchants.

> A strong system doesn't punish genuine growth. It detects intent, not just behavior. It acts before default, not after. And it works across all lending channels — because a fraudster will find the weakest one.

---

*Document prepared for NCBA Credit Catalyst — Risk & Credit Operations*
