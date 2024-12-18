import React, { useState } from 'react';
import Controls from '../components/Controls';
import TranscriptionPanel from '../components/TranscriptionPanel';
import AnalysisPanel from '../components/AnalysisPanel';
import ImageUpload from '../components/ImageUpload';
import ImageGallery from '../components/ImageGallery';
import TextAnalysis from '../components/TextAnalysis';
import ContextSettings from '../components/ContextSettings';
import { Mic, Type, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store';
import type { AnalysisContext } from '../services/ai/types/analysisTypes';

const AnalysisView: React.FC = () => {
  const {
    isRecording,
    transcripts,
    analyses,
    images,
    setIsRecording,
    removeImage
  } = useStore();

  const [analysisMode, setAnalysisMode] = useState<'voice' | 'text'>('voice');
  const [showContext, setShowContext] = useState(false);
  const [context, setContext] = useState<AnalysisContext>({
    deviceType: 'qiasymphony',
    useEnvironment: 'clinical-lab',
    userType: 'lab-technician',
    riskLevel: 'medium',
    workflow: 'sample-prep',
    specialization: 'molecular',
    experience: 'intermediate',
    trainingLevel: 'basic'
  });

  return (
    <div className="space-y-6">
      {/* Analysis Mode Toggle */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setAnalysisMode('voice')}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-medium
            transition-all duration-300 transform hover:scale-105
            ${analysisMode === 'voice'
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-600 hover:bg-gray-50'
            }
          `}
        >
          <Mic className={`w-5 h-5 transition-colors duration-300 ${
            analysisMode === 'voice' ? 'animate-pulse' : ''
          }`} />
          <span>Voice Analysis</span>
        </button>
        <button
          onClick={() => setAnalysisMode('text')}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-medium
            transition-all duration-300 transform hover:scale-105
            ${analysisMode === 'text'
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-600 hover:bg-gray-50'
            }
          `}
        >
          <Type className="w-5 h-5" />
          <span>Text Analysis</span>
        </button>
      </div>

      {/* Context Settings Toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowContext(!showContext)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <Settings className="w-4 h-4" />
          <span>Context Settings</span>
          {showContext ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Context Settings Panel */}
      {showContext && (
        <ContextSettings
          context={context}
          setContext={setContext}
          showContext={showContext}
          setShowContext={setShowContext}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`md:col-span-2 transition-all duration-300 ${
          analysisMode === 'text' ? 'animate-fadeIn' : ''
        }`}>
          {analysisMode === 'voice' ? (
            <Controls
              isRecording={isRecording}
              onStartRecording={() => setIsRecording(true)}
              onStopRecording={() => setIsRecording(false)}
            />
          ) : (
            <TextAnalysis context={context} />
          )}
        </div>
        <div className="animate-fadeIn">
          <ImageUpload onImageAnalyzed={() => {}} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analysisMode === 'voice' && (
          <div className="animate-slideIn">
            <TranscriptionPanel transcripts={transcripts} />
          </div>
        )}
        <div className={`transition-all duration-300 ${
          analysisMode === 'text' ? 'md:col-span-2' : 'md:col-span-1'
        }`}>
          <AnalysisPanel analyses={analyses} />
        </div>
      </div>

      {images.length > 0 && (
        <div className="animate-fadeIn">
          <ImageGallery
            images={images}
            onRemoveImage={removeImage}
            onImageClick={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default AnalysisView;