import { CustomRule, RecommendationCategory } from '../types';

export const customRules: CustomRule[] = [
  {
    id: 'emergency-override',
    category: 'safety',
    condition: (text: string, context: any) => {
      return text.toLowerCase().includes('emergency') && 
             context?.useEnvironment === 'emergency';
    },
    recommendation: {
      text: 'Implement clearly visible emergency override mechanism with single-action activation',
      priority: 'high',
      standard: 'IEC 60601-1',
      confidence: 0.95
    }
  },
  {
    id: 'multilingual-support',
    category: 'usability',
    condition: (text: string, context: any) => {
      return context?.region === 'international' || 
             text.toLowerCase().includes('language');
    },
    recommendation: {
      text: 'Provide multilingual interface with standardized medical terminology',
      priority: 'medium',
      standard: 'IEC 62366-1:2015',
      confidence: 0.85
    }
  }
];

export function applyCustomRules(
  text: string,
  context: any,
  category: RecommendationCategory
): CustomRule[] {
  return customRules.filter(rule => 
    rule.category === category && 
    rule.condition(text, context)
  );
}