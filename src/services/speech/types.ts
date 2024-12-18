export interface SpeechRecognitionConfig {
  key: string;
  region: string;
  language?: string;
}

export interface RecognitionCallbacks {
  onInterim: (text: string) => void;
  onFinal: (text: string) => void;
  onError: (error: Error) => void;
}