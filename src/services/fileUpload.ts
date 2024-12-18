import { chunk } from './utils/chunk';

export class FileUploadService {
  private static CHUNK_SIZE = 1024 * 1024; // 1MB chunks

  async uploadPDF(file: File, onProgress: (progress: number) => void): Promise<string> {
    const chunks = await this.createChunks(file);
    const totalChunks = chunks.length;
    let uploadedChunks = 0;

    for (const chunk of chunks) {
      await this.uploadChunk(chunk, file.name, uploadedChunks);
      uploadedChunks++;
      onProgress((uploadedChunks / totalChunks) * 100);
    }

    return await this.finalizeUpload(file.name);
  }

  private async createChunks(file: File): Promise<Blob[]> {
    return chunk(file, FileUploadService.CHUNK_SIZE);
  }

  private async uploadChunk(chunk: Blob, fileName: string, index: number): Promise<void> {
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('fileName', fileName);
    formData.append('index', index.toString());

    await fetch('/api/upload/chunk', {
      method: 'POST',
      body: formData
    });
  }

  private async finalizeUpload(fileName: string): Promise<string> {
    const response = await fetch('/api/upload/finalize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fileName })
    });
    
    const { fileId } = await response.json();
    return fileId;
  }
}