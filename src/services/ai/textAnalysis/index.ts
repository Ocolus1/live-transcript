import { AnalysisContext } from '../types';
import { deviceTypeRules } from '../recommendations/deviceTypes';
import { environmentRules } from '../context/environmentRules';
import { MEDICAL_DEVICE_STANDARDS } from '../standards';

export class TextAnalysisService {
  async analyzeText(text: string, context?: AnalysisContext) {
    const analysis = {
      keyTopics: this.extractKeyTopics(text),
      usabilityIssues: this.identifyUsabilityIssues(text),
      safetyConsiderations: this.analyzeSafetyImplications(text),
      regulatoryCompliance: this.checkRegulatoryCompliance(text),
      deviceSpecificInsights: this.getDeviceSpecificInsights(text, context?.deviceType),
      environmentalConsiderations: this.analyzeEnvironmentalFactors(text, context?.useEnvironment),
      confidence: this.calculateConfidence(text, context)
    };

    return {
      ...analysis,
      recommendations: this.generateRecommendations(analysis, context)
    };
  }

  private extractKeyTopics(text: string) {
    const topics = {
      usability: this.matchKeywords(text, [
        'interface', 'workflow', 'user', 'interaction', 'feedback'
      ]),
      safety: this.matchKeywords(text, [
        'risk', 'hazard', 'safety', 'alarm', 'emergency'
      ]),
      technical: this.matchKeywords(text, [
        'calibration', 'maintenance', 'configuration', 'setup'
      ])
    };

    return Object.entries(topics)
      .filter(([_, matches]) => matches.length > 0)
      .map(([category, matches]) => ({
        category,
        terms: matches,
        relevance: matches.length / text.split(' ').length
      }));
  }

  private matchKeywords(text: string, keywords: string[]) {
    const words = text.toLowerCase().split(/\W+/);
    return keywords.filter(keyword => words.includes(keyword));
  }

  private identifyUsabilityIssues(text: string) {
    const usabilityPatterns = {
      workflow: /difficult to|confusing|unclear|hard to|complicated/gi,
      feedback: /no feedback|unclear feedback|confusing feedback/gi,
      consistency: /inconsistent|varies|different from/gi,
      accessibility: /hard to reach|difficult to see|cannot access/gi
    };

    return Object.entries(usabilityPatterns)
      .map(([category, pattern]) => ({
        category,
        matches: text.match(pattern) || [],
        severity: this.calculateSeverity(text, pattern)
      }))
      .filter(issue => issue.matches.length > 0);
  }

  private analyzeSafetyImplications(text: string) {
    const safetyKeywords = {
      critical: ['emergency', 'critical', 'life-threatening', 'severe'],
      warning: ['warning', 'caution', 'alert', 'attention'],
      preventive: ['prevent', 'avoid', 'ensure', 'verify']
    };

    return Object.entries(safetyKeywords)
      .map(([level, keywords]) => ({
        level,
        relevance: keywords.filter(word => 
          text.toLowerCase().includes(word)
        ).length / keywords.length
      }))
      .filter(item => item.relevance > 0);
  }

  private checkRegulatoryCompliance(text: string) {
    return Object.entries(MEDICAL_DEVICE_STANDARDS)
      .map(([category, standards]) => ({
        category,
        relevantStandards: standards.filter(standard =>
          this.isStandardRelevant(text, standard)
        )
      }))
      .filter(item => item.relevantStandards.length > 0);
  }

  private isStandardRelevant(text: string, standard: string) {
    const standardKeywords = {
      'IEC 62366-1': ['usability', 'user interface', 'interaction'],
      'ISO 14971': ['risk', 'safety', 'hazard'],
      'IEC 60601-1-8': ['alarm', 'alert', 'notification'],
      'AAMI HE75': ['human factors', 'ergonomic', 'design']
    };

    const baseStandard = Object.keys(standardKeywords)
      .find(key => standard.includes(key));

    return baseStandard && standardKeywords[baseStandard]
      .some(keyword => text.toLowerCase().includes(keyword));
  }

