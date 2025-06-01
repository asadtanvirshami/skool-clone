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
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store"; // adjust this import

import Header from "./header";

const { Content, Sider } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { token } = antdTheme.useToken();
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const isAuthPath = path.startsWith("/auth");
  const isProtectedRoute = path.startsWith("/protected-route/");

  const user = useSelector((state: RootState) => state.user.user);
  const isDarkMode = token.colorBgBase === "#000";

  const menuItems = [
    {
      key: "1",
      icon: UserRound,
      label: "Profile",
      route: `/protected-route/profile/${user?.sub ?? ""}`,
    },
    {
      key: "2",
      icon: NotebookText,
      label: "Notes",
      route: `/protected-route/notes/${user?.id ?? ""}`,
    },
    {
      key: "3",
      icon: ListTodo,
      label: "Tasks",
      route: `/protected-route/tasks/${user?.id ?? ""}`,
    },
    {
      key: "4",
      icon: CalendarDays,
      label: "Calendar",
      route: `/protected-route/calendar/${user?.id ?? ""}`,
    },
    {
      key: "5",
      icon: BookDashed,
      label: "Library",
      route: `/protected-route/library/${user?.id ?? ""}`,
    },
    {
      key: "6",
      icon: Award,
      label: "Achievements",
      route: `/protected-route/achievements/${user?.id ?? ""}`,
    },
    {
      key: "7",
      icon: StickyNote,
      label: "Sticky Notes",
      route: `/protected-route/sticky-notes/${user?.id ?? ""}`,
    },
    {
      key: "8",
      icon: Goal,
      label: "Goal",
      route: `/protected-route/goals/${user?.id ?? ""}`,
    },
    {
      key: "9",
      icon: Rocket,
      label: "Skills",
      route: `/protected-route/skills/${user?.id ?? ""}`,
    },
  ];

  const items = menuItems.map(({ key, icon, label, route }) => ({
    key,
    icon: (
      <Link href={route} className="flex items-center justify-center text-sm">
        {React.createElement(icon, { size: 18 })}
      </Link>
    ),
    label,
  }));

  return (
    <React.Fragment>
      {isAuthPath && <div>{children}</div>}

      {!isAuthPath && (
        <Layout>
          <Sider
            className={collapsed ? "shadow-md" : "shadow-lg"}
            theme={isDarkMode ? "dark" : "light"}
            trigger={null}
            collapsedWidth={50}
            collapsible
            collapsed={collapsed}
          >
            <Menu
              style={{ border: "none" }}
              theme={isDarkMode ? "dark" : "light"}
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={items}
            />
          </Sider>
          <Layout>
            {!isProtectedRoute && (
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
            )}
            <Content className="text-foreground">{children}</Content>
          </Layout>
        </Layout>
      )}
    </React.Fragment>
  );
};

export default MainLayout;
