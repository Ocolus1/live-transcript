import React, { useState } from 'react';
import { Send, BookOpen } from 'lucide-react';
import { aiAnalysisService } from '../services/ai/analysis';
import { useStore } from '../store';
import { useLoadingState } from '../hooks/useLoadingState';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import type { AnalysisContext } from '../services/ai/types';

interface TextAnalysisProps {
  context: AnalysisContext;
}

const TextAnalysis: React.FC<TextAnalysisProps> = ({ context }) => {
  const { addAnalysis } = useStore();
  const [text, setText] = useState('');
  const { isLoading, error, startLoading, stopLoading, setLoadingError } = useLoadingState();

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    startLoading();
    try {
      const analysis = await aiAnalysisService.analyzeText(text, context);
      addAnalysis(analysis);
      setText('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze text';
      setLoadingError(errorMessage);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Text Analysis</h2>
      </div>

      {error && (
        <ErrorMessage
          message={error}
          className="mb-4"
          onDismiss={() => setLoadingError('')}
        />
      )}

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text for analysis..."
          className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          disabled={isLoading}
        />
        <button
          onClick={handleAnalyze}
          disabled={!text.trim() || isLoading}
          className={`
            absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg
            transition-colors duration-200
            ${text.trim() && !isLoading
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="text-white" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Analyze</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TextAnalysis;