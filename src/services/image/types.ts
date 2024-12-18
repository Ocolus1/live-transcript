export interface UploadedImage {
  id: string;
  url: string;
  name: string;
  timestamp: number;
  analysis?: ImageAnalysis;
}

export interface ImageAnalysis {
  elements: UIElement[];
  compliance: ComplianceIssue[];
  confidence: number;
}

export interface UIElement {
  type: 'button' | 'display' | 'text' | 'control' | 'indicator';
  location: string;
  description: string;
  usabilityScore: number;
}

export interface ComplianceIssue {
  element: string;
  standard: string;
  recommendation: string;
  severity: 'high' | 'medium' | 'low';
}