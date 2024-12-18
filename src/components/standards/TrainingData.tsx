import React, { useState, useEffect } from 'react';
import { Upload, FileText, AlertTriangle } from 'lucide-react';
import { trainingDataService } from '../../services/training/trainingDataService';
import { TrainingDocument } from '../../types/training';
import { MEDICAL_DEVICE_STANDARDS } from '../../services/ai/standards';
import { useStore } from '../../store';

interface TrainingDataProps {
  searchQuery: string;
}

const TrainingData: React.FC<TrainingDataProps> = ({ searchQuery }) => {
  const [trainingDocs, setTrainingDocs] = useState<TrainingDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const setError = useStore(state => state.setError);

  useEffect(() => {
    loadTrainingData();
  }, []);

  const loadTrainingData = async () => {
    try {
      const docs = await trainingDataService.getTrainingDocuments();
      setTrainingDocs(docs);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load training data');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await trainingDataService.uploadTrainingDocument(file);
      loadTrainingData();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to upload training data');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Upload Training Data</h2>
        <div className="relative">
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".pdf,.txt,.json"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isUploading ? 'Processing...' : 'Upload training documents'}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Upload documents related to standards, guidelines, or best practices
            </p>
          </div>
        </div>
      </div>

      {/* Standards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(MEDICAL_DEVICE_STANDARDS)
          .filter(([category]) => 
            !searchQuery || 
            category.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(([category, standards]) => (
            <div key={category} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{category}</h2>
              <ul className="space-y-3">
                {standards
                  .filter(standard =>
                    !searchQuery ||
                    standard.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((standard, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span>{standard}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))}
      </div>

      {/* Training Documents List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Training Documents</h2>
        <div className="space-y-4">
          {trainingDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <FileText className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                doc.status === 'processed'
                  ? 'bg-green-100 text-green-800'
                  : doc.status === 'processing'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingData;