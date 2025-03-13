import { Button, Space } from "antd";
import React from "react";
import { CompassOutlined } from "@ant-design/icons"
import Link from "next/link";

const DiscoverButton = () => {
  return (
    <Button
      variant="solid"
      shape="round"
      iconPosition="end"
      icon={<CompassOutlined />}
    >
      Discover
    </Button>
  );
};

const LoginButton = () => {
  return (
    <Button shape="round">
      <Link href={"/auth/signup"}>LOGIN</Link>
    </Button>
  );
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="p-1 h-12 items-center flex justify-between shadow-md">
        {children}
        <Space>
          <Space>
            <DiscoverButton />
            <LoginButton />
          </Space>
        </Space>
      </div>
    </>
  );
};

export default Header;
