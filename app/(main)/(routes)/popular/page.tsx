"use client";
import { heroSlider } from "@/data/slider";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

import DesktopHeroSlider from "@/components/sliders/desktop-hero-slider";
import MobileHeroSlider from "@/components/sliders/mobile-hero-slider";
import HomeDateTabs from "@/components/tabs/home-date-tabs";
import NewToons from "@/components/toonmania/new-toons";
import HomeGenre from "@/components/toonmania/home-genre";
import TrendingGenre from "@/components/TrendingGenre";

const OriginalsPage = () => {
  return (
    <>
      <DesktopHeroSlider />
      <MobileHeroSlider />

      <HomeDateTabs />
      <NewToons />
      {/* Home Genre */}
      <HomeGenre />
      <TrendingGenre />
    </>
  );
};

export default OriginalsPage;
