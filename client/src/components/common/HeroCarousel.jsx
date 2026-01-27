import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

export default function HeroCarousel({ images }) {
    return (
        <div className="w-full relative px-4 md:px-8 lg:px-12">
            <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                loop={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
                className="heroSwiper !pb-14 !pt-4"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index} className="!w-auto max-w-[400px]">
                        {({ isActive, isPrev, isNext }) => {
                            // Calculate z-index based on position
                            let zIndex = 10;
                            if (isActive) zIndex = 50;
                            else if (isPrev || isNext) zIndex = 40;
                            
                            return (
                                <div
                                    className={`relative transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl group
                                        ${isActive 
                                            ? "scale-100 opacity-100" 
                                            : isPrev || isNext
                                            ? "scale-100 opacity-100"
                                            : "scale-100 opacity-100"
                                        }
                                    `}
                                    style={{
                                        zIndex: zIndex,
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`Fashion collection ${index + 1}`}
                                        className="w-full h-[560px] object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading={index < 3 ? "eager" : "lazy"}
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>
                            );
                        }}
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
                .heroSwiper .swiper-slide {
                    transition: all 0.5s ease;
                }
                
                .heroSwiper .swiper-slide-active {
                    z-index: 50 !important;
                }
                
                .heroSwiper .swiper-slide-prev,
                .heroSwiper .swiper-slide-next {
                    z-index: 40 !important;
                }
                
                .heroSwiper .swiper-slide-prev ~ .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next),
                .heroSwiper .swiper-slide-next ~ .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
                    z-index: 30 !important;
                }
                
                .heroSwiper .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
                    z-index: 20 !important;
                }

                .heroSwiper .swiper-button-next,
                .heroSwiper .swiper-button-prev {
                    color: #fff;
                    background: rgba(0, 0, 0, 0.5);
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    z-index: 60;
                }

                .heroSwiper .swiper-button-next:hover,
                .heroSwiper .swiper-button-prev:hover {
                    background: rgba(0, 0, 0, 0.8);
                    transform: scale(1.1);
                }

                .heroSwiper .swiper-button-next::after,
                .heroSwiper .swiper-button-prev::after {
                    font-size: 20px;
                }

            `}</style>
        </div>
    );
}