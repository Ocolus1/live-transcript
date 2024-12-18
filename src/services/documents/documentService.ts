import { DeviceDocument, DocumentType } from '../../types/documents';
import { ApiError } from '../errors/ApiError';

export class DocumentService {
  private documents: DeviceDocument[] = [];

  async uploadDocument(file: File, type: DocumentType): Promise<string> {
    try {
      // Validate file
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new ApiError('File size exceeds 10MB limit');
      }

      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new ApiError('Invalid file type. Please upload PDF, DOC, DOCX, or TXT files.');
      }

      // Create document record
      const document: DeviceDocument = {
        id: Date.now().toString(),
        name: file.name,
        type,
        uploadDate: Date.now(),
        url: URL.createObjectURL(file),
        size: file.size
      };

      this.documents.push(document);
      return document.id;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to upload document');
    }
  }

  async getDocuments(): Promise<DeviceDocument[]> {
    return this.documents;
  }

  async deleteDocument(id: string): Promise<void> {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index !== -1) {
      URL.revokeObjectURL(this.documents[index].url);
      this.documents.splice(index, 1);
    }
  }

  async downloadDocument(document: DeviceDocument): Promise<void> {
    try {
      const response = await fetch(document.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = document.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      throw new ApiError('Failed to download document');
    }
  }
}

export const documentService = new DocumentService();