import React, { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import DeviceDocuments from '../components/standards/DeviceDocuments';
import TrainingData from '../components/standards/TrainingData';

const StandardsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'device' | 'training'>('device');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold">Standards Reference</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search standards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('device')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'device'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Device Documentation
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'training'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Training Data
          </button>
        </nav>
      </div>

      {/* Content Sections */}
      {activeTab === 'device' ? (
        <DeviceDocuments searchQuery={searchQuery} />
      ) : (
        <TrainingData searchQuery={searchQuery} />
      )}
    </div>
  );
};

export default StandardsView;