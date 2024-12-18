import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import ErrorMessage from './ErrorMessage';
import { useStore } from '../store';

const Controls: React.FC = () => {
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition();
  const error = useStore(state => state.error);

  useKeyboardNavigation([
    {
      key: 'r',
      ctrl: true,
      action: () => isRecording ? stopRecording() : startRecording()
    }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-secondary-200">
      {error && (
        <ErrorMessage
          message={error}
          className="mb-6"
          onDismiss={() => useStore.setState({ error: null })}
        />
      )}

      <div className="flex flex-col items-center justify-center gap-6">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`
            relative group flex items-center justify-center w-24 h-24 rounded-full
            transition-all duration-300 transform hover:scale-105 focus:outline-none 
            focus:ring-4 focus:ring-offset-2
            ${isRecording
              ? 'bg-red-600 hover:bg-red-700 focus:ring-red-300'
              : 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-300'
            }
          `}
          aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
          title={`${isRecording ? 'Stop' : 'Start'} Recording (Ctrl+R)`}
        >
          <div className={`
            absolute inset-0 rounded-full opacity-25
            ${isRecording ? 'animate-pulse-slow bg-red-500' : 'bg-primary-400'}
          `} />
          {isRecording ? (
            <MicOff className="w-10 h-10 text-white" aria-hidden="true" />
          ) : (
            <Mic className="w-10 h-10 text-white" aria-hidden="true" />
          )}
        </button>
        
        <div className="text-center">
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">
            {isRecording ? 'Recording in Progress' : 'Start Recording'}
          </h2>
          <p className="text-secondary-600">
            {isRecording
              ? 'Click to stop recording and analyze the conversation'
              : 'Click to start recording the conversation for analysis'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Controls;