export interface TrainingDocument {
  id: string;
  name: string;
  uploadDate: number;
  status: 'processing' | 'processed' | 'error';
  type: 'standard' | 'guideline' | 'best-practice';
  metadata?: {
    source?: string;
    version?: string;
    category?: string;
    relevantStandards?: string[];
  };
}