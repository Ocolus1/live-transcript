// Update the store to include view management
import { create } from 'zustand';
import { AnalysisResult } from '../services/ai/types';
import { UploadedImage } from '../services/image/types';
import { ImageAnalysisService } from '../services/image/analysis';
import { View } from '../types';

const imageAnalysisService = new ImageAnalysisService();

interface AppState {
  activeView: View;
  isRecording: boolean;
  transcripts: Array<{
    id: string;
    text: string;
    timestamp: number;
    isFinal: boolean;
  }>;
  analyses: AnalysisResult[];
  images: UploadedImage[];
  error: string | null;
  setActiveView: (view: View) => void;
  setIsRecording: (isRecording: boolean) => void;
  addTranscript: (text: string, isFinal: boolean) => void;
  addAnalysis: (analysis: AnalysisResult) => void;
  addImage: (image: UploadedImage) => void;
  removeImage: (id: string) => void;
  updateImageAnalysis: (id: string, analysis: UploadedImage['analysis']) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  activeView: 'analysis',
  isRecording: false,
  transcripts: [],
  analyses: [],
  images: [],
  error: null,
  setActiveView: (view) => set({ activeView: view }),
  setIsRecording: (isRecording) => set({ isRecording }),
  addTranscript: (text, isFinal) => 
    set((state) => ({
      transcripts: [...state.transcripts, {
        id: Date.now().toString(),
        text,
        timestamp: Date.now(),
        isFinal
      }]
    })),
  addAnalysis: (analysis) => 
    set((state) => ({ analyses: [...state.analyses, analysis] })),
  addImage: async (image) => {
    set((state) => ({ images: [...state.images, image] }));
    try {
      const analysis = await imageAnalysisService.analyzeImage(image.url);
      set((state) => ({
        images: state.images.map(img =>
          img.id === image.id ? { ...img, analysis } : img
        )
      }));
    } catch (error) {
      console.error('Failed to analyze image:', error);
    }
  },
  removeImage: (id) => 
    set((state) => ({ images: state.images.filter((img) => img.id !== id) })),
  updateImageAnalysis: (id, analysis) =>
    set((state) => ({
      images: state.images.map(img =>
        img.id === id ? { ...img, analysis } : img
      )
    })),
  setError: (error) => set({ error }),
}));