import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import { createSpeechConfig } from './config';
import { ApiError } from '../errors/ApiError';
import { TranscriptionCallback } from './types';

export class SpeechRecognitionService {
  private recognizer: speechsdk.SpeechRecognizer | null = null;
  private isInitialized = false;
  private isRecognizing = false;

  async initialize(): Promise<void> {
    try {
      const speechConfig = createSpeechConfig();
      const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
      
      this.recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
      this.isInitialized = true;
    } catch (error) {
      console.error('Speech recognition initialization error:', error);
      throw new ApiError(
        error instanceof ApiError 
          ? error.message 
          : 'Failed to initialize speech recognition'
      );
    }
  }

  startRecognition(callback: TranscriptionCallback): void {
    if (!this.isInitialized || !this.recognizer) {
      throw new ApiError('Speech recognition not initialized');
    }

    if (this.isRecognizing) {
      throw new ApiError('Speech recognition is already running');
    }

    try {
      // Handle interim results
      this.recognizer.recognizing = (_, event) => {
        if (event.result.reason === speechsdk.ResultReason.RecognizingSpeech) {
          callback(event.result.text, false);
        }
      };

      // Handle final results
      this.recognizer.recognized = (_, event) => {
        if (event.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
          callback(event.result.text, true);
        }
      };

      // Handle errors
      this.recognizer.canceled = (_, event) => {
        if (event.reason === speechsdk.CancellationReason.Error) {
          console.error('Speech recognition error:', event.errorDetails);
          throw new ApiError(`Speech recognition error: ${event.errorDetails}`);
        }
      };

      this.recognizer.startContinuousRecognitionAsync(
        () => {
          this.isRecognizing = true;
          console.log('Speech recognition started');
        },
        (error) => {
          console.error('Failed to start recognition:', error);
          throw new ApiError('Failed to start speech recognition');
        }
      );
    } catch (error) {
      console.error('Speech recognition error:', error);
      throw new ApiError(
        error instanceof ApiError 
          ? error.message 
          : 'Failed to start speech recognition'
      );
    }
  }

  async stopRecognition(): Promise<void> {
    if (!this.recognizer || !this.isRecognizing) {
      return;
    }

    return new Promise<void>((resolve, reject) => {
      this.recognizer!.stopContinuousRecognitionAsync(
        () => {
          this.isRecognizing = false;
          console.log('Speech recognition stopped');
          resolve();
        },
        (error) => {
          console.error('Failed to stop recognition:', error);
          reject(new ApiError('Failed to stop speech recognition'));
        }
      );
    });
  }

  cleanup(): void {
    if (this.recognizer) {
      this.recognizer.close();
      this.recognizer = null;
      this.isInitialized = false;
      this.isRecognizing = false;
    }
  }
}

export const speechRecognitionService = new SpeechRecognitionService();