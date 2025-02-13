import React from "react";
import {Layout, theme } from "antd";
import Header from "./header";

const { Content, Footer } = Layout;

const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const {} = theme.useToken();

  return (
    <Layout>
      <Header />
      <Content>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        CommunityYou ©{new Date().getFullYear()} Created by ALGORIM
      </Footer>
    </Layout>
  );
};

export default MainLayout;
