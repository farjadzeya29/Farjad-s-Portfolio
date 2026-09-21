import {
  ServiceItem,
  SkillItem,
  ExperienceItem,
  ECommerceRecord,
  ChurnRecord,
  SupplyChainRecord,
  MarketingCampaignRecord,
  DataPoint3D,
} from '../types';

export const PROFILE = {
  name: 'FARJAD ZEYA',
  title: 'DATA ANALYST',
  roleTagline: 'Data Analyst & Business Intelligence Freelancer',
  valueProposition: 'Turn your raw business data into clear dashboards, actionable insights and better decisions.',
  bio: 'Data Analyst focused on transforming operational and business data into clear, actionable insights. Specializing in Power BI executive dashboards, structured Excel MIS automation, relational SQL querying, and Python exploratory data analysis.',
  email: 'farjadzeya1234@gmail.com',
  phone: '+91 6204812301',
  location: 'New Delhi, India',
  education: {
    degree: 'B.Tech — Computer Science Engineering',
    institution: 'Jamia Hamdard University',
    graduation: 'Graduated May 2026',
    location: 'New Delhi',
  },
  currentRole: {
    title: 'Maintenance Data Analyst',
    company: 'CK Infrastructure Ltd',
    period: 'Aug 2026 – Present',
    location: 'New Delhi',
    responsibilities: [
      'Excel Pivot Table dashboards and charts',
      'Monthly diesel consumption analysis',
      'Fleet data analysis and meter-reading validation',
      'Machinery / fuel consumption analysis',
      'Data integrity and structured maintenance records',
      'Management MIS reporting',
    ],
  },
  previousInternships: [
    {
      title: 'Data Analyst Intern',
      company: 'Cochain LLC',
      period: 'May 2025 – Aug 2025',
      responsibilities: [
        'Python EDA with pandas and NumPy',
        'Data cleaning and anomaly handling',
        'Feature engineering for predictive pipelines',
        'ML model evaluation (Accuracy, Precision, Recall, F1-score)',
        'Formulating data-backed business recommendations',
      ],
    },
    {
      title: 'Software Developer Intern',
      company: 'CDAC Patna',
      period: 'Jan 2024 – Feb 2024',
      responsibilities: [
        'SQL database design and schema normalization',
        'Complex SQL querying and stored procedures',
        'REST API design and integration',
        'Relational database performance optimization',
      ],
    },
  ],
  certifications: [
    {
      title: 'Deloitte Data Analytics Virtual Experience',
      issuer: 'Deloitte',
      focus: 'Forensic analytics, data storytelling, and business strategy interpretation.',
    },
    {
      title: 'JPMorgan Chase Software Engineering Virtual Experience',
      issuer: 'JPMorgan Chase & Co.',
      focus: 'Data feeds, live streaming financial visualization, interface performance.',
    },
    {
      title: 'TCS iON Virtual Internship',
      issuer: 'Tata Consultancy Services',
      focus: 'Industry-standard data modeling, business reporting, and relational hygiene.',
    },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'power-bi',
    number: '01',
    title: 'Power BI Dashboards',
    shortDesc: 'Transform raw Excel, CSV, or relational SQL data into interactive, executive-ready management dashboards.',
    deliverables: [
      'Interactive executive KPI cards',
      'Cross-visual filtering & slicers',
      'Time-series trend analysis & YoY comparisons',
      'Hierarchical drill-throughs & decomposition trees',
      'Optimized star-schema data modeling',
      'Automated scheduled cloud refresh',
    ],
    exampleUseCase: 'Converting multi-tab Excel files into an executive sales and operational command center with real-time slicing.',
    iconName: 'LayoutDashboard',
    tag: 'Executive Reporting',
  },
  {
    id: 'excel-mis',
    number: '02',
    title: 'Excel & MIS Reporting',
    shortDesc: 'Robust Excel systems with dynamic pivot tables, structured formulas, and clean executive summaries.',
    deliverables: [
      'Advanced Pivot Tables & Slicers',
      'Dynamic lookup models (XLOOKUP, INDEX/MATCH, SUMIFS)',
      'Automated daily/weekly/monthly MIS decks',
      'Meter-reading & operational validation checks',
      'Conditional formatting & threshold alerts',
      'Audit-ready data structure hygiene',
    ],
    exampleUseCase: 'Tracking fleet diesel consumption, machinery usage hours, and maintenance expenditures across project sites.',
    iconName: 'FileSpreadsheet',
    tag: 'Operational MIS',
  },
  {
    id: 'sql-analysis',
    number: '03',
    title: 'SQL Data Analysis',
    shortDesc: 'Extract clean business answers from complex relational databases using optimized queries and stored logic.',
    deliverables: [
      'Complex multi-table relational joins',
      'Window functions (RANK, DENSE_RANK, LEAD/LAG, Running Totals)',
      'Common Table Expressions (CTEs) for legible pipelines',
      'Aggregation & cohort grouping',
      'Data integrity validation queries',
      'Query indexing & performance tuning',
    ],
    exampleUseCase: 'Querying transactional schemas to compute customer lifetime value, cohort churn rates, and repeat order intervals.',
    iconName: 'Database',
    tag: 'Database Engineering',
  },
  {
    id: 'python-analysis',
    number: '04',
    title: 'Python Data Analysis',
    shortDesc: 'End-to-end exploratory data analysis (EDA), anomaly detection, and statistical distribution modeling.',
    deliverables: [
      'Pandas & NumPy data wrangling',
      'Outlier detection & missing value imputation',
      'Descriptive statistics & correlation heatmaps',
      'Feature engineering & metric derivation',
      'Model evaluation (Precision, Recall, F1-Score)',
      'Reproducible Jupyter / script workflows',
    ],
    exampleUseCase: 'Uncovering multi-collinear drivers of customer attrition and scoring customer retention probabilities.',
    iconName: 'Code2',
    tag: 'Exploratory & Modeling',
  },
  {
    id: 'data-cleaning',
    number: '05',
    title: 'Data Cleaning & Transformation',
    shortDesc: 'Fix corrupted values, inconsistent formats, duplicate records, and schema mismatches into standardized datasets.',
    deliverables: [
      'Duplicate row deduplication & key validation',
      'Date/timestamp harmonization across timezones',
      'Text standardization & regex extraction',
      'Handling NULL/NaN values with domain logic',
      'Type casting & categorical normalization',
      'Automated data quality audit reports',
    ],
    exampleUseCase: 'Standardizing dirty field logs and equipment sensor feeds into clean tabular records suitable for BI ingestion.',
    iconName: 'Wand2',
    tag: 'Data Hygiene',
  },
  {
    id: 'business-kpi',
    number: '06',
    title: 'Business KPI Reporting',
    shortDesc: 'Define, track, and monitor north-star metrics that accurately measure operational and financial health.',
    deliverables: [
      'KPI catalog & metric formula definitions',
      'Actual vs. Budget / Target variance analysis',
      'Operational bottleneck identification',
      'Executive summary scorecards',
      'Trend deviation alerts',
      'Departmental performance benchmarks',
    ],
    exampleUseCase: 'Formulating logistics performance scorecards comparing promised vs. actual delivery lead times.',
    iconName: 'TrendingUp',
    tag: 'Strategic Alignment',
  },
  {
    id: 'sales-customer',
    number: '07',
    title: 'Sales & Customer Analytics',
    shortDesc: 'Granular RFM segmentation, customer lifetime value, and cohort retention diagnostics.',
    deliverables: [
      'RFM (Recency, Frequency, Monetary) segmentation',
      'Cohort retention matrices',
      'Customer Acquisition Cost (CAC) vs. LTV analysis',
      'Product mix & basket margin analysis',
      'Churn risk scoring & early-warning signals',
      'Regional sales performance heatmaps',
    ],
    exampleUseCase: 'Identifying high-value e-commerce customer tiers and isolating product categories suffering high return rates.',
    iconName: 'Users',
    tag: 'Customer Strategy',
  },
  {
    id: 'automated-reporting',
    number: '08',
    title: 'Automated Reporting',
    shortDesc: 'Eliminate repetitive manual hours by setting up scripted or scheduled reporting pipelines.',
    deliverables: [
      'Automated CSV / Excel ingestion pipelines',
      'Scheduled Power BI workspace refreshes',
      'Standardized MIS template population',
      'Exception alerting workflows',
      'Self-serve dashboard documentation',
      'Handoff guides and operator training',
    ],
    exampleUseCase: 'Replacing a 4-hour daily manual Excel compilation routine with a 2-minute automated refresh.',
    iconName: 'Cpu',
    tag: 'Automation & Scale',
  },
];

