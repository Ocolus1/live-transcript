import { useEffect, useCallback } from 'react';
import { useStore } from '../store';
import { speechRecognitionService } from '../services/speech/recognition';
import { aiAnalysisService } from '../services/ai/analysis';

export function useSpeechRecognition() {
  const { 
    isRecording, 
    setIsRecording, 
    addTranscript, 
    addAnalysis,
    setError,
    context 
  } = useStore();

  const handleTranscription = useCallback(async (text: string, isFinal: boolean) => {
    addTranscript(text, isFinal);
    
    if (isFinal) {
      try {
        const analysis = await aiAnalysisService.analyzeText(text, context);
        addAnalysis(analysis);
      } catch (error) {
        console.error('Analysis error:', error);
        setError(error instanceof Error ? error.message : 'Analysis failed');
      }
    }
  }, [addTranscript, addAnalysis, context, setError]);

  useEffect(() => {
    let isInitialized = false;

    const initializeSpeechRecognition = async () => {
      try {
        await speechRecognitionService.initialize();
        isInitialized = true;
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to initialize speech recognition');
        setIsRecording(false);
      }
    };

    if (!isInitialized) {
      initializeSpeechRecognition();
    }

    return () => {
      speechRecognitionService.cleanup();
    };
  }, [setError, setIsRecording]);

  useEffect(() => {
    if (isRecording) {
      try {
        speechRecognitionService.startRecognition(handleTranscription);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to start speech recognition');
        setIsRecording(false);
      }
    } else {
      speechRecognitionService.stopRecognition().catch((error) => {
        setError(error instanceof Error ? error.message : 'Failed to stop speech recognition');
      });
    }
  }, [isRecording, handleTranscription, setError, setIsRecording]);

  return {
    isRecording,
    startRecording: () => setIsRecording(true),
    stopRecording: () => setIsRecording(false),
  };
}