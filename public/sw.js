// public/sw.js - Fixed video caching
const CACHE_NAME = "infinity-legal-cache-v3";
const VIDEO_CACHE = "infinity-legal-video-cache-v2";
const IMAGE_CACHE = "infinity-legal-image-cache-v2";

const VIDEO_URLS = [
  "https://jxtylpahapimibfnchjt.supabase.co/storage/v1/object/public/videos/hero-section.mp4",
  "https://jxtylpahapimibfnchjt.supabase.co/storage/v1/object/public/videos/about-section%20(1).mp4", // Fixed URL encoding
];

const isProduction = self.location.hostname !== "localhost";

// Normalize URL for consistent matching
const normalizeUrl = (url) => {
  return url
    .replace(/\/+/g, "/")
    .replace("https:/", "https://")
    .replace(/\s/g, "%20");
};

// Install event - cache videos during install
self.addEventListener("install", (event) => {
  if (!isProduction) console.log("🔧 Service Worker installing...");

  event.waitUntil(
    Promise.all([
      // Pre-cache videos during install
      caches.open(VIDEO_CACHE).then((cache) => {
        if (!isProduction) console.log("🎥 Pre-caching videos...");

        return Promise.allSettled(
          VIDEO_URLS.map((url) => {
            const normalizedUrl = normalizeUrl(url);
            return fetch(normalizedUrl, {
              mode: "cors",
              cache: "force-cache", // Try to use existing cache if available
            })
              .then((response) => {
                if (response.ok) {
                  if (!isProduction)
                    console.log(`✅ Video cached: ${url.split("/").pop()}`);
                  return cache.put(normalizedUrl, response);
                } else {
                  throw new Error(`HTTP ${response.status}`);
                }
              })
              .catch((error) => {
                console.error(
                  `❌ Failed to cache video ${url.split("/").pop()}:`,
                  error.message
                );
              });
          })
        );
      }),

      // Initialize image cache
      caches.open(IMAGE_CACHE),
    ])
      .then(() => {
        if (!isProduction)
          console.log("✅ Service Worker installation completed");
        self.skipWaiting();
      })
      .catch((error) => {
        console.error("❌ Service Worker installation failed:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  if (!isProduction) console.log("🔧 Service Worker activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Keep only current cache versions
            if (!cacheName.includes("-v2") && !cacheName.includes("-v3")) {
              if (!isProduction)
                console.log("🗑️ Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        if (!isProduction) console.log("✅ Service Worker activated");
        return self.clients.claim();
      })
  );
});

// Enhanced URL matching for videos
const isVideoRequest = (url) => {
  const normalizedUrl = normalizeUrl(url);

  // Check if it's a video file
  if (!normalizedUrl.includes(".mp4")) return false;

  // Check against our known video URLs
  return VIDEO_URLS.some((videoUrl) => {
    const normalizedVideoUrl = normalizeUrl(videoUrl);
    return (
      normalizedUrl === normalizedVideoUrl ||
      normalizedUrl.includes(videoUrl.split("/").pop()) ||
      url.includes(videoUrl.split("/").pop())
    );
  });
};

// Enhanced URL matching for images
const isImageRequest = (url) => {
  return (
    url.includes("supabase.co/storage") &&
    (url.includes(".jpg") ||
      url.includes(".jpeg") ||
      url.includes(".png") ||
      url.includes(".webp") ||
      url.includes(".gif"))
  );
};

// Track requests to prevent spam
const requestLog = new Map();

// Fetch event - serve cached content with better video handling
self.addEventListener("fetch", (event) => {
  const requestUrl = event.request.url;
  const normalizedUrl = normalizeUrl(requestUrl);

  let cacheToUse = null;

  if (isVideoRequest(requestUrl)) {
    cacheToUse = VIDEO_CACHE;
  } else if (isImageRequest(requestUrl)) {
    cacheToUse = IMAGE_CACHE;
  }

  if (cacheToUse) {
    event.respondWith(
      caches
        .open(cacheToUse)
        .then((cache) => cache.match(event.request))
        .then((response) => {
          if (response) {
            // Serve from cache
            const fileName = requestUrl.split("/").pop();

            // Log cache hits less frequently
            if (!requestLog.has(fileName)) {
              if (!isProduction)
                console.log(`💾 Serving from cache: ${fileName}`);
              requestLog.set(fileName, Date.now());
            }

            return response;
          }

          // Not in cache - fetch and cache
          const fileName = requestUrl.split("/").pop();
          if (!isProduction)
            console.log(`⬇️ Fetching and caching: ${fileName}`);

          return fetch(event.request)
            .then((fetchResponse) => {
              // Check if we received a valid response
              if (!fetchResponse || fetchResponse.status !== 200) {
                if (!isProduction)
                  console.warn(
                    `⚠️ Invalid response for ${fileName}: ${fetchResponse?.status}`
                  );
                return fetchResponse;
              }

              // For videos, ensure we cache them properly
              if (cacheToUse === VIDEO_CACHE) {
                const responseClone = fetchResponse.clone();

                caches.open(VIDEO_CACHE).then((cache) => {
                  cache
                    .put(event.request, responseClone)
                    .then(() => {
                      if (!isProduction)
                        console.log(`✅ Video cached: ${fileName}`);
                    })
                    .catch((error) => {
                      console.error(
                        `❌ Failed to cache video ${fileName}:`,
                        error
                      );
                    });
                });
              } else {
                // For images, cache normally
                const responseClone = fetchResponse.clone();

                caches.open(IMAGE_CACHE).then((cache) => {
                  cache.put(event.request, responseClone);
                });
              }

              return fetchResponse;
            })
            .catch((error) => {
              console.error(`❌ Fetch failed for ${fileName}:`, error);
              throw error;
            });
        })
        .catch((error) => {
          console.error(`❌ Cache operation failed for ${requestUrl}:`, error);
          return fetch(event.request);
        })
    );
  }
});

// Handle messages from main thread (for preloading)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "PRELOAD_IMAGES") {
    const imageUrls = event.data.urls;

    if (!isProduction) {
      console.log(`🔄 Service Worker preloading ${imageUrls.length} images...`);
    }

    caches.open(IMAGE_CACHE).then((cache) => {
      let preloadedCount = 0;

      const preloadPromises = imageUrls.map((url) =>
        cache.match(url).then((cached) => {
          if (cached) {
            preloadedCount++;
            return Promise.resolve();
          }

          return fetch(url)
            .then((response) => {
              if (response.ok) {
                preloadedCount++;
                return cache.put(url, response.clone());
              }
            })
            .catch((error) => {
              if (!isProduction)
                console.warn("Preload failed:", url.split("/").pop());
            });
        })
      );

      Promise.allSettled(preloadPromises).then(() => {
        if (!isProduction) {
          console.log(
            `✅ Service Worker preloaded ${preloadedCount}/${imageUrls.length} images`
          );
        }
      });
    });
  }

  // Handle video preload requests
  if (event.data && event.data.type === "PRELOAD_VIDEOS") {
    if (!isProduction) {
      console.log(`🎥 Preloading videos...`);
    }

    caches.open(VIDEO_CACHE).then((cache) => {
      VIDEO_URLS.forEach((url) => {
        const normalizedUrl = normalizeUrl(url);
        cache.match(normalizedUrl).then((cached) => {
          if (!cached) {
            fetch(normalizedUrl)
              .then((response) => {
                if (response.ok) {
                  return cache.put(normalizedUrl, response);
                }
              })
              .catch((error) => {
                console.error("Video preload failed:", url.split("/").pop());
              });
          }
        });
      });
    });
  }
});
