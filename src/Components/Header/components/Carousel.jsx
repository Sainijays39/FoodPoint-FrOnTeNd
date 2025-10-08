import React, { useState, useEffect } from "react";


export default function SimpleCarousel() {
  const images = [
    { src: "/images/hero-image-1.jpg", alt: "Burger" },
    { src: "/images/hero-images2.jpg", alt: "Pizza" },
    { src: "/images/header.webp", alt: "Pasta" },
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  // Auto play every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 3000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded-full"
        onClick={prev}
      >
        &lt;
      </button>

      <img
        src={images[index].src}
        alt={images[index].alt}
        className="w-full h-full object-cover"

      />

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded-full"
        onClick={next}
      >
        &gt;
      </button>
    </div>
  );
}
