import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Transcript {
  id: string;
  text: string;
  timestamp: number;
  isFinal: boolean;
}

interface TranscriptionPanelProps {
  transcripts: Transcript[];
}

const TranscriptionPanel: React.FC<TranscriptionPanelProps> = ({ transcripts }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Live Transcription</h2>
      </div>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {transcripts.map((transcript) => (
          <div 
            key={transcript.id}
            className={`p-3 rounded-lg ${
              transcript.isFinal ? 'bg-gray-50' : 'bg-blue-50 animate-pulse'
            }`}
          >
            <p className="text-sm text-gray-500 mb-1">
              {new Date(transcript.timestamp).toLocaleTimeString()}
            </p>
            <p className="text-gray-800">{transcript.text}</p>
          </div>
        ))}
        
        {transcripts.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No transcriptions yet. Start recording to begin.
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptionPanel;