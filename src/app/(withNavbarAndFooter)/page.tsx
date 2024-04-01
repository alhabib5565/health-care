import HeroSection from "@/components/ui/HomePage/HeroSection/HeroSection";
import HowItWorks from "@/components/ui/HomePage/HowItWorks/HowItWorks";
import Specialist from "@/components/ui/HomePage/Specialist/Specialist";
import TopRatedDoctors from "@/components/ui/HomePage/TopRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/ui/HomePage/WhyUs/WhyUs";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Specialist />
      <TopRatedDoctors />
      <WhyUs />
      <HowItWorks />
    </div>
  );
};

export default HomePage;
