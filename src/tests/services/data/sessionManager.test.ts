import { describe, it, expect, vi } from 'vitest';
import { sessionManager } from '../../../services/data/sessionManager';
import { get, set } from 'idb-keyval';

vi.mock('idb-keyval');

describe('SessionManager', () => {
  const mockContext = {
    deviceType: 'qiasymphony',
    useEnvironment: 'clinical-lab'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should start new session', () => {
    const session = sessionManager.startSession(mockContext);

    expect(session).toEqual(expect.objectContaining({
      id: expect.any(String),
      startTime: expect.any(Number),
      transcripts: [],
      analyses: [],
      context: mockContext
    }));
  });

  it('should save session on end', async () => {
    const session = sessionManager.startSession(mockContext);
    await sessionManager.endSession();

    expect(set).toHaveBeenCalledWith(
      expect.stringContaining(session.id),
      expect.objectContaining({
        ...session,
        endTime: expect.any(Number)
      })
    );
  });

  it('should add transcript to current session', async () => {
    const session = sessionManager.startSession(mockContext);
    const transcript = {
      id: '1',
      text: 'Test transcript',
      timestamp: Date.now(),
      isFinal: true
    };

    await sessionManager.addTranscript(transcript);

    expect(set).toHaveBeenCalledWith(
      expect.stringContaining(session.id),
      expect.objectContaining({
        transcripts: [transcript]
      })
    );
  });
});