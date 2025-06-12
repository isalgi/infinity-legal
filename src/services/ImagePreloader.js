// src/services/imagePreloader.js - Optimized version
class ImagePreloader {
  constructor() {
    this.preloadedImages = new Set();
    this.preloadPromises = new Map();
    this.isProduction = process.env.NODE_ENV === "production";
  }

  // Preload a single image
  preloadImage(src) {
    if (this.preloadedImages.has(src)) {
      return Promise.resolve();
    }

    if (this.preloadPromises.has(src)) {
      return this.preloadPromises.get(src);
    }

    const promise = new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.preloadedImages.add(src);
        this.preloadPromises.delete(src);
        if (!this.isProduction) {
          console.log("✅ Image preloaded:", src.split("/").pop()); // Show only filename
        }
        resolve();
      };

      img.onerror = () => {
        this.preloadPromises.delete(src);
        console.error("❌ Failed to preload image:", src.split("/").pop());
        reject(new Error(`Failed to preload image: ${src}`));
      };

      img.src = src;
    });

    this.preloadPromises.set(src, promise);
    return promise;
  }

  // Preload multiple images with batching
  async preloadImages(imageUrls) {
    if (!Array.isArray(imageUrls)) return;

    const uniqueUrls = [...new Set(imageUrls)].filter(
      (url) =>
        url &&
        typeof url === "string" &&
        !this.preloadedImages.has(url) &&
        !this.preloadPromises.has(url)
    );

    if (uniqueUrls.length === 0) return;

    if (!this.isProduction) {
      console.log(`🔄 Preloading ${uniqueUrls.length} new images...`);
    }

    // Preload via Service Worker if available
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "PRELOAD_IMAGES",
        urls: uniqueUrls,
      });
    }

    // Batch preload - process in chunks of 5 to avoid overwhelming the browser
    const batchSize = 5;
    const batches = [];

    for (let i = 0; i < uniqueUrls.length; i += batchSize) {
      batches.push(uniqueUrls.slice(i, i + batchSize));
    }

    try {
      for (const batch of batches) {
        const promises = batch.map((url) =>
          this.preloadImage(url).catch((error) => {
            if (!this.isProduction) {
              console.warn(
                "Image preload failed:",
                url.split("/").pop(),
                error.message
              );
            }
            return null;
          })
        );

        await Promise.allSettled(promises);

        // Small delay between batches to prevent overwhelming the browser
        if (batches.length > 1) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }

      if (!this.isProduction) {
        console.log(
          `✅ Image preloading completed: ${uniqueUrls.length} images`
        );
      }
    } catch (error) {
      console.error("❌ Image preloading batch failed:", error);
    }
  }

  // Check if image is preloaded
  isPreloaded(src) {
    return this.preloadedImages.has(src);
  }

  // Get preload status
  getPreloadStatus() {
    return {
      preloadedCount: this.preloadedImages.size,
      preloadedImages: Array.from(this.preloadedImages),
      pendingCount: this.preloadPromises.size,
    };
  }

  // Clear preload cache
  clearCache() {
    this.preloadedImages.clear();
    this.preloadPromises.clear();
    if (!this.isProduction) {
      console.log("🧹 Image preloader cache cleared");
    }
  }

  // Get statistics
  getStats() {
    const status = this.getPreloadStatus();
    return {
      ...status,
      cacheHitRate:
        status.preloadedCount > 0
          ? (
              (status.preloadedCount /
                (status.preloadedCount + status.pendingCount)) *
              100
            ).toFixed(1) + "%"
          : "0%",
    };
  }
}

// Create singleton instance
export const imagePreloader = new ImagePreloader();

// Hook for React components
export const useImagePreloader = () => {
  return {
    preloadImage: imagePreloader.preloadImage.bind(imagePreloader),
    preloadImages: imagePreloader.preloadImages.bind(imagePreloader),
    isPreloaded: imagePreloader.isPreloaded.bind(imagePreloader),
    getStatus: imagePreloader.getPreloadStatus.bind(imagePreloader),
    getStats: imagePreloader.getStats.bind(imagePreloader),
  };
};
