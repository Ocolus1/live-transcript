import React from 'react';
import { Brain, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { AnalysisResult } from '../services/ai/types';

interface AnalysisPanelProps {
  analyses: AnalysisResult[];
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analyses }) => {
  const getPriorityColor = (priority: AnalysisResult['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getCategoryIcon = (category: AnalysisResult['category']) => {
    switch (category) {
      case 'safety':
        return <AlertTriangle className="w-5 h-5" />;
      case 'regulatory':
        return <FileText className="w-5 h-5" />;
      case 'usability':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Expert Analysis</h2>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {analyses.map((analysis, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`p-1.5 rounded-full ${getPriorityColor(analysis.priority)}`}>
                  {getCategoryIcon(analysis.category)}
                </span>
                <span className="font-medium capitalize">{analysis.category}</span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm border ${getPriorityColor(
                  analysis.priority
                )}`}
              >
                {analysis.priority} priority
              </span>
            </div>

            <p className="text-gray-800 mb-3">{analysis.recommendation}</p>

            {analysis.standards && analysis.standards.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-2">Relevant Standards:</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.standards.map((standard, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {standard}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {analyses.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No analysis yet. Start recording to receive expert insights.
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPanel;