import { env } from '../../config/env';
import { SpeechConfig } from 'microsoft-cognitiveservices-speech-sdk';
import { ApiError } from '../errors/ApiError';

export function createSpeechConfig() {
  if (!env.AZURE_SPEECH_KEY || !env.AZURE_SPEECH_REGION) {
    throw new ApiError('Azure Speech credentials are not configured');
  }

  const speechConfig = SpeechConfig.fromSubscription(
    env.AZURE_SPEECH_KEY,
    env.AZURE_SPEECH_REGION
  );
  
  speechConfig.speechRecognitionLanguage = "en-US";
  speechConfig.enableDictation();
  
  return speechConfig;
}