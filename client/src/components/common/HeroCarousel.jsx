import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import img1 from "../../assets/heroImages/1.avif";
import img2 from "../../assets/heroImages/2.webp";
import img3 from "../../assets/heroImages/3.jpg";
import img4 from "../../assets/heroImages/4.jpg";
import "swiper/css";

const images = [
    img1,
    img2,
    img3,
    img4,
    img1,
    img2,
    img3,
    img4,
];

export default function HeroCarousel() {
    return (
        <div className="w-full ">
            <Swiper
                modules={[Autoplay]}
                slidesPerView={3}
                centeredSlides
                loop
                spaceBetween={-50}
                autoplay={{
                    delay: 2000,
                    // disableOnInteraction: false
                }}
                className="heroSwiper"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <div
                                className={`transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl
                  ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-50"}
                `}
                            >
                                <img
                                    src={img}
                                    alt="HP Fashion collection"
                                    className="w-full h-[560px] object-cover"
                                />
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