export const SKILLS: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Languages & Querying',
    whatIUseItFor: 'End-to-end exploratory data analysis, data manipulation, statistical profiling, and feature engineering.',
    relevantProject: 'E-Commerce RFM Segmentation & Cochain LLC Intern Analysis',
    exampleDeliverable: 'Pandas data pipelines calculating customer recency/frequency metrics and statistical distributions.',
    proficiencyLevel: 'Expert Core',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Languages & Querying',
    whatIUseItFor: 'Relational database querying, multi-table joins, Window Functions, CTEs, and aggregation pipelines.',
    relevantProject: 'CDAC Patna Internship & Banking Churn SQL Analytical Engine',
    exampleDeliverable: 'Complex SQL scripts computing cohort retention, running revenue totals, and customer churn probabilities.',
    proficiencyLevel: 'Expert Core',
  },
  {
    id: 'excel',
    name: 'Microsoft Excel',
    category: 'BI & Visualization',
    whatIUseItFor: 'Dynamic Pivot Tables, complex formulas (XLOOKUP, INDEX/MATCH, SUMIFS), and operational MIS reporting.',
    relevantProject: 'CK Infrastructure Ltd Fleet & Diesel Consumption Management',
    exampleDeliverable: 'Multi-site diesel consumption tracker with automated meter validation and executive summary dashboard.',
    proficiencyLevel: 'Expert Core',
  },
  {
    id: 'power-bi',
    name: 'Power BI',
    category: 'BI & Visualization',
    whatIUseItFor: 'Interactive management dashboards, star-schema data modeling, DAX measures, and cross-visual slicing.',
    relevantProject: 'Supply Chain Command Center & E-Commerce Sales Analytics',
    exampleDeliverable: 'Multi-page interactive report with drill-through hierarchies, dynamic parameter slicers, and KPI cards.',
    proficiencyLevel: 'Expert Core',
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'Libraries & Cleaning',
    whatIUseItFor: 'Dataframe wrangling, datetime parsing, group-by aggregations, reshaping, and tabular cleaning.',
    relevantProject: 'Cochain LLC Model Evaluation & Anomaly Cleaning',
    exampleDeliverable: 'Data transformation pipeline handling missing entries, duplicate rows, and metric normalization.',
    proficiencyLevel: 'Advanced Daily',
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Libraries & Cleaning',
    whatIUseItFor: 'Vectorized mathematical operations, array manipulation, and numerical computations.',
    relevantProject: 'Python Exploratory Data Analysis & Statistical Modeling',
    exampleDeliverable: 'Fast numerical array transformations for variance and standard deviation calculations across large series.',
    proficiencyLevel: 'Advanced Daily',
  },
  {
    id: 'data-cleaning',
    name: 'Data Cleaning',
    category: 'Libraries & Cleaning',
    whatIUseItFor: 'Detecting outliers, imputing or filtering nulls, standardizing formats, and enforcing data hygiene.',
    relevantProject: 'CK Infrastructure Fleet Log Standardization',
    exampleDeliverable: 'Deduplicated, standardized datasets with zero type collisions or orphaned foreign keys.',
    proficiencyLevel: 'Expert Core',
  },
  {
    id: 'eda',
    name: 'Exploratory Data Analysis (EDA)',
    category: 'Analytics Disciplines',
    whatIUseItFor: 'Investigating distributions, bivariate relationships, correlations, and testing business hypotheses.',
    relevantProject: 'Cochain LLC Internship Data Diagnostics',
    exampleDeliverable: 'Hypothesis testing report identifying customer behavior patterns before predictive modeling.',
    proficiencyLevel: 'Expert Core',
  },
  {
    id: 'data-viz',
    name: 'Data Visualization',
    category: 'BI & Visualization',
    whatIUseItFor: 'Designing high-contrast, clutter-free charts with clear visual hierarchy and color intentionality.',
    relevantProject: 'Executive KPI Reporting & Dashboard Storytelling',
    exampleDeliverable: 'Clean bar charts, trend lines, donut breakdowns, and funnel visualizations built for swift decision-making.',
    proficiencyLevel: 'Expert Core',
  },
  {
    id: 'kpi-dashboards',
    name: 'KPI Dashboards',
    category: 'BI & Visualization',
    whatIUseItFor: 'Framing primary business metrics with context (targets, MoM growth, and benchmark deviations).',
    relevantProject: 'All 4 Flagship Portfolio Case Studies',
    exampleDeliverable: 'Compact KPI cards highlighting Actual vs. Target with intuitive status indicators.',
    proficiencyLevel: 'Expert Core',
  },
  {
    id: 'mis-reporting',
    name: 'MIS Reporting',
    category: 'Analytics Disciplines',
    whatIUseItFor: 'Structuring recurring management information systems for senior stakeholders and operational leads.',
    relevantProject: 'CK Infrastructure Ltd Management MIS',
    exampleDeliverable: 'Structured weekly operational reviews comparing fuel efficiency, machine idle hours, and costs.',
    proficiencyLevel: 'Expert Core',
  },
  {
    id: 'business-analytics',
    name: 'Business Analytics',
    category: 'Analytics Disciplines',
    whatIUseItFor: 'Connecting numerical data trends directly to commercial trade-offs, margin gains, and risk mitigation.',
    relevantProject: 'Marketing Campaign ROI & Banking Churn Root-Cause Analysis',
    exampleDeliverable: 'Actionable executive memos recommending specific resource reallocations based on ROI metrics.',
    proficiencyLevel: 'Expert Core',
  },
  {
    id: 'rfm-analysis',
    name: 'RFM Analysis',
    category: 'Analytics Disciplines',
    whatIUseItFor: 'Segmenting customer databases based on Recency, Frequency, and Monetary transaction behavior.',
    relevantProject: 'E-Commerce Customer & Sales Analytics',
    exampleDeliverable: '4-quadrant customer segmentation matrix distinguishing Champions from At-Risk and Hibernating accounts.',
    proficiencyLevel: 'Advanced Daily',
  },
  {
    id: 'churn-analysis',
    name: 'Churn Analysis',
    category: 'Analytics Disciplines',
    whatIUseItFor: 'Diagnosing reasons for customer attrition, identifying high-hazard demographics, and recommending interventions.',
    relevantProject: 'Banking Customer Churn & Retention Analysis',
    exampleDeliverable: 'Cohort churn breakdown revealing product threshold tipping points where churn probability surges.',
    proficiencyLevel: 'Advanced Daily',
  },
  {
    id: 'funnel-analysis',
    name: 'Funnel Analysis',
    category: 'Analytics Disciplines',
    whatIUseItFor: 'Mapping drop-off percentages across multi-step acquisition, registration, or purchase pathways.',
    relevantProject: 'Marketing Campaign & Customer Conversion Analytics',
    exampleDeliverable: 'Interactive 4-stage conversion funnel tracking drop-offs from ad impressions down to closed revenue.',
    proficiencyLevel: 'Advanced Daily',
  },
];

