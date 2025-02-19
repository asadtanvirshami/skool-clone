import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import CommunitySection from "./home/community-section";
import { categoryApi } from "@/api/category/category-api";
import HeroSection from "./home/hero-section";
import { Row } from "antd";

const queryClient = new QueryClient();

async function prefetchData() {
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoryApi.get();
      return response.data; // Ensure correct response structure
    },
  });
}

async function Home() {
  await prefetchData(); // Call prefetch function outside the component

  return (
    <div className="w-full h-full bg-white">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <React.Fragment>
          <HeroSection />
          <Row className="w-full flex justify-center min-h-screen pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <CommunitySection />
          </Row>
        </React.Fragment>
      </HydrationBoundary>
    </div>
  );
}

export default Home;
