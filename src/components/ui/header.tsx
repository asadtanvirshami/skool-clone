import { Button, Space } from "antd";
import React from "react";
import { CompassOutlined, GroupOutlined } from "@ant-design/icons";
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

const BrandLogo = () => {
  return <h1 className="font-semibold text-xl">BuildYou</h1>;
};

const CreateButton = () => {
  return (
    <Button
      variant="dashed"
      color="blue"
      shape="round"
      iconPosition="end"
      icon={<GroupOutlined />}
    >
      Create Community
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

const Header = () => {
  return (
    <>
      <div className="bg-white p-2 flex justify-evenly border-b-1 border-b-gray-300">
        <Space>
          <BrandLogo />
        </Space>
        <Space>
          <DiscoverButton />
          <CreateButton />
          <LoginButton />
        </Space>
      </div>
    </>
  );
};

export default Header;
