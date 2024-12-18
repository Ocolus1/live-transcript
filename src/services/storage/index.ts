import { get, set, del, clear } from 'idb-keyval';

export class StorageService {
  private prefix = 'medical-device-ai:';

  async saveAnalysis(analysis: any) {
    const key = `${this.prefix}analysis:${Date.now()}`;
    await set(key, analysis);
    return key;
  }

  async getAnalyses() {
    const allKeys = await this.getAllKeys('analysis');
    const analyses = await Promise.all(
      allKeys.map(key => get(key))
    );
    return analyses;
  }

  async saveTranscript(transcript: any) {
    const key = `${this.prefix}transcript:${Date.now()}`;
    await set(key, transcript);
    return key;
  }

  async getTranscripts() {
    const allKeys = await this.getAllKeys('transcript');
    const transcripts = await Promise.all(
      allKeys.map(key => get(key))
    );
    return transcripts;
  }

  private async getAllKeys(type: string) {
    const allKeys = await get(`${this.prefix}${type}:`);
    return allKeys || [];
  }

  async clearAll() {
    await clear();
  }
}

export const storageService = new StorageService();