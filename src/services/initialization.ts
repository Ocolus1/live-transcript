import { EnhancedSpeechRecognitionService } from './speechRecognition';
import { EnhancedAIAnalysisService } from './aiAnalysis';
import { env } from '../config/env';

class ServiceInitializer {
  private static instance: ServiceInitializer;
  private initialized = false;
  
  public speechRecognition: EnhancedSpeechRecognitionService;
  public aiAnalysis: EnhancedAIAnalysisService;

  private constructor() {
    this.speechRecognition = new EnhancedSpeechRecognitionService();
    this.aiAnalysis = new EnhancedAIAnalysisService();
  }

  public static getInstance(): ServiceInitializer {
    if (!ServiceInitializer.instance) {
      ServiceInitializer.instance = new ServiceInitializer();
    }
    return ServiceInitializer.instance;
  }

  public async initialize() {
    if (this.initialized) return;

    try {
      await Promise.all([
        this.speechRecognition.initialize({
          key: env.AZURE_SPEECH_KEY,
          region: env.AZURE_SPEECH_REGION
        }),
        this.aiAnalysis.initialize()
      ]);
      
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize services:', error);
      throw error;
    }
  }
}

export const services = ServiceInitializer.getInstance();