  private getDeviceSpecificInsights(text: string, deviceType?: string) {
    if (!deviceType || !deviceTypeRules[deviceType]) return null;

    const rules = deviceTypeRules[deviceType];
    return rules.map(category => ({
      type: category.type,
      relevantRules: category.rules.filter(rule =>
        text.toLowerCase().includes(rule.condition)
      )
    })).filter(category => category.relevantRules.length > 0);
  }

  private analyzeEnvironmentalFactors(text: string, environment?: string) {
    if (!environment) return null;

    return environmentRules
      .filter(rule => rule.condition({ useEnvironment: environment }))
      .map(rule => ({
        priority: rule.priority,
        weight: rule.weight,
        recommendations: rule.recommendations.filter(rec =>
          this.isRecommendationRelevant(text, rec)
        )
      }))
      .filter(result => result.recommendations.length > 0);
  }

  private isRecommendationRelevant(text: string, recommendation: string) {
    const keywords = recommendation.toLowerCase()
      .split(' ')
      .filter(word => word.length > 4);
    
    return keywords.some(word => text.toLowerCase().includes(word));
  }

  private calculateConfidence(text: string, context?: AnalysisContext) {
    let confidence = 0.7; // Base confidence

    // Adjust based on text length and quality
    confidence += Math.min(text.split(' ').length / 100, 0.1);
    
    // Adjust based on context completeness
    if (context) {
      if (context.deviceType) confidence += 0.1;
      if (context.useEnvironment) confidence += 0.1;
    }

    return Math.min(confidence, 1);
  }

  private calculateSeverity(text: string, pattern: RegExp) {
    const matches = text.match(pattern) || [];
    const contextWords = text.split(' ').length;
    const frequency = matches.length / contextWords;

    if (frequency > 0.05) return 'high';
    if (frequency > 0.02) return 'medium';
    return 'low';
  }

  private generateRecommendations(analysis: any, context?: AnalysisContext) {
    const recommendations = [];

    // Add usability recommendations
    if (analysis.usabilityIssues?.length > 0) {
      recommendations.push(...this.generateUsabilityRecommendations(
        analysis.usabilityIssues
      ));
    }

    // Add safety recommendations
    if (analysis.safetyConsiderations?.length > 0) {
      recommendations.push(...this.generateSafetyRecommendations(
        analysis.safetyConsiderations
      ));
    }

    // Add device-specific recommendations
    if (analysis.deviceSpecificInsights) {
      recommendations.push(...this.generateDeviceSpecificRecommendations(
        analysis.deviceSpecificInsights
      ));
    }

    // Sort and filter recommendations
    return this.prioritizeRecommendations(recommendations, context);
  }

  private generateUsabilityRecommendations(issues: any[]) {
    return issues.map(issue => ({
      category: 'usability',
      priority: issue.severity,
      recommendation: `Improve ${issue.category} by addressing: ${issue.matches.join(', ')}`,
      confidence: 0.8
    }));
  }

  private generateSafetyRecommendations(considerations: any[]) {
    return considerations.map(consideration => ({
      category: 'safety',
      priority: consideration.level === 'critical' ? 'high' : 'medium',
      recommendation: `Address ${consideration.level} safety concerns with appropriate controls`,
      confidence: consideration.relevance
    }));
  }

  private generateDeviceSpecificRecommendations(insights: any[]) {
    return insights.flatMap(insight =>
      insight.relevantRules.map(rule => ({
        category: insight.type,
        priority: rule.priority,
        recommendation: rule.recommendation,
        standard: rule.standard,
        confidence: 0.9
      }))
    );
  }

  private prioritizeRecommendations(recommendations: any[], context?: AnalysisContext) {
    return recommendations
      .sort((a, b) => {
        const priorityScore = { high: 3, medium: 2, low: 1 };
        return (
          priorityScore[b.priority] - priorityScore[a.priority] ||
          b.confidence - a.confidence
        );
      })
      .slice(0, 5); // Return top 5 recommendations
  }
}

export const textAnalysisService = new TextAnalysisService();