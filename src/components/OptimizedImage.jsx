// src/components/OptimizedImage.jsx - Simplified version
import { useState, useRef, useEffect, memo } from "react";

const OptimizedImage = memo(
  ({
    src,
    alt,
    className = "",
    placeholder = null,
    eager = false,
    onLoad = null,
    ...props
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(eager);
    const [error, setError] = useState(false);
    const imgRef = useRef(null);
    const observerRef = useRef(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
      if (eager || isInView) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: "50px",
          threshold: 0.1,
        }
      );

      observerRef.current = observer;

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }, [eager, isInView]);

    const defaultPlaceholder = (
      <div
        className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}
      >
        <svg
          className="w-10 h-10 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );

    if (error) {
      return (
        <div
          className={`${className} bg-gray-100 flex items-center justify-center`}
        >
          <span className="text-gray-400 text-sm">Failed to load image</span>
        </div>
      );
    }

    return (
      <div ref={imgRef} className="relative">
        {/* Placeholder while loading */}
        {!isLoaded && (placeholder || defaultPlaceholder)}

        {/* Actual image */}
        {isInView && (
          <img
            src={src}
            alt={alt}
            className={`${className} transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0 absolute top-0 left-0"
            }`}
            onLoad={() => {
              setIsLoaded(true);
              if (onLoad) onLoad();
            }}
            onError={() => setError(true)}
            {...props}
          />
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
