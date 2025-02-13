"use client";

import React from "react";
import { Button, Card, Input, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

const SignUp = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const handleClick = async () => {
    setIsLoading(true);

    if (!firstName || !lastName || !email || !password) {
      setIsLoading(false);
      return api.error({
        message: "Error",
        description: "Please fill in all fields",
      });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      return api.error({
        message: "Invalid email",
        description: "Please enter a valid email",
      });
    }
  };

  return (
    <>
      {contextHolder}

      <div
        data-cy="main-grid"
        className="grid items-center justify-center h-screen w-full"
      >
        <div className="lg:grid bg-gradient-to-r lg:grid-cols-2 xl:grid xl:grid-cols-3 md:grid grid-cols-2 w-screen">
          <div className="hidden sm:flex h-screen align-middle bg-green-300 justify-center items-center xl:col-span-2">
            <div className="justify-center align-middle items-center">
              <h1 className="mx-auto text-[13rem] font-semibold text-white">
                CYOU
              </h1>
              <div className="w-full flex justify-center">
                <small className="text-xl text-white">
                  Community You! You can build to support your community.
                </small>
              </div>
            </div>
          </div>
          <div className="flex h-screen align-middle justify-center items-center border-silver-500 shadow-lg">
            <Card className="justify-center align-middle space-y-4">
              <h1 className="text-4xl font-bold">Sign Up</h1>
              <form className="space-y-4 w-[400px] mt-8">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 font-medium"
                  >
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    size="large"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 font-medium"
                  >
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    size="large"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    size="large"
                    placeholder="xyz@gmail.com"
                    prefix={<UserOutlined />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    size="large"
                    type="password"
                    placeholder="******"
                    prefix={<LockOutlined />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </form>
              <div className="flex justify-between items-center">
                <p>
                  If you have an account
                  <Link href="/auth/signin"> signin here</Link>
                </p>

                <Button
                  size="large"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                  loading={isLoading}
                  className="border bg-red-400 p-2 mt-4 rounded-lg"
                >
                  Sign Up
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
