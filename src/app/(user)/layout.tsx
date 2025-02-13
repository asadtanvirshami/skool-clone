"use client";

import React from "react";
import { App, ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import MainLayout from "@/components/ui/main-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#00b96b",
              borderRadius: 2,

              // Alias Token
              colorBgContainer: "#ffff",
            },
          }}
        >
          <MainLayout>{children}</MainLayout>
        </ConfigProvider>
      </AntdRegistry>
    </App>
  );
}
