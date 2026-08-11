"use client";

import { useState, useRef, TouchEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X, Package } from "lucide-react";
import { formatImageUrl } from "@/lib/product-utils";

interface ProductImageGalleryProps {
  images?: string[];
  productName: string;
}

export default function ProductImageGallery({
  images = [],
  productName,
}: ProductImageGalleryProps) {
  const formattedImages = images.map(formatImageUrl).filter(Boolean);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  // Touch Swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalImages = formattedImages.length;
  const currentImage = formattedImages[selectedIndex] || "";

  const handlePrev = () => {
    if (totalImages <= 1) return;
    setSelectedIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = () => {
    if (totalImages <= 1) return;
    setSelectedIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // px threshold

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Image
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev Image
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleImgError = (idx: number) => {
    setImgErrors((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Container */}
      <div
        className="relative bg-slate-50 rounded-2xl aspect-square flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden group select-none cursor-pointer"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5" />

        {currentImage && !imgErrors[selectedIndex] ? (
          <Image
            src={currentImage}
            alt={`${productName} image ${selectedIndex + 1}`}
            fill
            unoptimized
            priority
            className="object-contain p-4 transition-all duration-300 group-hover:scale-105"
            onClick={() => setIsLightboxOpen(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
            <Package size={80} />
            <span className="text-xs">No image available</span>
          </div>
        )}

        {/* Fullscreen icon */}
        {currentImage && !imgErrors[selectedIndex] && (
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-700 hover:text-orange-600 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            title="View Fullscreen"
          >
            <Maximize2 size={16} />
          </button>
        )}

        {/* Navigation Arrows */}
        {totalImages > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-800 hover:bg-orange-500 hover:text-white transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-800 hover:bg-orange-500 hover:text-white transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Counter Badge */}
        {totalImages > 1 && (
          <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-medium text-white shadow-sm">
            {selectedIndex + 1} / {totalImages}
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {totalImages > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
          {formattedImages.map((img, index) => (
            <button
              key={`${img}-${index}`}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                selectedIndex === index
                  ? "border-orange-500 ring-2 ring-orange-500/30 opacity-100 shadow-sm"
                  : "border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400"
              }`}
            >
              {!imgErrors[index] ? (
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  unoptimized
                  onError={() => handleImgError(index)}
                  className="object-contain p-1"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Package size={20} />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && currentImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <Image
              src={currentImage}
              alt={productName}
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          {totalImages > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-orange-500 text-white flex items-center justify-center transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-orange-500 text-white flex items-center justify-center transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
