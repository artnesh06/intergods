import { useState } from 'react';

interface GalleryItemProps {
  item: string;
  index: number;
  isActive: boolean;
  onClick: Function;
}

const GalleryItem = ({ item, index, isActive, onClick }: GalleryItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Set to true to hide loading state
  };

  return (
    <div
      key={`${item}-${index}`}
      onClick={() => onClick(index)}
      className={`relative h-32 w-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-110 ${
        isActive ? 'scale-105 ring-4 ring-cyan-400' : ''
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Loading/Default Image */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-200">
          <img
            src="/images/hat-wizard.png"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={`/images/wizards/${item}`}
        alt={`Wizard ${index + 1}`}
        className={`h-full w-full object-cover transition-all duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      {/* Error State */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <svg
              className="mb-2 h-8 w-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs text-red-500">Failed to load</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryItem;
