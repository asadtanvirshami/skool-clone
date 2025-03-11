import { Button, Space } from "antd";
import React from "react";
import { CompassOutlined, GroupOutlined } from "@ant-design/icons";
import moment from "moment";
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

const Date = () => {
  return <h1 className="font-semibold text-xl">{moment().format("dddd MMMM YYYY")}</h1>;
};

const BrandLogo = () => {
  return <h1 className="font-semibold text-xl">BuildYou</h1>;
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
      <div className=" p-2 flex justify-evenly border-b-[0.5px]  border-b-gray-600">
        <Space>
          <BrandLogo />
        </Space>
        <Space>
          <Date />
        </Space>
        <Space>
          <DiscoverButton />
          <LoginButton />
        </Space>
      </div>
    </>
  );
};

export default Header;
