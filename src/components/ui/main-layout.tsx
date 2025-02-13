"use client";
import React from "react";
import { Layout, theme } from "antd";
import Header from "./header";
import { usePathname } from "next/navigation";

const { Content, Footer } = Layout;

const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
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
        <Layout>
          <Header />
          <Content>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            CommunityYou ©{new Date().getFullYear()} Created by ALGORIM
          </Footer>
        </Layout>
      )}
    </React.Fragment>
  );
};

export default MainLayout;
