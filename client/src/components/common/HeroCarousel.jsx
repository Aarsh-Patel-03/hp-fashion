import React, { useEffect, useState,useCallback } from "react";

export default function HeroCarousel({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const n = images.length;
  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % n);
  }, [n]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + n) % n);
  }, [n]);

  // Auto-play
  useEffect(() => {
    if (paused || n === 0) return;
    const id = setInterval(next, 2000);
    return () => clearInterval(id);
  }, [paused, n]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Relative position
  const rel = (i) => {
    let diff = i - current;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  };

  // Slot styles - now responsive
  const slotClasses = (diff) => {
    const base =
      "absolute top-0 left-1/2 w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] md:w-[360px] md:h-[540px] lg:w-[400px] lg:h-[600px] " +
      "-ml-[140px] sm:-ml-[160px] md:-ml-[180px] lg:-ml-[200px] " +
      "rounded-xl shadow-xl overflow-hidden select-none " +
      "transition-transform duration-500 ease-out transform-gpu";

    switch (diff) {
      case -3:
        return `${base} z-[5] scale-50 -translate-x-[400px] sm:-translate-x-[288px] md:-translate-x-[324px] lg:-translate-x-[450px] opacity-80`;
      case -2:
        return `${base} z-[10] scale-75 -translate-x-[300px] sm:-translate-x-[192px] md:-translate-x-[216px] lg:-translate-x-[300px] opacity-90`;
      case -1:
        return `${base} z-[20] scale-90 -translate-x-[100px] sm:-translate-x-[96px] md:-translate-x-[108px] lg:-translate-x-[150px] opacity-95`;
      case 0:
        return `${base} z-[30] scale-100`;
      case 1:
        return `${base} z-[20] scale-90 translate-x-[100px] sm:translate-x-[96px] md:translate-x-[108px] lg:translate-x-[150px] opacity-95`;
      case 2:
        return `${base} z-[10] scale-75 translate-x-[300px] sm:translate-x-[192px] md:translate-x-[216px] lg:translate-x-[300px] opacity-90`;
      case 3:
        return `${base} z-[5] scale-50 translate-x-[400px] sm:translate-x-[288px] md:translate-x-[324px] lg:translate-x-[450px] opacity-80`;
      default:
        return `${base} opacity-0 pointer-events-none`;
    }
  };

  if (n === 0) return null;

  return (
    <div className="w-full  flex items-center px-4 overflow-x-hidden">
      <div
        className="relative mx-auto h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px] w-full max-w-[1800px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        {/* Slides */}
        {images.map((src, i) => {
          const diff = rel(i);
          return (
            <div
              key={i}
              className={`${slotClasses(diff)} cursor-pointer`}
              aria-hidden={Math.abs(diff) > 3}
              onClick={() => setCurrent(i)}
            >
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          );
        })}

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[40] flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === current
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
