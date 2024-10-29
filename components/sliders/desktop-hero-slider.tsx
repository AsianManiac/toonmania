"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { heroSlider } from "@/data/slider";

const DesktopHeroSlider = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/home_bg011.jpg')`,
        backgroundSize: "cover",
      }}
      className="hidden lg:block"
    >
      <div className="w-auto h-[400px] justify-center flex items-center">
        <div className="max-w-[770px]">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            className="w-[770px] h-[400px] z-50"
          >
            {heroSlider.map((slide, i) => (
              <SwiperSlide key={i}>
                <div
                  className="w-[770px] h-[400px] z-50"
                  style={{
                    backgroundImage: `url(${slide.slider})`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col -space-y-4">
          <div className="bg-transparent">
            <Image
              alt="Banner"
              src={`/banner/4DesktopMiniBanner_US+28129.png`}
              width={120}
              height={100}
              className="w-[250px] -ml-9"
            />
          </div>
          <div className="">
            <Image
              alt="Banner"
              src={`/banner/5SmallBanner_B_us.png`}
              width={100}
              height={120}
              className="w-[230px] -ml-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeroSlider;
