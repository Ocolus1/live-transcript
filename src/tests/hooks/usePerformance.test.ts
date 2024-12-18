import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePerformance } from '../../hooks/usePerformance';

describe('usePerformance', () => {
  it('should provide debounced analysis function', () => {
    const { result } = renderHook(() => usePerformance());
    expect(result.current.analysisDebounced).toBeDefined();
  });

  it('should provide throttled transcription function', () => {
    const { result } = renderHook(() => usePerformance());
    expect(result.current.transcriptionThrottled).toBeDefined();
  });

  it('should provide image optimization function', () => {
    const { result } = renderHook(() => usePerformance());
    expect(result.current.optimizeImage).toBeDefined();
  });
});