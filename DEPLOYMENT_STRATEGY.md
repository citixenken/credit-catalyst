# NCBA Credit Catalyst — Deployment Strategy & Timelines

## Current State Assessment

| Aspect | Status |
|--------|--------|
| **Frontend Prototype** | Complete — React 19 + Vite 8 + Tailwind CSS 4 |
| **Backend** | Not built — no API, no server |
| **Database** | localStorage only (mock data) |
| **Authentication** | Simulated (hardcoded credentials) |
| **ML/AI Models** | Not built — logic is mocked in UI |
| **Infrastructure** | None — no CI/CD, no containers, no cloud config |
| **Build Output** | Static files (dist/) — deployable to any static host |

---

## Deployment Phases

### PHASE 0 — Demo Deployment (Week 1–2)
> **Goal**: Get the current prototype live for stakeholder demos and pitch presentations.

| Task | Tool/Service | Timeline |
|------|-------------|----------|
| Create GitHub repository | GitHub (private repo) | Day 1 |
| Push codebase + configure branch protection | GitHub | Day 1 |
| Deploy frontend to Azure Static Web Apps | Azure Static Web Apps (Free tier) | Day 1–2 |
| Configure custom domain (e.g. `creditcatalyst.ncbagroup.com`) | Azure DNS + Static Web Apps | Day 2–3 |
| Set up GitHub Actions CI/CD for auto-deploy on push to `main` | GitHub Actions | Day 2–3 |
| Add staging environment (deploy on PR) | Azure Static Web Apps (preview environments) | Day 3 |
| Add basic analytics | Azure Application Insights (frontend SDK) | Day 4–5 |
| Security scan of dependencies | GitHub Dependabot + npm audit | Day 5 |
| Load testing of static site | Azure Load Testing (basic) | Week 2 |
| Stakeholder UAT on staging URL | — | Week 2 |

**Deliverable**: Live demo URL with CI/CD pipeline, accessible to stakeholders.

**Cost**: ~$0/month (Azure Static Web Apps free tier supports custom domains + SSL).

---

### PHASE 1 — Backend Foundation + Pilot (Months 1–3)
> **Goal**: Build the backend services needed to replace mock data with real systems. Pilot with 500 merchants in Nairobi.

#### 1A — Backend API & Auth (Weeks 1–4)

| Task | Tool/Service | Timeline |
|------|-------------|----------|
| Set up Azure API Management (gateway) | Azure API Management (Consumption tier) | Week 1 |
| Build auth service — registration, login, JWT tokens | Azure Functions (Node.js/Python) + Azure AD B2C | Week 1–2 |
| Build merchant profile service (CRUD) | Azure Functions + Azure Cosmos DB | Week 2–3 |
| Build KYC document upload + verification | Azure Blob Storage + Azure AI Document Intelligence | Week 3–4 |
| Integrate M-Pesa/card payment webhooks | Azure Functions (event-driven) | Week 3–4 |
| Connect frontend to real APIs (replace mock data) | React + Axios/fetch | Week 4 |
| API security — rate limiting, CORS, input validation | Azure API Management policies | Week 4 |

**Microsoft Tools**:
- **Azure AD B2C** — Merchant authentication with MFA, social login, phone OTP
- **Azure Functions** — Serverless backend (pay-per-execution, auto-scale)
- **Azure Cosmos DB** — NoSQL database for merchant profiles, transactions, scores
- **Azure API Management** — API gateway with throttling, caching, analytics
- **Azure AI Document Intelligence** — KYC document scanning (IDs, business permits, tax PINs)
- **Azure Blob Storage** — Document and file storage

#### 1B — Data Pipeline & Credit Scoring (Weeks 3–6)

| Task | Tool/Service | Timeline |
|------|-------------|----------|
| Design data schema (merchants, transactions, loans, scores) | Azure Cosmos DB (document model) | Week 3 |
| Build Pulse API — real-time transaction ingestion | Azure Event Hubs + Azure Stream Analytics | Week 4–5 |
| Build initial credit scoring model (rules-based v1) | Azure Functions (Python) | Week 5 |
| Historical data import from NCBA core banking | Azure Data Factory | Week 5–6 |
| Set up data lake for raw transaction storage | Azure Data Lake Storage Gen2 | Week 5 |
| Build credit score calculation pipeline | Azure Functions + Cosmos DB change feed | Week 6 |

