import TrendingGenre from "@/components/TrendingGenre";
import DesktopHeroSlider from "@/components/sliders/desktop-hero-slider";
import MobileHeroSlider from "@/components/sliders/mobile-hero-slider";
import HomeDateTabs from "@/components/tabs/home-date-tabs";
import HomeGenre from "@/components/toonmania/home-genre";
import NewToons from "@/components/toonmania/new-toons";

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
