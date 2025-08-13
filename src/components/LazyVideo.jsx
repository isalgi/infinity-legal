import { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

function LazyVideo({ 
  src, 
  className = '', 
  poster = null,
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = false,
  preload = 'none',
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef();
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (hasIntersected && !isLoaded) {
      setIsLoaded(true);
    }
  }, [hasIntersected, isLoaded]);

  useEffect(() => {
    if (isLoaded && videoRef.current && autoPlay) {
      videoRef.current.play().catch(() => {
        // Handle autoplay failure silently
      });
    }
  }, [isLoaded, autoPlay]);

  return (
    <div ref={elementRef} className={`lazy-video-container ${className}`}>
      {isLoaded ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          poster={poster}
          {...props}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div 
          className="w-full h-full bg-gray-200 flex items-center justify-center"
          style={{
            backgroundImage: poster ? `url(${poster})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {!poster && (
            <div className="text-gray-500">Loading video...</div>
          )}
        </div>
      )}
    </div>
  );
}

export default LazyVideo;