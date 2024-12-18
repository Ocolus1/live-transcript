// Add view types
export type View = 'analysis' | 'history' | 'standards' | 'reports' | 'settings' | 'help';

export interface Transcript {
  id: string;
  text: string;
  timestamp: number;
  isFinal: boolean;
}

export interface Analysis {
  id: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  category: 'usability' | 'safety' | 'regulatory' | 'general';
  standards?: string[];
  timestamp: number;
}

export interface UploadedImage {
  id: string;
  url: string;
  name: string;
  timestamp: number;
}