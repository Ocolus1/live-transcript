import { RecommendationCategory, RecommendationType, Recommendation, RecommendationContext } from './types';
import { usabilityRecommendations } from './usability';
import { safetyRecommendations } from './safety';
import { regulatoryRecommendations } from './regulatory';
import { MEDICAL_DEVICE_STANDARDS } from '../standards';

export class RecommendationEngine {
  getRecommendations(
    category: RecommendationCategory,
    type: RecommendationType,
    context?: RecommendationContext
  ): Recommendation[] {
    const baseRecommendations = this.getBaseRecommendations(category, type);
    const prioritizedRecommendations = this.prioritizeRecommendations(
      baseRecommendations,
      context
    );
    
    return this.filterAndEnhanceRecommendations(
      prioritizedRecommendations,
      context
    );
  }

  private getBaseRecommendations(
    category: RecommendationCategory,
    type: RecommendationType
  ): string[] {
    switch (category) {
      case 'usability':
        return usabilityRecommendations[type];
      case 'safety':
        return safetyRecommendations[type];
      case 'regulatory':
        return regulatoryRecommendations[type];
      default:
        return [];
    }
  }

  private prioritizeRecommendations(
    recommendations: string[],
    context?: RecommendationContext
  ): Recommendation[] {
    return recommendations.map(text => {
      const priority = this.calculatePriority(text, context);
      const standard = this.findRelevantStandard(text);
      const confidence = this.calculateConfidence(text, context);

      return {
        text,
        standard,
        priority,
        confidence,
        context: this.extractContextTags(text)
      };
    });
  }

  private calculatePriority(
    text: string,
    context?: RecommendationContext
  ): Recommendation['priority'] {
    const highRiskTerms = ['critical', 'emergency', 'safety', 'hazard'];
    const mediumRiskTerms = ['important', 'should', 'recommended'];

    if (
      context?.riskLevel === 'high' ||
      highRiskTerms.some(term => text.toLowerCase().includes(term))
    ) {
      return 'high';
    }

    if (
      context?.riskLevel === 'medium' ||
      mediumRiskTerms.some(term => text.toLowerCase().includes(term))
    ) {
      return 'medium';
    }

    return 'low';
  }

  private findRelevantStandard(text: string): string | undefined {
    const allStandards = [
      ...MEDICAL_DEVICE_STANDARDS.USABILITY,
      ...MEDICAL_DEVICE_STANDARDS.SAFETY,
      ...MEDICAL_DEVICE_STANDARDS.REGULATORY
    ];

    return allStandards.find(standard => 
      text.includes(standard) || this.isStandardRelevant(standard, text)
    );
  }

  private isStandardRelevant(standard: string, text: string): boolean {
    const standardKeywords = {
      'IEC 62366-1': ['usability', 'user interface', 'use error'],
      'AAMI HE75': ['human factors', 'ergonomic', 'design'],
      'IEC 60601-1-6': ['usability engineering', 'medical electrical'],
      'ISO 14971': ['risk management', 'safety', 'hazard'],
      'MDR 2017/745': ['regulatory', 'compliance', 'requirements'],
      '21 CFR Part 820': ['quality system', 'design controls']
    };

    const standardBase = Object.keys(standardKeywords).find(key => 
      standard.includes(key)
    );

    if (!standardBase) return false;

    return standardKeywords[standardBase].some(keyword =>
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private calculateConfidence(
    text: string,
    context?: RecommendationContext
  ): number {
    let confidence = 0.7; // Base confidence

    // Increase confidence based on context matches
    if (context) {
      if (context.deviceType && text.toLowerCase().includes(context.deviceType.toLowerCase())) {
        confidence += 0.1;
      }
      if (context.userType && text.toLowerCase().includes(context.userType.toLowerCase())) {
        confidence += 0.1;
      }
      if (context.environment && text.toLowerCase().includes(context.environment.toLowerCase())) {
        confidence += 0.1;
      }
    }

    // Adjust based on specificity of recommendation
    if (this.findRelevantStandard(text)) {
      confidence += 0.1;
    }

    return Math.min(confidence, 1);
  }

  private extractContextTags(text: string): string[] {
    const contextTags: string[] = [];
    const contexts = {
      environment: ['clinical', 'home', 'emergency', 'hospital'],
      userType: ['physician', 'nurse', 'patient', 'caregiver'],
      deviceType: ['monitor', 'diagnostic', 'therapeutic', 'surgical']
    };

    Object.values(contexts).forEach(contextSet => {
      contextSet.forEach(tag => {
        if (text.toLowerCase().includes(tag.toLowerCase())) {
          contextTags.push(tag);
        }
      });
    });

    return contextTags;
  }

  private filterAndEnhanceRecommendations(
    recommendations: Recommendation[],
    context?: RecommendationContext
  ): Recommendation[] {
    // Filter out less relevant recommendations
    let filtered = recommendations.filter(rec => 
      rec.confidence >= 0.6 &&
      (!context?.previousFindings?.includes(rec.text))
    );

    // Sort by priority and confidence
    filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.confidence - a.confidence;
    });

    // Limit to top recommendations
    return filtered.slice(0, 5);
  }
}

export const recommendationEngine = new RecommendationEngine();