export const TIMELINE: ExperienceItem[] = [
  {
    year: '2026',
    period: 'Aug 2026 – Present',
    role: 'Maintenance Data Analyst',
    company: 'CK Infrastructure Ltd',
    location: 'New Delhi, India',
    responsibilities: [
      'Designed Excel Pivot Table dashboards and interactive charts for fleet and heavy machinery operations.',
      'Conducted monthly diesel consumption variance analysis across regional infrastructure projects.',
      'Validated meter readings and operational logs against delivery challans to ensure data integrity.',
      'Analyzed equipment wear-and-tear and fuel consumption patterns to identify operational anomalies.',
      'Structured standardized maintenance record archives to eliminate data discrepancies.',
      'Delivered recurring MIS decks directly to senior management for operational cost control.',
    ],
    technologies: ['Microsoft Excel', 'Advanced Pivot Tables', 'MIS Reporting', 'Data Validation', 'Cost Tracking'],
  },
  {
    year: '2025',
    period: 'May 2025 – Aug 2025',
    role: 'Data Analyst Intern',
    company: 'Cochain LLC',
    location: 'Remote',
    responsibilities: [
      'Executed Python exploratory data analysis (EDA) across structured enterprise datasets using pandas and NumPy.',
      'Cleaned tabular data by handling missing values, imputing skewness, and filtering anomalous outliers.',
      'Performed feature engineering and variable transformation to enhance analytical signal.',
      'Evaluated machine learning classification models using Accuracy, Precision, Recall, and F1-score benchmarks.',
      'Translated model findings and performance trade-offs into actionable commercial business recommendations.',
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'EDA', 'Model Evaluation (Precision/Recall/F1)'],
  },
  {
    year: '2024',
    period: 'Jan 2024 – Feb 2024',
    role: 'Software Developer Intern',
    company: 'CDAC Patna',
    location: 'Patna, India',
    responsibilities: [
      'Designed normalized relational SQL database schemas (3NF) for transactional applications.',
      'Wrote and optimized complex SQL queries involving multi-table joins, subqueries, and indexing.',
      'Developed RESTful APIs and connected backend service layers with SQL database storage.',
      'Enforced data integrity constraints and handled schema migrations efficiently.',
    ],
    technologies: ['SQL', 'Relational Database Design', 'REST APIs', 'Data Normalization'],
  },
];

