import React, { useEffect, useRef, useState } from "react";

export default function VideoCarousel({ videos = [] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const videoRefs = useRef([]);
  const progressRef = useRef(null);
  const rafRef = useRef(null);

  const n = videos.length;

  const next = () => setCurrent((c) => (c + 1) % n);
  // const prev = () => setCurrent((c) => (c - 1 + n) % n);

  // ---------- Progress Bar ----------
  const startProgress = (video) => {
    cancelAnimationFrame(rafRef.current);

    const update = () => {
      if (!video || video.paused || !video.duration) return;

      const progress = video.currentTime / video.duration;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      rafRef.current = requestAnimationFrame(update);
    };

    update();
  };

  const stopProgress = () => {
    cancelAnimationFrame(rafRef.current);
    if (progressRef.current) {
      progressRef.current.style.transform = "scaleX(0)";
    }
  };

  // ---------- Relative position (same as image carousel) ----------
  const rel = (i) => {
    let diff = i - current;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  };

  // ---------- Play only center video ----------
  useEffect(() => {
    stopProgress();

    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      if (i === current && !paused) {
        video.currentTime = 0;
        video.play().catch(() => {});
        startProgress(video);
      } else {
        video.pause();
      }
    });
  }, [current, paused]);

  // ---------- Auto next when video ends ----------
  const handleEnded = () => {
    next();
  };

  // ---------- SAME STACK STYLES AS IMAGE ----------
  const slotClasses = (diff) => {
    const base =
      "absolute top-0 left-1/2 w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] md:w-[360px] md:h-[540px] lg:w-[400px] lg:h-[600px] " +
      "-ml-[140px] sm:-ml-[160px] md:-ml-[180px] lg:-ml-[200px] " +
      "rounded-2xl shadow-2xl overflow-hidden select-none " +
      "transition-transform duration-500 ease-out transform-gpu";

    switch (diff) {
      case -3:
        return `${base} z-[5] scale-50 -translate-x-[450px] `;
      case -2:
        return `${base} z-[10] scale-75 -translate-x-[300px] `;
      case -1:
        return `${base} z-[20] scale-90 -translate-x-[150px] `;
      case 0:
        return `${base} z-[30] scale-100`;
      case 1:
        return `${base} z-[20] scale-90 translate-x-[150px] `;
      case 2:
        return `${base} z-[10] scale-75 translate-x-[300px] `;
      case 3:
        return `${base} z-[5] scale-50 translate-x-[450px] `;
      default:
        return `${base} opacity-0 pointer-events-none`;
    }
  };

  if (n === 0) return null;

  return (
    <div className="w-full flex items-center px-4 overflow-x-hidden">
      <div
        className="relative mx-auto h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px] w-full max-w-[1800px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {videos.map((src, i) => {
          const diff = rel(i);
          const isActive = diff === 0;

          return (
            <div
              key={i}
              className={`${slotClasses(diff)} cursor-pointer`}
              onClick={() => setCurrent(i)}
            >
              {/* Video */}
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={src}
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                onEnded={handleEnded}
              />

              {/* Progress bar (ACTIVE ONLY) */}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/30">
                  <div
                    ref={progressRef}
                    className="h-full bg-white origin-left transform scale-x-0"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
