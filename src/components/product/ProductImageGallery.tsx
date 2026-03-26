import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageZoom from "./ImageZoom";
import { allProducts } from "@/data/products";
import pantheonImage from "@/assets/pantheon.jpg";
import eclipseImage from "@/assets/eclipse.jpg";
import haloImage from "@/assets/halo.jpg";
import organicEarring from "@/assets/organic-earring.png";
import linkBracelet from "@/assets/link-bracelet.png";

const sampleImages = [
  pantheonImage,
  organicEarring,
  eclipseImage,
  haloImage,
];

const ProductImageGallery = () => {
  const { productId } = useParams();
  const product = allProducts.find(p => p.id === productId);
  
  // Always use 4 sample images for every product
  const productImages = sampleImages;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomInitialIndex, setZoomInitialIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleImageClick = (index: number) => {
    setZoomInitialIndex(index);
    setIsZoomOpen(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const difference = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(difference) > minSwipeDistance) {
      if (difference > 0) {
        // Swipe left - next image
        nextImage();
      } else {
        // Swipe right - previous image
        prevImage();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full">
      {/* Carousel Gallery - All Screen Sizes */}
      <div className="relative">
        {/* Main Image Display */}
        <div 
          className="w-full aspect-square overflow-hidden cursor-pointer group touch-pan-y relative"
          onClick={() => handleImageClick(currentImageIndex)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={productImages[currentImageIndex]}
            alt={`Product view ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
        
        {/* Thumbnail Strip */}
        <div className="flex justify-center mt-4 gap-2 overflow-x-auto px-4">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden transition-all border-2 ${
                index === currentImageIndex 
                  ? 'border-foreground' 
                  : 'border-transparent hover:border-muted'
              }`}
            >
              <img
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Image Zoom Modal */}
      <ImageZoom
        images={productImages}
        initialIndex={zoomInitialIndex}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
      />
    </div>
  );
};

export default ProductImageGallery;
