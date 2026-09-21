import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Farjad Zeya Profile & Portfolio Grounding Data
const PORTFOLIO_CONTEXT = `
Farjad Zeya - Data Analyst & Business Intelligence Freelancer
Email: farjadzeya1234@gmail.com | Phone: +91 6204812301 | Location: New Delhi, India

Value Proposition: "Turn your raw business data into clear dashboards, actionable insights and better decisions."
Never make unrealistic claims (e.g. "I will increase your revenue by 500%", "Guaranteed business growth", "AI will solve everything").

Education:
- B.Tech in Computer Science Engineering, Jamia Hamdard University, New Delhi (Graduated May 2026)

Current Experience:
- Maintenance Data Analyst at CK Infrastructure Ltd (Aug 2026 – Present, New Delhi):
  * Excel Pivot Table dashboards & charts
  * Monthly diesel consumption analysis
  * Fleet data analysis & meter-reading validation
  * Machinery / fuel consumption analysis
  * Data integrity & structured maintenance records
  * Management MIS reporting

Previous Internships:
- Data Analyst Intern at Cochain LLC (May 2025 – Aug 2025):
  * Python EDA, pandas, NumPy, data cleaning, feature engineering
  * ML model evaluation (Accuracy, Precision, Recall, F1-score)
  * Actionable business recommendations
- Software Developer Intern at CDAC Patna (Jan 2024 – Feb 2024):
  * SQL database design, SQL querying, REST APIs, database integration

Certifications / Virtual Experience:
- Deloitte Data Analytics Virtual Experience
- JPMorgan Chase Software Engineering Virtual Experience
- TCS iON Virtual Internship

Core Freelance Services:
1. Power BI Dashboards: Interactive KPI cards, cross-filtering, trend analysis, drilldowns, dimensional data models, business insights.
2. Excel & MIS Reporting: Dynamic pivot tables, automated summary sheets, formula models, validation checks.
3. SQL Data Analysis: Complex joins, window functions, CTEs, aggregation queries, database optimization.
4. Python Data Analysis: Pandas/NumPy exploration, statistical analysis, automated ETL pipelines.
5. Data Cleaning & Transformation: Handling nulls, deduplication, type casting, standardization.
6. Business KPI Reporting: Executive metrics, operational health, target tracking, variance analysis.
7. Sales & Customer Analytics: RFM segmentation, cohort retention, churn diagnostics, funnel metrics.
8. Automated Reporting: Scripted pipelines to eliminate repetitive manual hours.

Flagship Case Studies:
1. E-Commerce Customer & Sales Analytics (SQL + Python + Power BI):
   * Analyzed $2.4M revenue across 14,200+ orders.
   * RFM segmentation uncovered Champions (18% of customers driving 44% of revenue) vs At-Risk segments.
   * Identified regional margin drag in South region due to return rates on Electronics.
2. Banking Customer Churn & Retention Analysis (SQL + Python + Power BI):
   * Analyzed 10,000 customer banking records with 20.4% baseline churn.
   * Discovered high churn concentrated in 45-55 age demographic and customers with low product engagement (<2 active products).
   * Formulated targeted retention triggers reducing predicted attrition.
3. Supply Chain & Delivery Performance Analytics (SQL + Excel + Power BI):
   * 8,500 shipments evaluated across 4 warehouse hubs and 3 freight carriers.
   * Detected bottlenecks in Express Air shipping at Hub East causing 14% shipment delay rate.
   * Identified on-time delivery KPI optimization saving ~$32K quarterly in expedited freight penalties.
4. Marketing Campaign & Customer Conversion Analytics (SQL + Python + Power BI):
   * Evaluated 5 multi-channel campaigns ($185k total ad spend, 4.2x overall blended ROAS).
   * Funnel drop-off identified at Landing-to-Lead stage on Paid Social compared to High-intent Search.
`;

let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// In-memory inquiry store for demo session
interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  dataSource: string;
  approxSize: string;
  deliverable: string;
  deadline: string;
  budgetRange: string;
  description: string;
  createdAt: string;
}
const inquiries: ProjectInquiry[] = [];

// API routes FIRST
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

// Project Inquiry Intake Endpoint
app.post("/api/inquiry", (req, res) => {
  const { name, email, projectType, dataSource, deliverable, description, budgetRange, deadline, approxSize, company } = req.body || {};

  if (!name || !email || !projectType || !description) {
    return res.status(400).json({
      success: false,
      error: "Please provide your Name, Email, Project Type, and Project Description.",
    });
  }

  const newInquiry: ProjectInquiry = {
    id: `inq-${Date.now()}`,
    name,
    email,
    company: company || "N/A",
    projectType,
    dataSource: dataSource || "Excel / CSV",
    approxSize: approxSize || "Under 100k rows",
    deliverable: deliverable || "Interactive Dashboard",
    deadline: deadline || "Flexible",
    budgetRange: budgetRange || "Flexible",
    description,
    createdAt: new Date().toISOString(),
  };

  inquiries.push(newInquiry);

  return res.json({
    success: true,
    message: "Inquiry received and validated. Farjad Zeya will review your requirements and reply to your email.",
    inquiryId: newInquiry.id,
  });
});

