import { RecommendationCategory, RecommendationType } from './types';
import { usabilityRecommendations } from './usability';
import { safetyRecommendations } from './safety';
import { regulatoryRecommendations } from './regulatory';

export function getRecommendations(
  category: RecommendationCategory,
  type: RecommendationType
): string[] {
  switch (category) {
    case 'usability':
      return usabilityRecommendations[type] || [];
    case 'safety':
      return safetyRecommendations[type] || [];
    case 'regulatory':
      return regulatoryRecommendations[type] || [];
    default:
      return [];
  }
}