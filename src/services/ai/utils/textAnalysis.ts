import { AnalysisContext } from '../types';

const MEDICAL_TERMS = [
  'interface', 'user', 'safety', 'risk', 'warning', 'alert',
  'display', 'control', 'error', 'feedback', 'workflow',
  'procedure', 'documentation', 'training', 'hazard',
  'emergency', 'compliance', 'standard', 'regulation'
];

export function extractKeyTerms(text: string): string[] {
  const words = text.toLowerCase().split(/\W+/);
  return MEDICAL_TERMS.filter(term => words.includes(term));
}

export function analyzeTextComplexity(text: string): number {
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).length;
  return words / sentences;
}

export function assessRiskLevel(text: string, context?: AnalysisContext): 'high' | 'medium' | 'low' {
  const complexityScore = analyzeTextComplexity(text);
  const keyTerms = extractKeyTerms(text);
  
  const highRiskTerms = ['emergency', 'critical', 'severe', 'hazard', 'danger'];
  const mediumRiskTerms = ['warning', 'caution', 'attention', 'important'];
  
  if (
    context?.riskLevel === 'high' ||
    complexityScore > 20 ||
    keyTerms.some(term => highRiskTerms.includes(term))
  ) {
    return 'high';
  }
  
  if (
    context?.riskLevel === 'medium' ||
    complexityScore > 15 ||
    keyTerms.some(term => mediumRiskTerms.includes(term))
  ) {
    return 'medium';
  }
  
  return 'low';
}