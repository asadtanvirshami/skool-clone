"use client";
import React, { useState } from "react";
import { Button, Layout, Menu, theme as antdTheme } from "antd";
import Header from "./header";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  MenuFoldOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { usePathname } from "next/navigation";

const { Content, Sider } = Layout;

const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { token } = antdTheme.useToken(); // Get theme token
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const isAuthPath = path.startsWith("/auth");

  // Determine theme mode (dark/light)
  const isDarkMode = token.colorBgBase === "#000"; // Example way to check

  return (
    <React.Fragment>
      {isAuthPath && <div>{children}</div>}

      {!isAuthPath && (
        <Layout>
          <Sider
            className={collapsed ? "shadow-md" : "shadow-lg"}
            theme={isDarkMode ? "dark" : "light"} // Apply theme dynamically
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div className="demo-logo-vertical" />
            <Menu
              style={{ border: "none" }}
              theme={isDarkMode ? "dark" : "light"} // Apply theme to menu
              mode="inline"
              defaultSelectedKeys={["4"]}
              items={items}
            />
          </Sider>
          <Layout>
            <Header>
              <Button
                type="text"
                icon={<MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 44,
                  height: 44,
                }}
              />
            </Header>
            <Content className="text-foreground">{children}</Content>
          </Layout>
        </Layout>
      )}
    </React.Fragment>
  );
};

export default MainLayout;
