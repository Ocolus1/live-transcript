import { describe, it, expect } from 'vitest';
import { useStore } from '../../store';

describe('Store', () => {
  it('should initialize with default state', () => {
    const state = useStore.getState();
    
    expect(state.isRecording).toBe(false);
    expect(state.transcripts).toEqual([]);
    expect(state.analyses).toEqual([]);
    expect(state.images).toEqual([]);
    expect(state.error).toBeNull();
  });

  it('should update recording state', () => {
    const { setIsRecording } = useStore.getState();
    
    setIsRecording(true);
    expect(useStore.getState().isRecording).toBe(true);
  });

  it('should add transcript', () => {
    const { addTranscript } = useStore.getState();
    
    addTranscript('test', true);
    expect(useStore.getState().transcripts).toHaveLength(1);
  });
});