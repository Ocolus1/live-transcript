import { describe, it, expect, vi } from 'vitest';
import { textAnalysisService } from '../../../services/ai/textAnalysis';

describe('TextAnalysisService', () => {
  it('should analyze text and return valid results', async () => {
    const text = 'The interface is difficult to use in emergency situations';
    const context = {
      deviceType: 'infusion-pump',
      useEnvironment: 'emergency',
      userType: 'nurse',
      riskLevel: 'high'
    };

    const result = await textAnalysisService.analyzeText(text, context);

    expect(result).toHaveProperty('keyTopics');
    expect(result).toHaveProperty('usabilityIssues');
    expect(result).toHaveProperty('recommendations');
    expect(result.confidence).toBeGreaterThan(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
  });

  it('should identify usability issues correctly', async () => {
    const text = 'The workflow is confusing and unclear';
    const result = await textAnalysisService.analyzeText(text);

    expect(result.usabilityIssues).toContainEqual(
      expect.objectContaining({
        category: 'workflow',
        severity: expect.any(String)
      })
    );
  });

  it('should handle empty text input', async () => {
    const text = '';
    const result = await textAnalysisService.analyzeText(text);

    expect(result.confidence).toBeLessThan(0.5);
    expect(result.recommendations).toHaveLength(0);
  });
});