import React, { useState, useEffect } from 'react';
import DocumentUpload from './DocumentUpload';
import DocumentList from './DocumentList';
import { documentService } from '../../services/documents/documentService';
import { DeviceDocument } from '../../types/documents';
import { useStore } from '../../store';

interface DeviceDocumentsProps {
  searchQuery: string;
}

const DeviceDocuments: React.FC<DeviceDocumentsProps> = ({ searchQuery }) => {
  const [documents, setDocuments] = useState<DeviceDocument[]>([]);
  const setError = useStore(state => state.setError);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await documentService.getDocuments();
      setDocuments(docs);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load documents');
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDocumentUpload = (documentId: string) => {
    loadDocuments();
  };

  const handleDocumentDelete = async (id: string) => {
    try {
      await documentService.deleteDocument(id);
      setDocuments(docs => docs.filter(doc => doc.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete document');
    }
  };

  const handleDocumentDownload = async (document: DeviceDocument) => {
    try {
      await documentService.downloadDocument(document);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to download document');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocumentUpload onUploadComplete={handleDocumentUpload} />
        <DocumentList
          documents={filteredDocuments}
          onDelete={handleDocumentDelete}
          onDownload={handleDocumentDownload}
        />
      </div>
    </div>
  );
};

export default DeviceDocuments;