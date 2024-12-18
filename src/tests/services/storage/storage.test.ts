import { describe, it, expect, beforeEach } from 'vitest';
import { storageService } from '../../../services/storage';

describe('StorageService', () => {
  beforeEach(async () => {
    await storageService.clearAll();
  });

  it('should save and retrieve analysis', async () => {
    const analysis = {
      id: '1',
      text: 'Test analysis',
      timestamp: Date.now()
    };

    const key = await storageService.saveAnalysis(analysis);
    const analyses = await storageService.getAnalyses();

    expect(analyses).toHaveLength(1);
    expect(analyses[0]).toEqual(analysis);
  });

  it('should save and retrieve transcripts', async () => {
    const transcript = {
      id: '1',
      text: 'Test transcript',
      timestamp: Date.now()
    };

    const key = await storageService.saveTranscript(transcript);
    const transcripts = await storageService.getTranscripts();

    expect(transcripts).toHaveLength(1);
    expect(transcripts[0]).toEqual(transcript);
  });

  it('should clear all data', async () => {
    await storageService.saveAnalysis({ id: '1', text: 'test' });
    await storageService.saveTranscript({ id: '1', text: 'test' });

    await storageService.clearAll();

    const analyses = await storageService.getAnalyses();
    const transcripts = await storageService.getTranscripts();

    expect(analyses).toHaveLength(0);
    expect(transcripts).toHaveLength(0);
  });
});