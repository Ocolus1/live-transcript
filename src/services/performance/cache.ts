import { get, set } from 'idb-keyval';

export class CacheService {
  private prefix = 'medical-device-ai:cache:';
  private maxAge = 24 * 60 * 60 * 1000; // 24 hours

  async get<T>(key: string): Promise<T | null> {
    const cacheKey = this.prefix + key;
    const cached = await get(cacheKey);
    
    if (!cached) return null;
    
    const { data, timestamp } = cached;
    if (Date.now() - timestamp > this.maxAge) {
      await this.delete(key);
      return null;
    }
    
    return data as T;
  }

  async set(key: string, data: any): Promise<void> {
    const cacheKey = this.prefix + key;
    await set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }

  async delete(key: string): Promise<void> {
    const cacheKey = this.prefix + key;
    await set(cacheKey, null);
  }
}

export const cacheService = new CacheService();