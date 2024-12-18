import React from 'react';
import { Upload, AlertTriangle } from 'lucide-react';
import { useDocumentUpload } from '../../hooks/useDocumentUpload';
import { DocumentType } from '../../types/documents';

interface DocumentUploadProps {
  onUploadComplete: (documentId: string) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUploadComplete }) => {
  const { uploadDocument, isUploading, error } = useDocumentUpload();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const documentType = determineDocumentType(file.name);
    await uploadDocument(file, documentType, onUploadComplete);
  };

  const determineDocumentType = (filename: string): DocumentType => {
    const lower = filename.toLowerCase();
    if (lower.includes('usability')) return 'usability';
    if (lower.includes('risk') || lower.includes('rma')) return 'risk-analysis';
    if (lower.includes('requirement')) return 'requirements';
    if (lower.includes('test')) return 'test-report';
    return 'other';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="relative">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <input
          type="file"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.txt"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isUploading ? 'Uploading...' : 'Upload device documentation'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Supports PDF, DOC, DOCX, and TXT files
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;