// src/components/CachedVideo.jsx - Enhanced version
import { useEffect, useRef, useState } from "react";

const CachedVideo = ({
  src,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  ...props
}) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [swReady, setSwReady] = useState(false);
  const loadAttemptRef = useRef(0);

  // Wait for service worker to be ready
  useEffect(() => {
    const checkServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          if (registration.active) {
            setSwReady(true);

            // Send preload message for this video
            if (navigator.serviceWorker.controller) {
              navigator.serviceWorker.controller.postMessage({
                type: "PRELOAD_VIDEOS",
              });
            }
          }
        } catch (error) {
          console.warn("Service Worker not available:", error);
          setSwReady(true); // Continue without SW
        }
      } else {
        setSwReady(true); // Continue without SW
      }
    };

    checkServiceWorker();
  }, []);

  useEffect(() => {
    if (!swReady || !videoRef.current) return;

    const video = videoRef.current;
    let timeoutId;

    const handleLoadedData = () => {
      setIsLoaded(true);
      setError(false);
      console.log(`🎥 Video loaded: ${src.split("/").pop()}`);
    };

    const handleError = (e) => {
      loadAttemptRef.current++;
      console.error(
        `❌ Video error (attempt ${loadAttemptRef.current}):`,
        src.split("/").pop(),
        e
      );

      // Retry once after a delay
      if (loadAttemptRef.current === 1) {
        timeoutId = setTimeout(() => {
          console.log(`🔄 Retrying video load: ${src.split("/").pop()}`);
          video.load();
        }, 2000);
      } else {
        setError(true);
      }
    };

    const handleCanPlay = () => {
      if (autoPlay && video.paused) {
        video.play().catch((error) => {
          console.warn("Video autoplay failed:", error);
        });
      }
    };

    const handleLoadStart = () => {
      console.log(`🔄 Loading video: ${src.split("/").pop()}`);
    };

    // Add event listeners
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadstart", handleLoadStart);

    // Start loading
    video.load();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadstart", handleLoadStart);
    };
  }, [src, autoPlay, swReady]);

  if (error && loadAttemptRef.current > 1) {
    return (
      <div
        className={`${className} bg-gray-900 flex items-center justify-center`}
      >
        <div className="text-white text-center">
          <div className="text-6xl mb-4">🎥</div>
          <p>Video unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div
          className={`${className} bg-gray-900 flex items-center justify-center absolute top-0 left-0 z-5`}
        >
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading video...</p>
            {!swReady && <p className="text-xs mt-2">Initializing cache...</p>}
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className={className}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload="metadata"
        crossOrigin="anonymous"
        {...props}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default CachedVideo;
