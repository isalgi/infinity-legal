// Cache service for API data
class CacheService {
  constructor() {
    this.memoryCache = new Map();
    this.CACHE_PREFIX = 'infinity-legal-';
    this.DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
  }

  // Get cache key with prefix
  getCacheKey(key) {
    return `${this.CACHE_PREFIX}${key}`;
  }

  // Set cache with TTL
  async set(key, data, ttl = this.DEFAULT_TTL) {
    const cacheKey = this.getCacheKey(key);
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl
    };

    // Set in memory cache
    this.memoryCache.set(cacheKey, cacheData);

    // Set in localStorage with error handling
    try {
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  // Get cache data
  async get(key) {
    const cacheKey = this.getCacheKey(key);
    
    // Check memory cache first
    let cached = this.memoryCache.get(cacheKey);
    
    // Fallback to localStorage
    if (!cached) {
      try {
        const stored = localStorage.getItem(cacheKey);
        if (stored) {
          cached = JSON.parse(stored);
          // Restore to memory cache
          this.memoryCache.set(cacheKey, cached);
        }
      } catch (error) {
        console.warn('Failed to read from localStorage:', error);
      }
    }

    if (!cached) return null;

    // Check if cache is expired
    const now = Date.now();
    if (now - cached.timestamp > cached.ttl) {
      this.delete(key);
      return null;
    }

    return cached.data;
  }

  // Delete cache entry
  async delete(key) {
    const cacheKey = this.getCacheKey(key);
    this.memoryCache.delete(cacheKey);
    
    try {
      localStorage.removeItem(cacheKey);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  // Clear all cache
  async clear() {
    this.memoryCache.clear();
    
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }

  // Clean expired entries
  async cleanExpired() {
    const now = Date.now();
    
    // Clean memory cache
    for (const [key, value] of this.memoryCache.entries()) {
      if (now - value.timestamp > value.ttl) {
        this.memoryCache.delete(key);
      }
    }

    // Clean localStorage
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          try {
            const stored = JSON.parse(localStorage.getItem(key));
            if (now - stored.timestamp > stored.ttl) {
              localStorage.removeItem(key);
            }
          } catch (error) {
            // Remove corrupted entries
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.warn('Failed to clean localStorage:', error);
    }
  }
}

export const cacheService = new CacheService();

// Clean expired entries on page load
cacheService.cleanExpired();

// Clean expired entries every 10 minutes
setInterval(() => {
  cacheService.cleanExpired();
}, 10 * 60 * 1000);