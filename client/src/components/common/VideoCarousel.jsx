import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef } from "react";

export default function VideoCarousel({ videos }) {
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  const progressRef = useRef(null);
  const rafRef = useRef(null);
  const initialized = useRef(false);

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

  const playActiveVideo = (swiper) => {
    const video = videoRefs.current[swiper.realIndex];
    if (!video) return;

    setTimeout(() => {
      video.currentTime = 0;
      video.play().catch(() => {});
      startProgress(video);
    }, 50);
  };

  const handleSlideChange = (swiper) => {
    stopProgress();

    videoRefs.current.forEach((v) => {
      if (v && !v.paused) v.pause();
    });

    playActiveVideo(swiper);
  };

  return (
    <div className="w-full">
      <Swiper
        slidesPerView={3}
        centeredSlides
        loop
        spaceBetween={-50}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          if (!initialized.current) {
            initialized.current = true;
            playActiveVideo(swiper);
          }
        }}
        onSlideChange={handleSlideChange}
        className="heroSwiper"
      >
        {videos.map((src, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500
                ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-40"}
              `}
              >
                {/* Video */}
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={src}
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-[560px] object-cover"
                  onEnded={() => {
                    if (isActive && swiperRef.current) {
                      handleSlideChange(swiperRef.current);
                      swiperRef.current.slideNext();
                    }
                  }}
                />

                {/* Smooth Progress Bar (bottom) */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/30">
                    <div
                      ref={progressRef}
                      className="h-full bg-white origin-left transform scale-x-0"
                    />
                  </div>
                )}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
