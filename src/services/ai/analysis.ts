import { AnalysisResult, AnalysisContext } from './types';
import { openAIService } from './openai';
import { ApiError } from '../errors/ApiError';

const DEFAULT_CONTEXT: AnalysisContext = {
  deviceType: 'general',
  useEnvironment: 'clinical',
  userType: 'healthcare-professional',
  riskLevel: 'medium',
  taskComplexity: 'moderate',
  timeConstraints: 'normal',
  userDiversity: 'moderate',
  trainingLevel: 'basic',
  safetyLevel: 'medium',
  regulatoryRegion: 'global'
};

export class AIAnalysisService {
  async analyzeText(text: string, context?: AnalysisContext): Promise<AnalysisResult> {
    if (!text.trim()) {
      throw new ApiError('Text input is required');
    }

    try {
      const mergedContext = {
        ...DEFAULT_CONTEXT,
        ...context
      };

      const analysis = await openAIService.analyzeText(text, mergedContext);

      return {
        ...analysis,
        timestamp: Date.now()
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      console.error('Analysis error:', error);
      throw new ApiError(
        'Failed to analyze text. Please check your API key and try again.'
      );
    }
  }
}

export const aiAnalysisService = new AIAnalysisService();