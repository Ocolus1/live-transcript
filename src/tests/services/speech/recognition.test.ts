import { describe, it, expect, vi } from 'vitest';
import { speechRecognitionService } from '../../../services/speech/recognition';
import { useStore } from '../../../store';

vi.mock('../../../store');

describe('SpeechRecognitionService', () => {
  it('should initialize speech recognition', async () => {
    await expect(speechRecognitionService.initialize()).resolves.not.toThrow();
  });

  it('should handle recognition start', async () => {
    const mockAddTranscript = vi.fn();
    vi.mocked(useStore.getState).mockReturnValue({ addTranscript: mockAddTranscript });

    await speechRecognitionService.initialize();
    await speechRecognitionService.startRecognition();

    // Simulate recognition event
    const recognizer = (speechRecognitionService as any).recognizer;
    recognizer.recognized({}, { result: { text: 'test', reason: 1 } });

    expect(mockAddTranscript).toHaveBeenCalledWith('test', true);
  });

  it('should handle recognition stop', async () => {
    await speechRecognitionService.initialize();
    await expect(speechRecognitionService.stopRecognition()).resolves.not.toThrow();
  });
});