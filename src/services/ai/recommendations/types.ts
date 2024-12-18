export type DeviceType = 'infusion-pump' | 'patient-monitor' | 'ventilator' | 'diagnostic-device';
export type RecommendationCategory = 'usability' | 'safety' | 'regulatory';
export type RecommendationType = 'interface' | 'workflow' | 'documentation' | 'training';
export type RecommendationPriority = 'high' | 'medium' | 'low';

export interface DeviceRecommendation {
  type: RecommendationType;
  rules: {
    condition: string;
    recommendation: string;
    priority: RecommendationPriority;
    standard: string;
  }[];
}

export interface CustomRule {
  id: string;
  category: RecommendationCategory;
  condition: (text: string, context: any) => boolean;
  recommendation: {
    text: string;
    priority: RecommendationPriority;
    standard: string;
    confidence: number;
  };
}

export interface AnalysisContext {
  deviceType?: DeviceType;
  userType?: string;
  useEnvironment?: string;
  region?: string;
  riskLevel?: string;
  previousFindings?: string[];
}

export interface Recommendation {
  text: string;
  priority: RecommendationPriority;
  standard?: string;
  confidence: number;
  context?: string[];
}