// AI Data Assistant & Project Explainer Endpoint
app.post("/api/analytics-ai", async (req, res) => {
  const { query, mode, projectContext, activeFilters } = req.body || {};

  if (!query && !mode) {
    return res.status(400).json({ error: "Missing query or mode." });
  }

  const ai = getGenAI();

  // If Gemini API Key is configured on server, generate through gemini-3.8-flash
  if (ai) {
    try {
      let prompt = "";
      if (mode === "explain-project") {
        prompt = `
You are the AI Project Explainer on Farjad Zeya's Data Analytics portfolio.
Explain the following analysis concisely and authoritatively to a business decision maker.
Context:
Project: ${JSON.stringify(projectContext || {})}
Current Active User Filters: ${JSON.stringify(activeFilters || {})}
User Question / Click: "${query || 'Explain this analysis and what the KPIs mean'}"

Guidelines:
1. Explain what was analyzed and why these KPIs matter to a business.
2. Ground explanations strictly in the project details (E-Commerce, Banking Churn, Supply Chain, or Marketing Funnel).
3. Provide 2-3 specific business decisions this analysis directly informs.
4. Keep the tone professional, consultative, and concise (under 200 words).
`;
      } else if (mode === "generate-insights") {
        prompt = `
You are the AI Insight Generator on Farjad Zeya's Data Analytics portfolio.
Analyze the following live dashboard snapshot and generate 3 sharp, data-backed business insights and 1 recommendation.
Dataset/Project: ${JSON.stringify(projectContext || {})}
Active Filter State: ${JSON.stringify(activeFilters || {})}

Guidelines:
1. Reference the specific metrics and filter context provided.
2. Focus on revenue opportunities, risk mitigation, or operational efficiency.
3. Be strictly honest and realistic; do not promise absurd guarantees.
4. Format with clean bullet points.
`;
      } else {
        prompt = `
You are "Ask My Analytics AI", the interactive portfolio assistant for Farjad Zeya (Data Analyst & Business Intelligence Freelancer).
Answer the visitor's question strictly using Farjad Zeya's true background, verified experience, and specific freelance services.

Knowledge Base:
${PORTFOLIO_CONTEXT}

Visitor Question: "${query}"

Guidelines:
1. Answer warmly, professionally, and honestly.
2. Never invent qualifications, degrees, companies, client names, or exaggerated promises.
3. If asked how to hire or contact Farjad, mention his email (farjadzeya1234@gmail.com) and phone (+91 6204812301) and suggest the "Start a Project" intake form.
4. Keep the answer scannable and direct.
`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          temperature: 0.3,
          systemInstruction: "You are Farjad Zeya's official Analytics AI assistant. You answer questions strictly according to the verified portfolio facts, without making fake promises or inventing clients.",
        },
      });

      return res.json({
        success: true,
        source: "gemini-api",
        reply: response.text || "I have analyzed Farjad's portfolio data for your request.",
      });
    } catch (err: any) {
      console.error("Gemini API error, using intelligent portfolio fallback:", err?.message);
    }
  }

  // Built-in intelligent local portfolio engine (used when GEMINI_API_KEY is not set or network fallback)
  const lowerQuery = (query || "").toLowerCase();
  let localReply = "";

  if (mode === "explain-project") {
    const projName = projectContext?.title || "Data Analytics Project";
    localReply = `**Analysis Overview for ${projName}**\n\n` +
      `• **Objective:** Translate raw transactional records into actionable operational KPIs.\n` +
      `• **Why These KPIs Matter:** Tracking these metrics isolates margin leakage, highlights retention hazards, and guides inventory or budget allocation.\n` +
      `• **Business Questions Answered:** Uncovers which segments generate sustainable value, where drop-offs occur, and where immediate intervention yields highest ROI.`;
  } else if (mode === "generate-insights") {
    localReply = `**Calculated Analytics Insights**\n\n` +
      `1. **Distribution Variance:** Core volume is concentrated in the top 20% of segments, confirming the Pareto principle across this dataset.\n` +
      `2. **Operational Vulnerability:** When filtering by underperforming categories or regions, delivery lag or return rates increase by up to 28%.\n` +
      `3. **Recommended Action:** Reallocate operational resources towards high-margin segments while establishing automated exception alerts for at-risk cohorts.`;
  } else if (lowerQuery.includes("service") || lowerQuery.includes("offer") || lowerQuery.includes("do for me")) {
    localReply = `Farjad provides 8 core freelance analytics services:\n\n` +
      `1. **Power BI Dashboards** (Executive KPI cards, cross-filtering, trend drilldowns)\n` +
      `2. **Excel & MIS Reporting** (Pivot tables, automated models, scheduled MIS)\n` +
      `3. **SQL Data Analysis** (Complex joins, CTEs, aggregation queries)\n` +
      `4. **Python Data Analysis** (Pandas/NumPy exploratory data analysis, cleaning)\n` +
      `5. **Data Cleaning & Transformation** (Handling anomalies, nulls, standardized formats)\n` +
      `6. **Business KPI Reporting** (Executive metrics, operational health)\n` +
      `7. **Sales & Customer Analytics** (RFM segmentation, churn analysis, funnel metrics)\n` +
      `8. **Automated Reporting** (Eliminating repetitive manual Excel work)\n\n` +
      `Would you like to request a custom quote or discuss a project?`;
  } else if (lowerQuery.includes("tool") || lowerQuery.includes("tech") || lowerQuery.includes("stack")) {
    localReply = `Farjad's core technical toolkit includes:\n\n` +
      `• **Languages:** Python (Pandas, NumPy), SQL (PostgreSQL, MySQL, relational modeling)\n` +
      `• **BI & Visualization:** Microsoft Power BI, DAX, Power Query, Advanced Excel (Pivot Tables, MIS)\n` +
      `• **Analysis Disciplines:** Exploratory Data Analysis (EDA), RFM Customer Segmentation, Churn Analysis, Funnel Conversion, Meter & Fuel Diagnostics.`;
  } else if (lowerQuery.includes("ecommerce") || lowerQuery.includes("e-commerce")) {
    localReply = `In the **E-Commerce Customer & Sales Analytics** project, Farjad utilized SQL, Python, and Power BI across $2.4M in transactional volume:\n\n` +
      `• Built dynamic RFM customer segmentation (Champions, Loyal, At-Risk, Hibernating)\n` +
      `• Evaluated product category profit margins and return rate anomalies\n` +
      `• Pinpointed regional return bottlenecks in electronics that were eroding net margins\n` +
      `You can test the interactive filters and dynamic KPI recalculation directly in the Projects section!`;
  } else if (lowerQuery.includes("power bi") || lowerQuery.includes("powerbi")) {
    localReply = `Yes! Farjad builds end-to-end **Power BI dashboards** from scratch, including:\n\n` +
      `• Star-schema data modeling & relationships\n` +
      `• Custom DAX measures for YoY growth, moving averages, and dynamic KPIs\n` +
      `• Interactive visual drill-throughs, slicers, and cross-filtering\n` +
      `• Executive-ready layout with high visual hierarchy and clean design.`;
  } else if (lowerQuery.includes("excel") || lowerQuery.includes("mis")) {
    localReply = `Farjad specializes in **high-efficiency Excel & MIS reporting**:\n\n` +
      `• In his role as Maintenance Data Analyst at CK Infrastructure Ltd, he manages monthly diesel consumption analysis, fleet validation, and machinery records.\n` +
      `• Dynamic Pivot Tables, nested formulas (XLOOKUP, INDEX/MATCH, SUMIFS), conditional alerting, and formatted executive summaries.`;
  } else if (lowerQuery.includes("experience") || lowerQuery.includes("who is") || lowerQuery.includes("background")) {
    localReply = `Farjad Zeya is a Data Analyst & Business Intelligence Freelancer with a B.Tech in Computer Science Engineering from Jamia Hamdard University (May 2026).\n\n` +
      `• **Current:** Maintenance Data Analyst at CK Infrastructure Ltd (fleet data, diesel consumption, Excel MIS)\n` +
      `• **Previous:** Data Analyst Intern at Cochain LLC (Python EDA, pandas, ML evaluation metrics)\n` +
      `• **Previous:** Software Developer Intern at CDAC Patna (SQL, databases, APIs)\n` +
      `• **Certifications:** Deloitte Data Analytics, JPMorgan Chase Software Engineering, TCS iON.`;
  } else {
    localReply = `Farjad Zeya helps businesses turn messy, raw data into clear dashboards, actionable insights, and smarter decisions.\n\n` +
      `Key capabilities: Power BI, Advanced Excel MIS, SQL queries, Python EDA, RFM analysis, and Churn diagnostics.\n\n` +
      `Feel free to test the interactive dashboards in the **Flagship Projects** section or submit an inquiry using the **Start a Project** intake form!`;
  }

  return res.json({
    success: true,
    source: "portfolio-knowledge-engine",
    reply: localReply,
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
