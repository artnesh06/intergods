"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Carousel Component
interface ImageData {
  src: string;
  name: string;
  alt: string;
}

interface CarouselStakeProps {
  images: ImageData[];
  interval?: number; // Optional interval for auto-slide (default: 3000ms)
}

const CarouselStake: React.FC<CarouselStakeProps> = ({ images, interval = 10000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(autoSlide);
  }, [images.length, interval]);

  const getPositionStyle = (index: number) => {
    const relativeIndex =
      (index - currentIndex + images.length) % images.length;

    if (relativeIndex === 0) {
      return "z-30 transform scale-150 translate-x-0 opacity-100";
    } else if (relativeIndex === 1) {
      return "z-20 transform scale-110 translate-x-[80px] md:!translate-x-[125px] opacity-80";
      // } else if (relativeIndex === 2) {
      //   return "z-10 transform scale-95 translate-x-[105px] md:!translate-x-[150px] opacity-60";
    } else if (relativeIndex === images.length - 1) {
      return "z-20 transform scale-110 -translate-x-[80px] md:!-translate-x-[125px] opacity-80";
      // } else if (relativeIndex === images.length - 2) {
      //   return "z-10 transform scale-95  -translate-x-[105px] md:!-translate-x-[150px] opacity-60";
    } else {
      return "hidden";
    }
  };

  const getOrdinal = (number: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = number % 100; // Handle numbers like 11, 12, 13
    const suffix =
      value >= 11 && value <= 13
        ? "th"
        : suffixes[Math.min(value % 10, 4)] || "th";
    return `${number}${suffix}`;
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-[220px] md:h-[325px] overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`absolute transition-all duration-700 ease-in-out ${getPositionStyle(
                index
              )}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-[125px] h-[125px] md:w-[200px] md:h-[200px] cursor-pointer rounded-[15px] shadow-md hover:scale-105 transition-all duration-200 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselStake;
