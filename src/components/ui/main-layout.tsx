"use client";
import React, { useState } from "react";
import { Button, Layout, Menu, theme as antdTheme } from "antd";
import {
  UserRound,
  NotebookText,
  ListTodo,
  CalendarDays,
  BookDashed,
  Award,
  StickyNote,
  Goal,
  Rocket,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import Header from "./header";

import type { MenuProps } from "antd";
import { usePathname } from "next/navigation";

const { Content, Sider } = Layout;

const menuItems: { key: string; icon: any; label: string }[] = [
  { key: "1", icon: UserRound, label: "Profile" },
  { key: "2", icon: NotebookText, label: "Notes" },
  { key: "3", icon: ListTodo, label: "Tasks" },
  { key: "4", icon: CalendarDays, label: "Calendar" },
  { key: "5", icon: BookDashed, label: "Library" },
  { key: "6", icon: Award, label: "Achievements" },
  { key: "7", icon: StickyNote, label: "Sticky Notes" },
  { key: "8", icon: Goal, label: "Goal" },
  { key: "9", icon: Rocket, label: "Skills" },
];

const items: MenuProps["items"] = menuItems.map(({ key, icon, label }) => ({
  key,
  icon: (
    <span className="flex items-center justify-center text-sm">
      {React.createElement(icon, { size: 18 })}
    </span>
  ),
  label,
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
                icon={collapsed ? <ChevronsRight /> : <ChevronsLeft />}
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
