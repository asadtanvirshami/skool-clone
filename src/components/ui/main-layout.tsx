"use client";
import React from "react";
import { Layout, Menu, theme } from "antd";
import Header from "./header";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { usePathname } from "next/navigation";

const { Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

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
  const {} = theme.useToken();
  const path = usePathname();

  const isAuthPath = path.startsWith("/auth");
  return (
    <React.Fragment>
      {isAuthPath && <div>{children}</div>}

      {!isAuthPath && (
        <Layout hasSider>
          <Layout>
            <Sider style={siderStyle}>
              <div className="demo-logo-vertical" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={items}
              />
            </Sider>
            <Header />
            <Content className="text-foreground">{children}</Content>
            <Footer style={{ textAlign: "center" }}>
              CommunityYou ©{new Date().getFullYear()} Created by ALGORIM
            </Footer>
          </Layout>
        </Layout>
      )}
    </React.Fragment>
  );
};

export default MainLayout;
