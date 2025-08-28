"use client";
import "../app/globals.css";
import { useEffect,useState } from 'react'
import type { SystemMode } from '@core/types'
import Navbar from "@/@layouts/components/landing-page/Navbar";
import Footer from "@/@layouts/components/landing-page/Footer";
import FAQ from "@/@layouts/components/landing-page/FAQ";
import Banner from "@/@layouts/components/landing-page/Banner";
import Testimonials from "@/@layouts/components/landing-page/Testimonials";
import BlogSlider from "@/@layouts/components/landing-page/BlogsSlider";
import ServicesSlider from "@/@layouts/components/landing-page/ServicesSlider";
import DualBanner from "@/@layouts/components/landing-page/DualBanner";
import PartnersSection from "@/@layouts/components/landing-page/PartnersSection";
import TrustedSection from "@/@layouts/components/landing-page/TrustedSection";
import WhyChooseUs from "@/@layouts/components/landing-page/WhyChooseUs";
import { useSettings } from '@core/hooks/useSettings'
import StockGrowthIntro from "@/@layouts/components/landing-page/StockGrowthIntro";
const Home = ({ mode }: { mode: SystemMode }) => {
  // Hooks
  const { updatePageSettings } = useSettings()

  // For Page specific settings
  useEffect(() => {
    return updatePageSettings({
      skin: 'default'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    <div className=" text-black -mt-3 bg-white rounded-xs -mb-9 ">
      {/* <StockGrowthIntro/> */}
      <Navbar />

      <Banner />

      <ServicesSlider />
      <div className="flex items-center w-[95%] mx-auto my-6">
        {/* Left bar */}
        <span className="hidden sm:block text-xl text-[#009883]">|</span>

        {/* Divider line */}
        <span className="flex-1 border-t border-[#009883] mx-2"></span>

        {/* Right bar */}
        <span className="hidden sm:block text-xl text-[#009883]">|</span>
      </div>

      <DualBanner />
      <PartnersSection />
      <WhyChooseUs />
      <Testimonials />
      <BlogSlider />
      <FAQ />
      <TrustedSection />
      <Footer />
    </div>
  );
}

export default Home