**Microsoft Tools**:
- **Azure Event Hubs** — High-throughput real-time transaction stream (Pulse API)
- **Azure Stream Analytics** — Real-time aggregation (daily revenue, transaction patterns)
- **Azure Data Factory** — ETL from NCBA core banking + M-Pesa APIs
- **Azure Data Lake Storage Gen2** — Raw transaction data lake for ML training

#### 1C — Infrastructure & Security (Weeks 4–8)

| Task | Tool/Service | Timeline |
|------|-------------|----------|
| Set up Azure Virtual Network (VNet) for service isolation | Azure VNet | Week 4 |
| Configure Azure Key Vault for secrets management | Azure Key Vault | Week 4 |
| Enable Azure Monitor + Log Analytics | Azure Monitor | Week 5 |
| Set up alerts (error rate, latency, availability) | Azure Monitor Alerts | Week 5 |
| Penetration testing | Microsoft Defender for Cloud | Week 6–7 |
| Compliance review (CBK regulations, data protection) | Azure Policy + Compliance Manager | Week 7–8 |
| Disaster recovery — geo-redundant backups | Azure Cosmos DB (multi-region) + Blob geo-replication | Week 8 |

**Microsoft Tools**:
- **Azure Key Vault** — API keys, DB connection strings, JWT secrets
- **Azure Monitor + Log Analytics** — Centralized logging, performance monitoring
- **Microsoft Defender for Cloud** — Threat detection, vulnerability assessment
- **Azure Policy** — Governance guardrails (e.g., enforce encryption, restrict regions)

#### 1D — Pilot Launch (Weeks 8–12)

| Task | Tool/Service | Timeline |
|------|-------------|----------|
| Onboard 500 pilot merchants (Nairobi) | — | Week 8–9 |
| Real M-Pesa transaction data flowing through Pulse API | Azure Event Hubs | Week 9 |
| Monitor pilot metrics (adoption, score accuracy, UX) | Azure Application Insights + Power BI | Week 9–12 |
| Iterate on credit scoring rules based on real data | Azure Functions | Week 10–12 |
| Build admin dashboard for NCBA operations team | Power BI embedded | Week 10–12 |
| Collect merchant feedback + UX improvements | — | Week 11–12 |

**Deliverable**: 500 merchants live with real data, validated credit scoring, production infrastructure.

**Cost Estimate**: ~$800–1,500/month (Consumption-tier Azure services).

---

### PHASE 2 — AI/ML Models + Scale (Months 4–8)
> **Goal**: Replace rules-based scoring with ML models. Scale to 5,000 merchants. Launch partner integrations.

#### 2A — ML Model Development (Months 4–6)

| Task | Tool/Service | Timeline |
|------|-------------|----------|
| Set up Azure ML workspace | Azure Machine Learning | Month 4, Week 1 |
| Feature engineering from pilot transaction data | Azure ML + Azure Databricks | Month 4, Week 1–2 |
| Train credit scoring model (XGBoost / LightGBM) | Azure ML (AutoML + custom training) | Month 4, Week 2–4 |
| Train cash-flow prediction model (LSTM/Prophet) | Azure ML (compute clusters) | Month 5, Week 1–3 |
| Train default risk prediction model | Azure ML | Month 5, Week 2–4 |
| Model validation (backtesting against NCBA historical data) | Azure ML (responsible AI dashboard) | Month 5, Week 3–4 |
| Deploy models as real-time endpoints | Azure ML managed endpoints | Month 6, Week 1 |
| Build Flex-Pay Engine (dynamic repayment adjustment) | Azure Functions + ML endpoints | Month 6, Week 1–2 |
| Build Self-Healing Repayments (auto-pause logic) | Azure Functions + Event Hubs triggers | Month 6, Week 2–3 |
| A/B testing: ML scores vs rules-based scores | Azure ML + Application Insights | Month 6, Week 3–4 |

