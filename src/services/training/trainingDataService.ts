import { TrainingDocument } from '../../types/training';
import { ApiError } from '../errors/ApiError';

export class TrainingDataService {
  private trainingDocuments: TrainingDocument[] = [];

  async uploadTrainingDocument(file: File): Promise<string> {
    try {
      // Validate file
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        throw new ApiError('File size exceeds 20MB limit');
      }

      const allowedTypes = [
        'application/pdf',
        'text/plain',
        'application/json'
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new ApiError('Invalid file type. Please upload PDF, TXT, or JSON files.');
      }

      // Create document record
      const document: TrainingDocument = {
        id: Date.now().toString(),
        name: file.name,
        uploadDate: Date.now(),
        status: 'processing',
        type: this.determineDocumentType(file.name)
      };

      // Simulate processing
      setTimeout(() => {
        document.status = 'processed';
        this.updateDocument(document);
      }, 2000);

      this.trainingDocuments.push(document);
      return document.id;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to upload training document');
    }
  }

  private determineDocumentType(filename: string): TrainingDocument['type'] {
    const lower = filename.toLowerCase();
    if (lower.includes('standard')) return 'standard';
    if (lower.includes('guide')) return 'guideline';
    return 'best-practice';
  }

  private updateDocument(document: TrainingDocument) {
    const index = this.trainingDocuments.findIndex(doc => doc.id === document.id);
    if (index !== -1) {
      this.trainingDocuments[index] = document;
    }
  }

  async getTrainingDocuments(): Promise<TrainingDocument[]> {
    return this.trainingDocuments;
  }
}

export const trainingDataService = new TrainingDataService();