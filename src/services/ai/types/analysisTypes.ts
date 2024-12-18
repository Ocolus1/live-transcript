export interface AnalysisContext {
  deviceType: string;
  useEnvironment: string;
  userType: string;
  riskLevel: string;
  workflow?: string;
  specialization?: string;
  experience?: string;
  trainingLevel?: string;
  taskComplexity?: string;
  timeConstraints?: string;
  userDiversity?: string;
  safetyLevel?: string;
  regulatoryRegion?: string;
}

export interface AnalysisResult {
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  category: 'usability' | 'safety' | 'regulatory' | 'general';
  standards?: string[];
  confidence: number;
  timestamp?: number;
}