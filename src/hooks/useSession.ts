import { useEffect } from 'react';
import { useStore } from '../store';
import { sessionManager } from '../services/data/sessionManager';
import { cacheService } from '../services/performance/cache';

export function useSession() {
  const { setError } = useStore();

  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Try to restore last session from cache
        const lastSession = await cacheService.get('lastSession');
        if (lastSession) {
          // Implement session restoration logic
        }
      } catch (error) {
        setError('Failed to initialize session');
        console.error('Session initialization error:', error);
      }
    };

    initializeSession();

    return () => {
      // Cleanup session on unmount
      sessionManager.endSession().catch(console.error);
    };
  }, [setError]);

  return {
    startNewSession: sessionManager.startSession.bind(sessionManager),
    endCurrentSession: sessionManager.endSession.bind(sessionManager),
    addTranscript: sessionManager.addTranscript.bind(sessionManager),
    addAnalysis: sessionManager.addAnalysis.bind(sessionManager)
  };
}