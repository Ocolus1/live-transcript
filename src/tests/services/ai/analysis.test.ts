import { describe, it, expect, vi } from 'vitest';
import { aiAnalysisService } from '../../../services/ai/analysis';
import { openAIService } from '../../../services/ai/openai';

vi.mock('../../../services/ai/openai');

describe('AIAnalysisService', () => {
  it('should analyze text with context', async () => {
    const mockAnalysis = {
      recommendation: 'Test recommendation',
      priority: 'high',
      category: 'usability',
      confidence: 0.9,
      standards: ['IEC 62366-1:2015']
    };

    vi.mocked(openAIService.analyzeText).mockResolvedValue(mockAnalysis);

    const text = 'Test input';
    const context = {
      deviceType: 'infusion-pump',
      useEnvironment: 'clinical',
      userType: 'nurse',
      riskLevel: 'high'
    };

    const result = await aiAnalysisService.analyzeText(text, context);

    expect(result).toEqual({
      ...mockAnalysis,
      timestamp: expect.any(Number)
    });
    expect(openAIService.analyzeText).toHaveBeenCalledWith(text, context);
  });

  it('should handle analysis errors', async () => {
    vi.mocked(openAIService.analyzeText).mockRejectedValue(new Error('Analysis failed'));

    await expect(aiAnalysisService.analyzeText('test')).rejects.toThrow('Failed to analyze text');
  });
});