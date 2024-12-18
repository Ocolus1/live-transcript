import { AnalysisContext, RecommendationPriority } from '../types';

export interface ContextRule {
  condition: (context: AnalysisContext) => boolean;
  priority: RecommendationPriority;
  weight: number;
}

export const contextRules: ContextRule[] = [
  {
    condition: (context) => context.useEnvironment === 'emergency',
    priority: 'high',
    weight: 1.5
  },
  {
    condition: (context) => context.userType === 'nurse' && context.useEnvironment === 'icu',
    priority: 'high',
    weight: 1.3
  },
  {
    condition: (context) => context.useEnvironment === 'home',
    priority: 'medium',
    weight: 1.1
  }
];

export function applyContextRules(
  recommendation: string,
  context: AnalysisContext
): number {
  let score = 1.0;
  
  contextRules.forEach(rule => {
    if (rule.condition(context)) {
      score *= rule.weight;
    }
  });
  
  return score;
}