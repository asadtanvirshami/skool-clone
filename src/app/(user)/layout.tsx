// Layout.jsx
"use client";

import React, { useEffect, useState } from "react";
import { App, ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import MainLayout from "@/components/ui/main-layout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactQueryClientProvider from "@/provider/react-query/react-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "light";
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <App>
      <AntdRegistry>
        <ReactQueryClientProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
          >
            <ConfigProvider
              theme={{
                
                token: {
                  colorBgLayout: "var(--background)",
                  colorPrimary: "var(--foreground)",
                  borderRadius: 8,
                  colorBgContainer: "var(--background)",
                  colorText: "var(--foreground)",
                  colorBgElevated:"#fff"
                  
                },
              }}
            >
              <MainLayout>{children}</MainLayout>
            </ConfigProvider>
          </GoogleOAuthProvider>
        </ReactQueryClientProvider>
      </AntdRegistry>
    </App>
  );
}
