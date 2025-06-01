"use client";

import React, { useEffect } from "react";
import { App, ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import MainLayout from "@/components/ui/main-layout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactQueryClientProvider from "@/provider/react-query/react-provider";
import "@ant-design/v5-patch-for-react-19";
import StoreProvider from "@/redux/storeProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const [theme, setTheme] = useState("light");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    // setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "dark";
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);
  //   document.documentElement.setAttribute("data-theme", newTheme);
  // };
  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string);

  return (
    <App>
      <AntdRegistry>
        <ReactQueryClientProvider>
          <ConfigProvider
            theme={{
              token: {
                colorBgLayout: "var(--background)",
                colorPrimary: "var(--foreground)",
                borderRadius: 8,
                colorBgContainer: "var(--background)",
                colorText: "var(--foreground)",
                colorBgElevated: "#fff",
              },
              components: {
                Button: {
                  defaultHoverBg: "var(--components)",
                  colorText: "var(--foreground)",
                },
                Dropdown: {
                  colorBgElevated: "var(--components)",
                },
                Popover: {
                  colorBgElevated: "var(--components)",
                },
                Table: {
                  colorBgElevated: "var(--components)",
                  colorText: "var(--foreground)",
                  colorTextHeading: "var(--foreground)",
                  headerBg: "var(--components)",
                  colorBgContainer: "var(--components)",
                  rowHoverBg: "var(--components)",
                  colorBgTextHover: "var(--components)",
                },
                Pagination: {
                  colorPrimary: "var(--foreground)",
                },
                Input: {
                  colorTextDisabled: "var(--muted)",
                  colorBgSolidHover: "var(--foreground)",
                  colorBorder: "var(--components)",
                  hoverBorderColor: "var(--components)",
                  colorTextPlaceholder: "var(--muted)",
                },
                Select: {
                  colorTextDisabled: "var(--muted)",
                  colorBgSolidHover: "var(--foreground)",
                  colorBorder: "var(--components)",
                  hoverBorderColor: "var(--components)",
                  colorTextPlaceholder: "var(--muted)",
                  colorBgElevated: "var(--components)",
                },
              },
            }}
          >
            <StoreProvider>
              <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
              >
                <MainLayout>{children}</MainLayout>
              </GoogleOAuthProvider>
            </StoreProvider>
          </ConfigProvider>
        </ReactQueryClientProvider>
      </AntdRegistry>
    </App>
  );
}
