import OpenAI from 'openai';
import { AnalysisContext, AnalysisResult } from './types';
import { MEDICAL_DEVICE_STANDARDS } from './standards';
import { ApiError } from '../errors/ApiError';

export class OpenAIService {
  private openai: OpenAI;
  
  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new ApiError('OpenAI API key is not configured');
    }

    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async analyzeText(text: string, context: AnalysisContext): Promise<AnalysisResult> {
    try {
      const prompt = this.constructPrompt(text, context);
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: this.getSystemPrompt()
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new ApiError('No response received from OpenAI');
      }

      return {
        ...this.parseResponse(content),
        timestamp: Date.now()
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle OpenAI API specific errors
      if (error instanceof OpenAI.APIError) {
        if (error.status === 401) {
          throw new ApiError('Invalid API key. Please check your OpenAI API key.');
        }
        if (error.status === 429) {
          throw new ApiError('Rate limit exceeded. Please try again later.');
        }
      }

      console.error('OpenAI analysis error:', error);
      throw new ApiError('Failed to analyze text. Please try again later.');
    }
  }

  private getSystemPrompt(): string {
    return `You are an expert medical device usability engineer with deep knowledge of:
      - IEC 62366-1:2015 Medical Device Usability Engineering
      - AAMI HE75:2009 Human Factors Engineering
      - FDA Human Factors Guidelines
      - ISO 14971:2019 Risk Management
      - Medical device regulatory requirements
      
      Analyze the provided text and context to provide expert usability engineering recommendations.
      Focus on safety, efficiency, and regulatory compliance.
      
      Format your response as:
      Recommendation: [Your detailed recommendation]
      Priority: [high|medium|low]
      Category: [usability|safety|regulatory|general]
      Standards: [Relevant standards, comma-separated]`;
  }

  private parseResponse(content: string): Omit<AnalysisResult, 'timestamp'> {
    const sections = content.split('\n').reduce((acc, line) => {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key && value) {
        acc[key.toLowerCase()] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    if (!sections.recommendation) {
      throw new ApiError('Invalid response format from OpenAI');
    }

    const priority = this.validatePriority(sections.priority);
    const category = this.validateCategory(sections.category);
    const standards = this.parseStandards(sections.standards);

    return {
      recommendation: sections.recommendation,
      priority,
      category,
      standards,
      confidence: 0.9
    };
  }

  private validatePriority(priority?: string): AnalysisResult['priority'] {
    const validPriorities = ['high', 'medium', 'low'] as const;
    return validPriorities.includes(priority?.toLowerCase() as any) 
      ? priority?.toLowerCase() as AnalysisResult['priority']
      : 'medium';
  }

  private validateCategory(category?: string): AnalysisResult['category'] {
    const validCategories = ['usability', 'safety', 'regulatory', 'general'] as const;
    return validCategories.includes(category?.toLowerCase() as any)
      ? category?.toLowerCase() as AnalysisResult['category']
      : 'general';
  }

  private parseStandards(standards?: string): string[] {
    if (!standards) return [];
    
    return standards
      .split(',')
      .map(s => s.trim())
      .filter(s => 
        MEDICAL_DEVICE_STANDARDS.USABILITY.includes(s) ||
        MEDICAL_DEVICE_STANDARDS.SAFETY.includes(s) ||
        MEDICAL_DEVICE_STANDARDS.REGULATORY.includes(s)
      );
  }

  private constructPrompt(text: string, context: AnalysisContext): string {
    return `
      Text to analyze: "${text}"
      
      Context:
      - Device Type: ${context.deviceType}
      - Environment: ${context.useEnvironment}
      - User Type: ${context.userType}
      - Risk Level: ${context.riskLevel}
      - Task Complexity: ${context.taskComplexity}
      - Time Constraints: ${context.timeConstraints}
      - User Diversity: ${context.userDiversity}
      - Training Level: ${context.trainingLevel}
      - Safety Level: ${context.safetyLevel}
      - Regulatory Region: ${context.regulatoryRegion}
      
      Provide expert usability engineering analysis and recommendations based on the text and context.
      Include priority (high/medium/low), category (usability/safety/regulatory/general), and relevant standards.
      Focus on user safety, efficiency, and regulatory compliance.
    `;
  }
}

export const openAIService = new OpenAIService();