// Interactive Journey: "From Raw Data to Business Insight"
export const DATA_JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Raw Data',
    subtitle: 'Messy, Unstructured Inputs',
    description: 'Real-world data is fragmented across CSVs, disparate Excel files, manual logbooks, and ERP exports filled with nulls and format discrepancies.',
    sampleData: `order_id,cust_id,tx_date,amount,item,status
TXN-881,C_912,"2026-03-01",1420.50,"Tech",COMPLETED
TXN-882,C_402,"01/03/2026",NULL,"Office",refunded
TXN-883,C_119,"2026-03-02",-85.00,"Furniture",cancelled
TXN-884,C_912,"2026/03/03",2100.00,"tech",COMPLETED`,
    status: 'Dirty & Inconsistent',
  },
  {
    step: '02',
    title: 'Data Cleaning',
    subtitle: 'Validation & Standardization',
    description: 'Imputing missing values, removing duplicate records, harmonizing datetime stamps, standardizing text encodings, and casting correct numeric types.',
    sampleData: `✓ Normalized all dates to ISO 8601 (YYYY-MM-DD)
✓ Stripped negative transaction anomalies ($ -85.00)
✓ Handled NULL amounts with category median ($ 145.00)
✓ Standardized item categories to UPPERCASE
✓ 0 orphan customer IDs detected across 14,200 rows`,
    status: 'Hygiene Enforced',
  },
  {
    step: '03',
    title: 'SQL Analysis',
    subtitle: 'Relational Aggregation & Window Logic',
    description: 'Writing structured queries with CTEs and Window Functions to compute customer lifetime metrics, cohort retention, and margin variances.',
    sampleData: `WITH customer_rfm AS (
  SELECT cust_id,
    DATEDIFF('2026-03-31', MAX(tx_date)) AS recency,
    COUNT(order_id) AS frequency,
    SUM(amount) AS monetary
  FROM cleaned_transactions
  GROUP BY cust_id
)
SELECT cust_id, NTILE(4) OVER(ORDER BY monetary DESC) as m_tier;`,
    status: 'Aggregated & Segmented',
  },
  {
    step: '04',
    title: 'Python EDA',
    subtitle: 'Statistical Profiling & Diagnostics',
    description: 'Using Pandas and NumPy to inspect distributions, interquartile ranges, correlation matrices, and multivariate risk indicators.',
    sampleData: `df.groupby('category')['profit_margin'].describe()
>>> mean_margin: Tech (24.2%), Furniture (11.8%)
>>> return_rate_corr: -0.68 with net operating profit
>>> Outlier detection: 14 high-return items isolated`,
    status: 'Hypotheses Validated',
  },
  {
    step: '05',
    title: 'Power BI Dashboard',
    subtitle: 'Interactive Visual Architecture',
    description: 'Building connected star-schema models with dynamic DAX calculations, intuitive slicers, and clear visual hierarchy for executive teams.',
    sampleData: `[Measures Built in DAX]:
Total Revenue = SUM(Transactions[Amount])
YoY Sales Growth = DIVIDE([Total Revenue] - [Sales LY], [Sales LY])
Return Drag % = DIVIDE([Returned Amount], [Total Revenue], 0)`,
    status: 'Interactive & Filterable',
  },
  {
    step: '06',
    title: 'Business Insight',
    subtitle: 'Translating Numbers to Meaning',
    description: 'Uncovering the exact operational root causes behind the numbers: where revenue is generated, where margin is leaking, and which cohorts are at risk.',
    sampleData: `★ Insight A: 18% of customers (Champions) account for 44% of total profit.
★ Insight B: South Region Furniture has a 16.4% return rate due to freight transit damages.
★ Insight C: Customers with <2 banking products churn at 3.1x the rate of multi-product holders.`,
    status: 'Clarity Achieved',
  },
  {
    step: '07',
    title: 'Business Decision',
    subtitle: 'Informing High-ROI Action',
    description: 'Providing leadership with data-grounded strategic recommendations that eliminate waste, protect margins, and optimize resource allocation.',
    sampleData: `✔ Action 1: Introduce VIP retention perks for the top 18% Champions cohort.
✔ Action 2: Audit packaging standards for South Region carrier to eliminate $38K return drag.
✔ Action 3: Trigger automated onboarding check-ins for single-product bank accounts.`,
    status: 'Executive Impact',
  },
];

// Realistic Synthetic Datasets for Live Demonstration
// Explicitly labeled: "Synthetic dataset created for portfolio demonstration."