**Microsoft ML Tools**:
- **Azure Machine Learning** — End-to-end ML lifecycle (training, evaluation, deployment, monitoring)
- **Azure ML AutoML** — Automated model selection for credit scoring
- **Azure ML Responsible AI** — Fairness analysis, model explainability (critical for credit decisions)
- **Azure Databricks** — Large-scale feature engineering on transaction data
- **Azure ML Managed Endpoints** — Real-time inference with auto-scaling
- **Azure ML Pipelines** — Automated retraining on new data (monthly/weekly cadence)

#### 2B — Explainable AI & Transparency (Month 5–6)

| Task | Tool/Service | Timeline |
|------|-------------|----------|
| Implement SHAP/LIME explanations for score factors | Azure ML Responsible AI toolkit | Month 5 |
| Build "Why This Score?" API endpoint | Azure Functions + ML interpretability | Month 5–6 |
| Build score improvement recommendations engine | Azure ML + Azure OpenAI Service | Month 6 |
| Regulatory explainability documentation | Azure ML model cards | Month 6 |

**Microsoft Tools**:
- **Azure ML Responsible AI Dashboard** — Built-in SHAP, fairness metrics, error analysis
- **Azure OpenAI Service** — GPT-4 for natural-language score explanations and AI advice generation

#### 2C — Scale to 5,000 Merchants (Months 6–8)

| Task | Tool/Service | Timeline |
|------|-------------|----------|
| Horizontal scaling — auto-scale Azure Functions | Azure Functions Premium plan | Month 6 |
| Database partitioning strategy | Azure Cosmos DB (partition keys) | Month 6 |
| CDN for frontend static assets | Azure Front Door + CDN | Month 6 |
| Partner API integrations (Twiga Foods, Safaricom, DHL) | Azure API Management (products/subscriptions) | Month 7–8 |
| Notification service (SMS, push, email) | Azure Communication Services | Month 7 |
| Merchant self-service portal | React + existing component library | Month 7–8 |
| Performance optimization (P95 latency < 200ms) | Azure Monitor + load testing | Month 8 |

**Microsoft Tools**:
- **Azure Front Door** — Global CDN + WAF (Web Application Firewall)
- **Azure Communication Services** — SMS/email notifications to merchants
- **Azure Load Testing** — Stress testing at scale

**Deliverable**: 5,000 merchants, ML-powered scoring, Flex-Pay + Self-Healing live, partner integrations active.

**Cost Estimate**: ~$3,000–6,000/month.

---

### PHASE 3 — Regional Expansion + CaaS API (Months 9–14)
> **Goal**: Expand to Tanzania and Uganda. Launch Credit-as-a-Service API for B2B partners.

| Task | Tool/Service | Timeline |
|------|-------------|----------|
| Multi-region deployment (East Africa) | Azure (South Africa North + fallback) | Month 9 |
| Multi-currency support (KES, TZS, UGX) | Application logic + Azure Cosmos DB | Month 9–10 |
| Localization (Swahili, regional compliance) | React i18n + Azure Translator | Month 10 |
| CaaS (Credit-as-a-Service) API for partners | Azure API Management (developer portal) | Month 10–12 |
| Partner onboarding portal | Azure Static Web Apps + Azure AD B2B | Month 11–12 |
| Country-specific regulatory compliance | Azure Policy + manual review | Month 11–13 |
| Tanzania pilot (1,000 merchants) | — | Month 12–13 |
| Uganda pilot (1,000 merchants) | — | Month 13–14 |
| Model retraining on multi-country data | Azure ML Pipelines (automated) | Month 13–14 |

**Microsoft Tools**:
- **Azure Traffic Manager** — Multi-region routing (Kenya, Tanzania, Uganda)
- **Azure API Management Developer Portal** — Self-service API docs for CaaS partners
- **Azure AD B2B** — Partner identity federation
- **Azure Cognitive Services Translator** — Content localization

**Deliverable**: Live in 3 countries, CaaS API available, 7,000+ merchants.

**Cost Estimate**: ~$8,000–15,000/month.

---

### PHASE 4 — Open Platform + Maturity (Months 15–18)
> **Goal**: Open platform for 3rd-party lenders. Full operational maturity.

