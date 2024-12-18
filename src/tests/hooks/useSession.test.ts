import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSession } from '../../hooks/useSession';
import { sessionManager } from '../../services/data/sessionManager';

vi.mock('../../services/data/sessionManager');

describe('useSession', () => {
  it('should initialize session', () => {
    const { result } = renderHook(() => useSession());

    expect(result.current.startNewSession).toBeDefined();
    expect(result.current.endCurrentSession).toBeDefined();
    expect(result.current.addTranscript).toBeDefined();
    expect(result.current.addAnalysis).toBeDefined();
  });

  it('should cleanup session on unmount', () => {
    const { unmount } = renderHook(() => useSession());

    unmount();
    expect(sessionManager.endSession).toHaveBeenCalled();
  });
});