export const ECOMMERCE_DATA: ECommerceRecord[] = [
  { orderId: 'ORD-101', date: '2026-01-05', customerSegment: 'Champions', region: 'North', category: 'Technology', revenue: 1250, cost: 780, profit: 470, quantity: 2, isReturned: false },
  { orderId: 'ORD-102', date: '2026-01-08', customerSegment: 'Loyal', region: 'North', category: 'Office Supplies', revenue: 420, cost: 230, profit: 190, quantity: 5, isReturned: false },
  { orderId: 'ORD-103', date: '2026-01-12', customerSegment: 'At-Risk', region: 'South', category: 'Furniture', revenue: 890, cost: 720, profit: 170, quantity: 1, isReturned: true },
  { orderId: 'ORD-104', date: '2026-01-15', customerSegment: 'Champions', region: 'West', category: 'Technology', revenue: 2100, cost: 1350, profit: 750, quantity: 3, isReturned: false },
  { orderId: 'ORD-105', date: '2026-01-20', customerSegment: 'Hibernating', region: 'East', category: 'Industrial', revenue: 650, cost: 490, profit: 160, quantity: 2, isReturned: false },
  { orderId: 'ORD-106', date: '2026-01-25', customerSegment: 'Loyal', region: 'South', category: 'Technology', revenue: 1450, cost: 950, profit: 500, quantity: 2, isReturned: false },
  { orderId: 'ORD-107', date: '2026-02-02', customerSegment: 'Champions', region: 'East', category: 'Office Supplies', revenue: 580, cost: 310, profit: 270, quantity: 8, isReturned: false },
  { orderId: 'ORD-108', date: '2026-02-06', customerSegment: 'At-Risk', region: 'West', category: 'Furniture', revenue: 1100, cost: 920, profit: 180, quantity: 2, isReturned: false },
  { orderId: 'ORD-109', date: '2026-02-10', customerSegment: 'Loyal', region: 'North', category: 'Technology', revenue: 1750, cost: 1120, profit: 630, quantity: 3, isReturned: false },
  { orderId: 'ORD-110', date: '2026-02-14', customerSegment: 'Hibernating', region: 'South', category: 'Office Supplies', revenue: 310, cost: 240, profit: 70, quantity: 3, isReturned: true },
  { orderId: 'ORD-111', date: '2026-02-18', customerSegment: 'Champions', region: 'North', category: 'Industrial', revenue: 2400, cost: 1550, profit: 850, quantity: 4, isReturned: false },
  { orderId: 'ORD-112', date: '2026-02-22', customerSegment: 'Loyal', region: 'East', category: 'Furniture', revenue: 950, cost: 760, profit: 190, quantity: 1, isReturned: false },
  { orderId: 'ORD-113', date: '2026-02-27', customerSegment: 'At-Risk', region: 'North', category: 'Technology', revenue: 1300, cost: 890, profit: 410, quantity: 2, isReturned: false },
  { orderId: 'ORD-114', date: '2026-03-03', customerSegment: 'Champions', region: 'West', category: 'Office Supplies', revenue: 640, cost: 350, profit: 290, quantity: 6, isReturned: false },
  { orderId: 'ORD-115', date: '2026-03-07', customerSegment: 'Loyal', region: 'South', category: 'Industrial', revenue: 1850, cost: 1250, profit: 600, quantity: 3, isReturned: false },
  { orderId: 'ORD-116', date: '2026-03-11', customerSegment: 'Hibernating', region: 'West', category: 'Technology', revenue: 980, cost: 720, profit: 260, quantity: 1, isReturned: true },
  { orderId: 'ORD-117', date: '2026-03-15', customerSegment: 'Champions', region: 'South', category: 'Technology', revenue: 2600, cost: 1680, profit: 920, quantity: 4, isReturned: false },
  { orderId: 'ORD-118', date: '2026-03-19', customerSegment: 'At-Risk', region: 'East', category: 'Office Supplies', revenue: 490, cost: 320, profit: 170, quantity: 4, isReturned: false },
  { orderId: 'ORD-119', date: '2026-03-23', customerSegment: 'Loyal', region: 'North', category: 'Furniture', revenue: 1280, cost: 1020, profit: 260, quantity: 2, isReturned: false },
  { orderId: 'ORD-120', date: '2026-03-27', customerSegment: 'Champions', region: 'East', category: 'Industrial', revenue: 3100, cost: 2050, profit: 1050, quantity: 5, isReturned: false },
  { orderId: 'ORD-121', date: '2026-03-29', customerSegment: 'Loyal', region: 'West', category: 'Technology', revenue: 1550, cost: 980, profit: 570, quantity: 2, isReturned: false },
  { orderId: 'ORD-122', date: '2026-03-30', customerSegment: 'At-Risk', region: 'South', category: 'Furniture', revenue: 820, cost: 690, profit: 130, quantity: 1, isReturned: true },
];

