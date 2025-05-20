import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { userApi } from "@/api/user/user-api";
import PersonalInfo from "../widgets/personal-info/info";
import { cookies } from "next/headers";

async function page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const token = (await cookieStore).get("token");

  if (!token) {
    return redirect("/auth/signin");
  }

  const userId = params.id;

  try {
    await queryClient.prefetchQuery({
      queryKey: ["user", userId],
      queryFn: async () => {
        const data = await userApi.findOne(userId);
        if (!data) throw new Error("User not found");
        return data;
      },
    });
  } catch (err) {
    console.error("Prefetch user failed:", err);
    return <div className="text-red-600 text-center mt-10">Failed to load user data. Please try again later.</div>;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PersonalInfo user_id={userId} />
    </HydrationBoundary>
  );
}

export default page;