| Task | Tool/Service | Timeline |
|------|-------------|----------|
| 3rd-party lender onboarding via API | Azure API Management + Azure AD B2C | Month 15–16 |
| Advanced fraud detection model | Azure ML + Azure Synapse Analytics | Month 15–16 |
| Real-time dashboards for NCBA leadership | Power BI (embedded, real-time streaming) | Month 16 |
| SOC 2 / ISO 27001 compliance audit | Microsoft Compliance Manager | Month 16–17 |
| Platform SLA definition (99.9% uptime) | Azure SLA + Azure Monitor | Month 17 |
| Chaos engineering / resilience testing | Azure Chaos Studio | Month 17 |
| Full production hardening | Azure Well-Architected Review | Month 17–18 |
| Merchant base target: 10,000+ | — | Month 18 |

**Microsoft Tools**:
- **Azure Synapse Analytics** — Large-scale analytics for fraud patterns
- **Power BI** — Executive dashboards, real-time merchant analytics
- **Azure Chaos Studio** — Fault injection testing for resilience
- **Microsoft Compliance Manager** — Automated compliance tracking

**Deliverable**: Open platform, 10,000+ merchants, 3rd-party lenders onboarded, enterprise-grade SLAs.

**Cost Estimate**: ~$15,000–30,000/month (at scale).

---

## Complete Microsoft / Azure Tool Map

| Layer | Service | Purpose | Phase |
|-------|---------|---------|-------|
| **Source Control** | GitHub (private repos) | Code hosting, PR reviews, branch protection | 0 |
| **CI/CD** | GitHub Actions | Build, test, deploy pipelines | 0 |
| **Security Scanning** | GitHub Dependabot + Advanced Security | Dependency vulnerabilities, secret scanning, code scanning | 0 |
| **Frontend Hosting** | Azure Static Web Apps | React app hosting (SSL, custom domains, preview envs) | 0 |
| **API Gateway** | Azure API Management | Rate limiting, caching, partner API products | 1 |
| **Compute (Backend)** | Azure Functions | Serverless API endpoints (Node.js / Python) | 1 |
| **Auth** | Azure AD B2C | Merchant authentication, MFA, phone OTP | 1 |
| **Database** | Azure Cosmos DB | Merchant profiles, transactions, scores (NoSQL) | 1 |
| **File Storage** | Azure Blob Storage | KYC documents, receipts, business permits | 1 |
| **Document AI** | Azure AI Document Intelligence | KYC document scanning — ID extraction, business permit parsing | 1 |
| **Secrets** | Azure Key Vault | API keys, connection strings, JWT secrets | 1 |
| **Monitoring** | Azure Monitor + Application Insights | Logs, metrics, distributed tracing, frontend RUM | 1 |
| **Threat Protection** | Microsoft Defender for Cloud | Vulnerability scanning, threat detection | 1 |
| **Event Streaming** | Azure Event Hubs | Pulse API — real-time transaction ingestion | 1 |
| **Stream Processing** | Azure Stream Analytics | Real-time transaction aggregation, pattern detection | 1 |
| **ETL** | Azure Data Factory | Core banking data import, scheduled data sync | 1 |
| **Data Lake** | Azure Data Lake Storage Gen2 | Raw transaction data for ML training | 1 |
| **ML Platform** | Azure Machine Learning | Model training, evaluation, deployment, monitoring | 2 |
| **AutoML** | Azure ML AutoML | Automated model selection for credit scoring | 2 |
| **ML Explainability** | Azure ML Responsible AI | SHAP explanations, fairness analysis, model cards | 2 |
| **Feature Engineering** | Azure Databricks | Large-scale transaction feature engineering | 2 |
| **Generative AI** | Azure OpenAI Service | Natural-language score explanations, AI advisor | 2 |
| **CDN + WAF** | Azure Front Door | Global content delivery, DDoS protection | 2 |
| **Notifications** | Azure Communication Services | SMS, email, push notifications to merchants | 2 |
| **Load Testing** | Azure Load Testing | Performance and stress testing at scale | 2 |
| **Multi-region Routing** | Azure Traffic Manager | Geographic routing (Kenya, Tanzania, Uganda) | 3 |
| **Localization** | Azure Cognitive Services Translator | Multi-language support (Swahili, English) | 3 |
| **Partner Identity** | Azure AD B2B | Partner federation for CaaS API | 3 |
| **Advanced Analytics** | Azure Synapse Analytics | Fraud detection, large-scale analytics | 4 |
| **BI Dashboards** | Power BI (Embedded) | Executive dashboards, real-time merchant analytics | 4 |
| **Resilience Testing** | Azure Chaos Studio | Fault injection, chaos engineering | 4 |
| **Compliance** | Microsoft Compliance Manager | SOC 2, ISO 27001, CBK regulatory tracking | 4 |
| **Governance** | Azure Policy | Enforce encryption, region restrictions, tagging | 1–4 |