export const CHURN_DATA: ChurnRecord[] = [
  { id: 'C-1001', age: 34, geography: 'France', gender: 'Female', tenureYears: 4, balance: 85000, numProducts: 2, hasCreditCard: true, isActiveMember: true, estimatedSalary: 72000, churned: false, riskCategory: 'Low' },
  { id: 'C-1002', age: 52, geography: 'Germany', gender: 'Male', tenureYears: 2, balance: 142000, numProducts: 1, hasCreditCard: true, isActiveMember: false, estimatedSalary: 95000, churned: true, riskCategory: 'High' },
  { id: 'C-1003', age: 48, geography: 'Spain', gender: 'Female', tenureYears: 6, balance: 98000, numProducts: 1, hasCreditCard: false, isActiveMember: false, estimatedSalary: 64000, churned: true, riskCategory: 'High' },
  { id: 'C-1004', age: 29, geography: 'France', gender: 'Male', tenureYears: 3, balance: 45000, numProducts: 2, hasCreditCard: true, isActiveMember: true, estimatedSalary: 51000, churned: false, riskCategory: 'Low' },
  { id: 'C-1005', age: 56, geography: 'Germany', gender: 'Female', tenureYears: 1, balance: 165000, numProducts: 1, hasCreditCard: true, isActiveMember: false, estimatedSalary: 110000, churned: true, riskCategory: 'High' },
  { id: 'C-1006', age: 41, geography: 'France', gender: 'Male', tenureYears: 5, balance: 112000, numProducts: 2, hasCreditCard: true, isActiveMember: true, estimatedSalary: 83000, churned: false, riskCategory: 'Low' },
  { id: 'C-1007', age: 38, geography: 'Spain', gender: 'Male', tenureYears: 7, balance: 76000, numProducts: 2, hasCreditCard: true, isActiveMember: true, estimatedSalary: 59000, churned: false, riskCategory: 'Low' },
  { id: 'C-1008', age: 49, geography: 'Germany', gender: 'Female', tenureYears: 3, balance: 128000, numProducts: 3, hasCreditCard: false, isActiveMember: false, estimatedSalary: 88000, churned: true, riskCategory: 'High' },
  { id: 'C-1009', age: 31, geography: 'France', gender: 'Female', tenureYears: 2, balance: 62000, numProducts: 2, hasCreditCard: true, isActiveMember: true, estimatedSalary: 67000, churned: false, riskCategory: 'Low' },
  { id: 'C-1010', age: 45, geography: 'Spain', gender: 'Male', tenureYears: 4, balance: 91000, numProducts: 1, hasCreditCard: true, isActiveMember: false, estimatedSalary: 74000, churned: true, riskCategory: 'Medium' },
  { id: 'C-1011', age: 60, geography: 'Germany', gender: 'Male', tenureYears: 8, balance: 154000, numProducts: 1, hasCreditCard: true, isActiveMember: false, estimatedSalary: 92000, churned: true, riskCategory: 'High' },
  { id: 'C-1012', age: 27, geography: 'France', gender: 'Female', tenureYears: 1, balance: 38000, numProducts: 2, hasCreditCard: false, isActiveMember: true, estimatedSalary: 45000, churned: false, riskCategory: 'Low' },
  { id: 'C-1013', age: 43, geography: 'France', gender: 'Male', tenureYears: 5, balance: 104000, numProducts: 2, hasCreditCard: true, isActiveMember: true, estimatedSalary: 81000, churned: false, riskCategory: 'Low' },
  { id: 'C-1014', age: 50, geography: 'Germany', gender: 'Female', tenureYears: 2, balance: 139000, numProducts: 1, hasCreditCard: true, isActiveMember: false, estimatedSalary: 102000, churned: true, riskCategory: 'High' },
  { id: 'C-1015', age: 36, geography: 'Spain', gender: 'Female', tenureYears: 6, balance: 84000, numProducts: 2, hasCreditCard: true, isActiveMember: true, estimatedSalary: 63000, churned: false, riskCategory: 'Low' },
];

export const SUPPLY_CHAIN_DATA: SupplyChainRecord[] = [
  { shipmentId: 'SHP-501', date: '2026-02-01', warehouse: 'Hub North', region: 'North', carrier: 'Freight Express', shippingMode: 'Surface', transitDays: 3, promisedDays: 3, isDelayed: false, isCancelled: false, transportCost: 145, cargoWeightKg: 420 },
  { shipmentId: 'SHP-502', date: '2026-02-03', warehouse: 'Hub East', region: 'East', carrier: 'SwiftLine Air', shippingMode: 'Air', transitDays: 2, promisedDays: 1, isDelayed: true, isCancelled: false, transportCost: 310, cargoWeightKg: 180 },
  { shipmentId: 'SHP-503', date: '2026-02-05', warehouse: 'Hub South', region: 'South', carrier: 'Standard Cargo', shippingMode: 'Rail', transitDays: 5, promisedDays: 5, isDelayed: false, isCancelled: false, transportCost: 95, cargoWeightKg: 850 },
  { shipmentId: 'SHP-504', date: '2026-02-08', warehouse: 'Hub West', region: 'West', carrier: 'Freight Express', shippingMode: 'Surface', transitDays: 4, promisedDays: 4, isDelayed: false, isCancelled: false, transportCost: 180, cargoWeightKg: 510 },
  { shipmentId: 'SHP-505', date: '2026-02-11', warehouse: 'Hub East', region: 'East', carrier: 'Standard Cargo', shippingMode: 'Surface', transitDays: 6, promisedDays: 4, isDelayed: true, isCancelled: false, transportCost: 160, cargoWeightKg: 640 },
  { shipmentId: 'SHP-506', date: '2026-02-14', warehouse: 'Hub North', region: 'North', carrier: 'SwiftLine Air', shippingMode: 'Air', transitDays: 1, promisedDays: 1, isDelayed: false, isCancelled: false, transportCost: 280, cargoWeightKg: 150 },
  { shipmentId: 'SHP-507', date: '2026-02-17', warehouse: 'Hub South', region: 'South', carrier: 'Freight Express', shippingMode: 'Surface', transitDays: 4, promisedDays: 3, isDelayed: true, isCancelled: false, transportCost: 210, cargoWeightKg: 490 },
  { shipmentId: 'SHP-508', date: '2026-02-20', warehouse: 'Hub West', region: 'West', carrier: 'Standard Cargo', shippingMode: 'Rail', transitDays: 5, promisedDays: 5, isDelayed: false, isCancelled: false, transportCost: 110, cargoWeightKg: 920 },
  { shipmentId: 'SHP-509', date: '2026-02-23', warehouse: 'Hub East', region: 'East', carrier: 'SwiftLine Air', shippingMode: 'Air', transitDays: 3, promisedDays: 1, isDelayed: true, isCancelled: false, transportCost: 340, cargoWeightKg: 210 },
  { shipmentId: 'SHP-510', date: '2026-02-26', warehouse: 'Hub North', region: 'North', carrier: 'Freight Express', shippingMode: 'Surface', transitDays: 3, promisedDays: 3, isDelayed: false, isCancelled: false, transportCost: 150, cargoWeightKg: 440 },
  { shipmentId: 'SHP-511', date: '2026-03-01', warehouse: 'Hub South', region: 'South', carrier: 'Standard Cargo', shippingMode: 'Surface', transitDays: 4, promisedDays: 4, isDelayed: false, isCancelled: false, transportCost: 135, cargoWeightKg: 380 },
  { shipmentId: 'SHP-512', date: '2026-03-04', warehouse: 'Hub West', region: 'West', carrier: 'SwiftLine Air', shippingMode: 'Air', transitDays: 1, promisedDays: 1, isDelayed: false, isCancelled: false, transportCost: 295, cargoWeightKg: 160 },
  { shipmentId: 'SHP-513', date: '2026-03-08', warehouse: 'Hub East', region: 'East', carrier: 'Freight Express', shippingMode: 'Surface', transitDays: 5, promisedDays: 4, isDelayed: true, isCancelled: false, transportCost: 190, cargoWeightKg: 520 },
  { shipmentId: 'SHP-514', date: '2026-03-12', warehouse: 'Hub North', region: 'North', carrier: 'Standard Cargo', shippingMode: 'Rail', transitDays: 6, promisedDays: 6, isDelayed: false, isCancelled: false, transportCost: 105, cargoWeightKg: 890 },
  { shipmentId: 'SHP-515', date: '2026-03-15', warehouse: 'Hub South', region: 'South', carrier: 'SwiftLine Air', shippingMode: 'Air', transitDays: 2, promisedDays: 1, isDelayed: true, isCancelled: false, transportCost: 325, cargoWeightKg: 190 },
];

