import { Avatar, Button, Space } from "antd";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";



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
  const { user } = useSelector(
    (state: {
      user: { user: { picture: string; firstName: string; lastName: string } };
    }) => state.user
  );

  return (
    <Avatar
      alt="avatar"
      className={!user?.picture ? "!bg-red-800" : ""}
      src={user?.picture}
      shape="circle"
      size="default"
    >
      {!user?.picture && user?.firstName[0]}
    </Avatar>
  );
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="p-1 h-12 items-center flex justify-between shadow-md">
        {children}
        <Space>
          <Space>
            <AvatarButton />
            {/* <UserInfo /> */}
            <LoginButton />
          </Space>
        </Space>
      </div>
    </>
  );
};

export default Header;
