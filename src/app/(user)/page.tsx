import React from "react";
import HeroSection from "./home/hero-section";
import CommunitySection from "./home/community-section";

export default function Home() {
  return (
    <React.Fragment>
      <HeroSection />
      <div className="w-full min-h-screen pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <CommunitySection/>
      </div>
    </React.Fragment>
  );
}