export const MARKETING_CAMPAIGNS: MarketingCampaignRecord[] = [
  { campaignName: 'Q1 Enterprise Search', channel: 'Google Search', spend: 42000, impressions: 840000, clicks: 37800, leads: 2268, conversions: 544, revenue: 218000 },
  { campaignName: 'B2B LinkedIn C-Suite', channel: 'LinkedIn Ads', spend: 38000, impressions: 410000, clicks: 12300, leads: 1353, conversions: 311, revenue: 168000 },
  { campaignName: 'Retargeting High-Intent', channel: 'Meta Ads', spend: 28000, impressions: 920000, clicks: 32200, leads: 1610, conversions: 386, revenue: 124000 },
  { campaignName: 'Drip Email Reactivation', channel: 'Email Retargeting', spend: 9500, impressions: 160000, clicks: 17600, leads: 1408, conversions: 422, revenue: 98000 },
  { campaignName: 'Partner Co-Marketing', channel: 'Organic Referral', spend: 14000, impressions: 220000, clicks: 15400, leads: 1232, conversions: 345, revenue: 112000 },
];

// 3D Data Lab Sample Points (RFM Spatial Clusters)
export const LAB_3D_DATA: DataPoint3D[] = [
  // Champions (High Freq, High Money, Low Recency days)
  { id: 'DP-01', customerId: 'CUST-8821', recencyDays: 4, frequencyOrders: 18, monetarySpend: 8400, segment: 'Champions', coordinates: [1.8, 2.2, -1.8], color: '#10b981' },
  { id: 'DP-02', customerId: 'CUST-8842', recencyDays: 8, frequencyOrders: 16, monetarySpend: 7900, segment: 'Champions', coordinates: [1.6, 2.0, -1.5], color: '#10b981' },
  { id: 'DP-03', customerId: 'CUST-8869', recencyDays: 12, frequencyOrders: 14, monetarySpend: 7200, segment: 'Champions', coordinates: [1.4, 1.8, -1.2], color: '#10b981' },
  { id: 'DP-04', customerId: 'CUST-8891', recencyDays: 6, frequencyOrders: 20, monetarySpend: 9600, segment: 'Champions', coordinates: [2.0, 2.5, -2.0], color: '#10b981' },
  // Loyal (Good Freq, Mid Money, Good Recency)
  { id: 'DP-05', customerId: 'CUST-7210', recencyDays: 18, frequencyOrders: 9, monetarySpend: 4300, segment: 'Loyal', coordinates: [0.9, 1.0, -0.8], color: '#06b6d4' },
  { id: 'DP-06', customerId: 'CUST-7235', recencyDays: 22, frequencyOrders: 10, monetarySpend: 4800, segment: 'Loyal', coordinates: [1.0, 1.2, -0.6], color: '#06b6d4' },
  { id: 'DP-07', customerId: 'CUST-7258', recencyDays: 15, frequencyOrders: 8, monetarySpend: 3900, segment: 'Loyal', coordinates: [0.8, 0.9, -0.9], color: '#06b6d4' },
  { id: 'DP-08', customerId: 'CUST-7289', recencyDays: 25, frequencyOrders: 11, monetarySpend: 5200, segment: 'Loyal', coordinates: [1.1, 1.3, -0.5], color: '#06b6d4' },
  // Potential Loyalists (Moderate Recency, Growing Freq)
  { id: 'DP-09', customerId: 'CUST-5512', recencyDays: 32, frequencyOrders: 5, monetarySpend: 2400, segment: 'Potential Loyalists', coordinates: [0.5, 0.4, 0.2], color: '#3b82f6' },
  { id: 'DP-10', customerId: 'CUST-5534', recencyDays: 28, frequencyOrders: 6, monetarySpend: 2800, segment: 'Potential Loyalists', coordinates: [0.6, 0.5, 0.0], color: '#3b82f6' },
  { id: 'DP-11', customerId: 'CUST-5561', recencyDays: 35, frequencyOrders: 4, monetarySpend: 1950, segment: 'Potential Loyalists', coordinates: [0.4, 0.3, 0.3], color: '#3b82f6' },
  // At Risk (High past spend, high recency days)
  { id: 'DP-12', customerId: 'CUST-3310', recencyDays: 78, frequencyOrders: 7, monetarySpend: 4600, segment: 'At Risk', coordinates: [-0.6, 1.1, 1.4], color: '#f59e0b' },
  { id: 'DP-13', customerId: 'CUST-3329', recencyDays: 85, frequencyOrders: 8, monetarySpend: 5100, segment: 'At Risk', coordinates: [-0.8, 1.2, 1.6], color: '#f59e0b' },
  { id: 'DP-14', customerId: 'CUST-3345', recencyDays: 92, frequencyOrders: 6, monetarySpend: 3800, segment: 'At Risk', coordinates: [-0.9, 0.9, 1.8], color: '#f59e0b' },
  // Hibernating (Low Freq, Low Money, Very High Recency)
  { id: 'DP-15', customerId: 'CUST-1102', recencyDays: 140, frequencyOrders: 1, monetarySpend: 450, segment: 'Hibernating', coordinates: [-1.8, -1.2, 2.2], color: '#ef4444' },
  { id: 'DP-16', customerId: 'CUST-1124', recencyDays: 165, frequencyOrders: 2, monetarySpend: 620, segment: 'Hibernating', coordinates: [-2.0, -1.0, 2.4], color: '#ef4444' },
  { id: 'DP-17', customerId: 'CUST-1150', recencyDays: 180, frequencyOrders: 1, monetarySpend: 310, segment: 'Hibernating', coordinates: [-2.2, -1.4, 2.6], color: '#ef4444' },
  { id: 'DP-18', customerId: 'CUST-1178', recencyDays: 155, frequencyOrders: 2, monetarySpend: 780, segment: 'Hibernating', coordinates: [-1.9, -0.9, 2.3], color: '#ef4444' },
];