---

## Timeline Summary

```
PHASE 0 — Demo Deployment .............. Week 1–2
  └─ Live demo URL, CI/CD, GitHub repo

PHASE 1 — Backend + Pilot .............. Months 1–3
  ├─ 1A: Backend API & Auth ............ Weeks 1–4
  ├─ 1B: Data Pipeline & Scoring ....... Weeks 3–6
  ├─ 1C: Infrastructure & Security ..... Weeks 4–8
  └─ 1D: Pilot (500 merchants) ........ Weeks 8–12

PHASE 2 — AI/ML + Scale ................ Months 4–8
  ├─ 2A: ML Model Development ......... Months 4–6
  ├─ 2B: Explainable AI ............... Months 5–6
  └─ 2C: Scale to 5K merchants ........ Months 6–8

PHASE 3 — Regional Expansion ........... Months 9–14
  ├─ Multi-region + Multi-currency ..... Months 9–10
  ├─ CaaS API for partners ............ Months 10–12
  └─ Tanzania + Uganda pilots ......... Months 12–14

PHASE 4 — Open Platform ................ Months 15–18
  ├─ 3rd-party lender onboarding ...... Months 15–16
  ├─ Advanced fraud detection ......... Months 15–16
  ├─ Compliance + hardening ........... Months 16–18
  └─ 10,000+ merchants ............... Month 18
```

---

## Cost Trajectory

| Phase | Monthly Cost | Cumulative Spend |
|-------|-------------|-----------------|
| Phase 0 (Demo) | ~$0 | $0 |
| Phase 1 (Pilot) | ~$800–1,500 | $2,400–4,500 |
| Phase 2 (Scale) | ~$3,000–6,000 | $17,000–34,500 |
| Phase 3 (Regional) | ~$8,000–15,000 | $65,000–124,500 |
| Phase 4 (Platform) | ~$15,000–30,000 | $110,000–214,500 |

> Costs assume Azure consumption/pay-as-you-go pricing. Significant savings possible with Azure Reserved Instances and the requested $150–250K Microsoft cloud credits.

---

## Risk Mitigation

| Risk | Mitigation | Azure Tool |
|------|-----------|-----------|
| Data breach / PII exposure | Encryption at rest + in transit, RBAC, network isolation | Azure Key Vault, VNet, Defender |
| ML model bias in credit decisions | Fairness analysis, regular audits, explainability | Azure ML Responsible AI |
| Regulatory non-compliance (CBK) | Automated compliance tracking, audit trails | Compliance Manager, Azure Policy |
| Service downtime | Multi-region failover, chaos testing | Traffic Manager, Chaos Studio |
| Vendor lock-in | Containerized services, API-first architecture | Azure Kubernetes Service (fallback) |
| Cost overrun | Budget alerts, consumption monitoring | Azure Cost Management |
| Poor model accuracy | A/B testing, automated retraining, human-in-the-loop | Azure ML Pipelines, Application Insights |

---

## Team Requirements

| Phase | Roles Needed | Headcount |
|-------|-------------|-----------|
| Phase 0 | Frontend dev (existing) | 1 |
| Phase 1 | Backend dev, DevOps/Cloud, QA | 3–4 |
| Phase 2 | ML engineer, Data engineer, Backend dev, QA | 4–5 |
| Phase 3 | + Product manager, Compliance officer, Regional ops | 6–8 |
| Phase 4 | + Security engineer, Partner success, Support | 8–10 |
