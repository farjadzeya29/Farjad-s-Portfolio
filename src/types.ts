export interface ProjectInquiryForm {
  name: string;
  email: string;
  company: string;
  projectType: string;
  dataSource: string;
  approxSize: string;
  deliverable: string;
  deadline: string;
  budgetRange: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  deliverables: string[];
  exampleUseCase: string;
  iconName: string;
  tag: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Languages & Querying' | 'BI & Visualization' | 'Libraries & Cleaning' | 'Analytics Disciplines';
  whatIUseItFor: string;
  relevantProject: string;
  exampleDeliverable: string;
  proficiencyLevel: 'Expert Core' | 'Advanced Daily' | 'Production Competency';
}

export interface ExperienceItem {
  year: string;
  period: string;
  role: string;
  company: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ECommerceRecord {
  orderId: string;
  date: string;
  customerSegment: 'Champions' | 'Loyal' | 'At-Risk' | 'Hibernating';
  region: 'North' | 'South' | 'East' | 'West';
  category: 'Technology' | 'Office Supplies' | 'Furniture' | 'Industrial';
  revenue: number;
  cost: number;
  profit: number;
  quantity: number;
  isReturned: boolean;
}

export interface ChurnRecord {
  id: string;
  age: number;
  geography: 'France' | 'Germany' | 'Spain';
  gender: 'Male' | 'Female';
  tenureYears: number;
  balance: number;
  numProducts: number;
  hasCreditCard: boolean;
  isActiveMember: boolean;
  estimatedSalary: number;
  churned: boolean;
  riskCategory: 'High' | 'Medium' | 'Low';
}

export interface SupplyChainRecord {
  shipmentId: string;
  date: string;
  warehouse: 'Hub North' | 'Hub South' | 'Hub East' | 'Hub West';
  region: 'North' | 'South' | 'East' | 'West';
  carrier: 'Freight Express' | 'Standard Cargo' | 'SwiftLine Air';
  shippingMode: 'Air' | 'Surface' | 'Rail';
  transitDays: number;
  promisedDays: number;
  isDelayed: boolean;
  isCancelled: boolean;
  transportCost: number;
  cargoWeightKg: number;
}

export interface MarketingCampaignRecord {
  campaignName: string;
  channel: 'Google Search' | 'LinkedIn Ads' | 'Meta Ads' | 'Email Retargeting' | 'Organic Referral';
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
  revenue: number;
}

export interface DataPoint3D {
  id: string;
  customerId: string;
  recencyDays: number;
  frequencyOrders: number;
  monetarySpend: number;
  segment: 'Champions' | 'Loyal' | 'Potential Loyalists' | 'At Risk' | 'Hibernating';
  coordinates: [number, number, number];
  color: string;
}

export interface RfmPoint {
  id: string;
  x: number;
  y: number;
  z: number;
  segment: 'Champions' | 'Loyal' | 'Potential Loyalists' | 'At Risk' | 'Hibernating';
  recencyDays: number;
  frequency: number;
  monetary: number;
  score: string;
}