export const TYPICAL_OUTCOMES = [
  {
    outcome: 'Manual Reporting Elimination',
    title: 'Manual Reporting Elimination',
    metric: '90% Hours Saved',
    description: 'Automating multi-tab spreadsheet consolidations into scheduled Power BI dashboards.',
    context: 'Automating multi-tab spreadsheet consolidations into scheduled Power BI dashboards.',
    deliverable: 'Automated ETL + KPI Dashboard',
  },
  {
    outcome: 'Margin Drag Identification',
    title: 'Margin Drag Identification',
    metric: 'Root-Cause Discovery',
    description: 'Pinpointing which specific product categories or shipping modes suffer high return/delay costs.',
    context: 'Pinpointing which specific product categories or shipping modes suffer high return/delay costs.',
    deliverable: 'SQL Variance & Profitability Diagnostics',
  },
  {
    outcome: 'Executive Metric Standardization',
    title: 'Executive Metric Standardization',
    metric: 'Single Source of Truth',
    description: 'Aligning department silos on verified DAX KPI measures and audit-ready data models.',
    context: 'Aligning department silos on verified DAX KPI measures and audit-ready data models.',
    deliverable: 'Dimensional Data Model & MIS Decks',
  },
  {
    outcome: 'Operational Fleet & Fuel Validation',
    title: 'Operational Fleet & Fuel Validation',
    metric: 'Discrepancy Resolution',
    description: 'Auditing high-frequency field consumption data against physical meter entries to prevent leakage.',
    context: 'Auditing high-frequency field consumption data against physical meter entries to prevent leakage.',
    deliverable: 'Structured Excel MIS & Exception Alerts',
  },
];

// Helper Aliases & Collections
export const CAPABILITY_OUTCOMES = TYPICAL_OUTCOMES;

export const CLIENT_PAIN_POINTS = [
  'My Excel reports take hours to prepare every week.',
  'I have business data but don’t know what it actually means.',
  'I need a Power BI dashboard for executive leadership.',
  'My business KPIs are difficult to track across department silos.',
  'I have messy CSV/Excel files with duplicates and inconsistencies.',
  'I need recurring, error-free MIS reporting pipelines.',
];

export const HOW_I_CAN_HELP = [
  { step: '01', title: 'Clean your data' },
  { step: '02', title: 'Analyze it' },
  { step: '03', title: 'Build dashboards' },
  { step: '04', title: 'Identify KPIs' },
  { step: '05', title: 'Automate recurring reports' },
  { step: '06', title: 'Present actionable insights' },
];

export const EXPERIENCE = TIMELINE.map((t, idx) => ({
  id: `exp-${idx}`,
  role: t.role,
  company: t.company,
  period: t.period,
  location: t.location,
  type: t.year === '2026' ? 'Current Full-Time' : 'Internship & Research',
  bullets: t.responsibilities,
  skills: t.technologies,
}));

export const SKILLS_DATA = SKILLS.map((s) => ({
  ...s,
  deliverable: s.exampleDeliverable,
}));

export const CERTIFICATIONS = PROFILE.certifications.map((c, idx) => ({
  name: c.title,
  issuer: c.issuer,
  date: idx === 0 ? 'Nov 2025' : idx === 1 ? 'Aug 2025' : 'Jun 2024',
  skills: c.focus,
}));

export const EDUCATION = {
  degree: PROFILE.education.degree,
  institution: PROFILE.education.institution,
  location: PROFILE.education.location,
  period: 'May 2026',
  details: 'Specialization in Relational Database Management Systems (RDBMS), Data Structures, Algorithms, and Software Engineering.',
};

export const RFM_POINT_CLUSTERS = LAB_3D_DATA.map((d) => ({
  id: d.customerId,
  x: d.coordinates[0] * 2,
  y: d.coordinates[1] * 2,
  z: d.coordinates[2] * 2,
  segment: d.segment,
  recencyDays: d.recencyDays,
  frequency: d.frequencyOrders,
  monetary: d.monetarySpend,
  score: d.segment === 'Champions' ? 'R4-F4-M4' : d.segment === 'Loyal' ? 'R3-F3-M3' : d.segment === 'Potential Loyalists' ? 'R3-F2-M2' : d.segment === 'At Risk' ? 'R1-F3-M3' : 'R1-F1-M1',
}));
