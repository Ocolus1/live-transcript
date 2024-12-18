import { describe, it, expect, vi } from 'vitest';
import { OpenAIService } from '../../../services/ai/openai';
import OpenAI from 'openai';

vi.mock('openai');

describe('OpenAIService', () => {
  const mockContext = {
    deviceType: 'qiasymphony',
    useEnvironment: 'clinical-lab',
    userType: 'lab-technician',
    riskLevel: 'medium'
  };

  it('should analyze text using OpenAI', async () => {
    const mockResponse = {
      choices: [{
        message: {
          content: JSON.stringify({
            recommendation: 'Test recommendation',
            priority: 'high',
            category: 'usability',
            standards: ['IEC 62366-1:2015'],
            confidence: 0.9
          })
        }
      }]
    };

    vi.mocked(OpenAI.prototype.chat.completions.create).mockResolvedValue(mockResponse);

    const service = new OpenAIService();
    const result = await service.analyzeText('Test input', mockContext);

    expect(result).toEqual(expect.objectContaining({
      recommendation: 'Test recommendation',
      priority: 'high',
      category: 'usability',
      standards: ['IEC 62366-1:2015'],
      confidence: 0.9,
      timestamp: expect.any(Number)
    }));
  });

  it('should handle OpenAI errors', async () => {
    vi.mocked(OpenAI.prototype.chat.completions.create).mockRejectedValue(new Error('API error'));

    const service = new OpenAIService();
    await expect(service.analyzeText('Test input', mockContext))
      .rejects.toThrow('Failed to analyze text');
  });
});