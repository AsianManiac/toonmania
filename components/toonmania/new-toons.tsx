'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { homeDateToon } from "@/data/home-webtoon";
import Datetoons from "./date-toons";
import Image from "next/image";

const slide = [
    {
        slider: "/hero-slider/6Our_Walk_Home.png",
    },
    {
        slider: "/hero-slider/4_GIF_SchoolBusGraveYard_091123_PC.gif",
    },
    {
        slider: "/hero-slider/6Retired-Demon-King_Banner_Launch_A_Desktop.png",
    },
]

const NewToons = () => {
    return ( 
        <div className="w-full border-b-[1px] border-gray-300/70 pb-6">
            <div className="flex justify-center flex-col space-x-2 items-center py-7">
                <div>
                    <p className="font-semibold text-xl pb-8">New TOONS</p>
                </div>
                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={ 'auto' }
                >
                    {slide.map((slide, i) => (
                        <SwiperSlide
                            key={i}
                        >
                            <Image
                                src={slide.slider}
                                alt="slide"
                                fill
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="grid lg:grid-cols-5 grid-cols-3 gap-2">
                    {homeDateToon.slice(51, 56).map((toons, index) => (
                        <Datetoons
                            key={index}
                            image={toons.image}
                            title={toons.title}
                            genre={toons.genre}
                            author={toons.author}
                            likes={toons.likes}
                            longSummary={toons.longSummary}
                            shortSummary={toons.shortSummary}
                        />
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default NewToons;