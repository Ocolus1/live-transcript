import { useState } from 'react';
import { DocumentType } from '../types/documents';
import { documentService } from '../services/documents/documentService';

export function useDocumentUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadDocument = async (
    file: File,
    type: DocumentType,
    onComplete: (documentId: string) => void
  ) => {
    setIsUploading(true);
    setError(null);

    try {
      const documentId = await documentService.uploadDocument(file, type);
      onComplete(documentId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadDocument,
    isUploading,
    error
  };
}