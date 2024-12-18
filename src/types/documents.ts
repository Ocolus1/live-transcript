export type DocumentType = 'usability' | 'risk-analysis' | 'requirements' | 'test-report' | 'other';

export interface DeviceDocument {
  id: string;
  name: string;
  type: DocumentType;
  uploadDate: number;
  url: string;
  size: number;
  metadata?: {
    deviceType?: string;
    version?: string;
    author?: string;
    lastModified?: number;
  };
}