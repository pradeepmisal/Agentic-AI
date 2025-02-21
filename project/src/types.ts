export interface BusinessPlan {
  description: string;
  businessType: string;
  targetMarket: string;
  services: string[];
  role: string;
  differentiator: string;
}

export interface UserState {
  currentStep: number;
  businessPlan: BusinessPlan;
  setStep: (step: number) => void;
  updateBusinessPlan: (data: Partial<BusinessPlan>) => void;
}

export interface BusinessCanvas {
  problem: string[];
  solution: string[];
  uniqueValue: string[];
  unfairAdvantage: string[];
  keyMetrics: string[];
  costStructure: string[];
  nameSuggestions: string[];
  revenueStreams: string[];
}

export interface MarketShareData {
  segment: string;
  percentage: number;
}

export interface CompetitiveAnalysis {
  metric: string;
  value: number;
}