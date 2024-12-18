import { describe, it, expect, vi } from 'vitest';
import { cacheService } from '../../../services/performance/cache';
import { get, set } from 'idb-keyval';

vi.mock('idb-keyval');

describe('CacheService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get cached data', async () => {
    const mockData = {
      data: { test: 'data' },
      timestamp: Date.now()
    };

    vi.mocked(get).mockResolvedValue(mockData);

    const result = await cacheService.get('test-key');
    expect(result).toEqual(mockData.data);
  });

  it('should return null for expired cache', async () => {
    const mockData = {
      data: { test: 'data' },
      timestamp: Date.now() - (25 * 60 * 60 * 1000) // 25 hours ago
    };

    vi.mocked(get).mockResolvedValue(mockData);

    const result = await cacheService.get('test-key');
    expect(result).toBeNull();
  });

  it('should set cache data', async () => {
    const testData = { test: 'data' };
    await cacheService.set('test-key', testData);

    expect(set).toHaveBeenCalledWith(
      expect.stringContaining('test-key'),
      expect.objectContaining({
        data: testData,
        timestamp: expect.any(Number)
      })
    );
  });
});