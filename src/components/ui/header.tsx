import { Avatar, Button, Space } from "antd";
import React from "react";
import { CompassOutlined } from "@ant-design/icons";
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
      <Link href={"/auth/signup"} className=" decoration-none">
        LOGIN
      </Link>
    </Button>
  );
};

const AvatarButton = () => {
  return <Avatar shape="circle" size="default"  />;
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="p-1 h-12 items-center flex justify-between shadow-md">
        {children}
        <Space>
          <Space>
            <AvatarButton/>
            <DiscoverButton />
            <LoginButton />
          </Space>
        </Space>
      </div>
    </>
  );
};

export default Header;
