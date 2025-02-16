"use client";

import React from "react";
import { App, ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import MainLayout from "@/components/ui/main-layout";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <AntdRegistry>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
        >
          <ConfigProvider
            theme={{
              token: {
                // Seed Token
                colorPrimary: "#00b96b",
                borderRadius: 8,

                // Alias Token
                colorBgContainer: "#ffff",
              },
            }}
          >
            <MainLayout>{children}</MainLayout>
          </ConfigProvider>
        </GoogleOAuthProvider>
      </AntdRegistry>
    </App>
  );
}
