import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Dashboard from "./protected-route/dashboard/dashboard";

const queryClient = new QueryClient();

async function prefetchData() {
  // await queryClient.prefetchQuery({
  //   queryKey: ["categories"],
  //   queryFn: async () => {
  //     const response = await categoryApi.get();
  //     return response.data; // Ensure correct response structure
  //   },
  // });
  // await queryClient.prefetchQuery({
  //   queryKey: ["communities"],
  //   queryFn: async () => {
  //     const response = await communityApi.get();
  //     return response.data; // Ensure correct response structure
  //   },
  // });
}

async function Home() {
  await prefetchData(); // Call prefetch function outside the component

  return (
    <div className="w-full h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <React.Fragment>
          <Dashboard/>
        </React.Fragment>
      </HydrationBoundary>
    </div>
  );
}

export default Home;
