import React from 'react';
import { FileText, Download, Trash2, Tag } from 'lucide-react';
import { DeviceDocument } from '../../types/documents';
import { formatDate } from '../../utils/date';

interface DocumentListProps {
  documents: DeviceDocument[];
  onDelete: (id: string) => void;
  onDownload: (document: DeviceDocument) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDelete,
  onDownload
}) => {
  const getTypeColor = (type: DeviceDocument['type']) => {
    switch (type) {
      case 'usability':
        return 'bg-blue-100 text-blue-800';
      case 'risk-analysis':
        return 'bg-red-100 text-red-800';
      case 'requirements':
        return 'bg-green-100 text-green-800';
      case 'test-report':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Device Documentation</h2>
      
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <FileText className="w-6 h-6 text-gray-600" />
              <div>
                <h3 className="font-medium">{doc.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getTypeColor(doc.type)}`}>
                    {doc.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(doc.uploadDate)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onDownload(doc)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => onDelete(doc.id)}
                className="p-2 hover:bg-red-100 rounded-full transition-colors"
                title="Delete"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        ))}

        {documents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No documents uploaded yet
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentList;