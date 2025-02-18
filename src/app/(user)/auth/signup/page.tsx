"use client";

import React, { useState } from "react";
import { Button, Card, Input, notification, Upload } from "antd";
import {
  LockOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { userApi } from "@/api/user/user-api";
import Image from "next/image";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  // Handle Image Upload
  const handleUpload = (info: any) => {
    if (info.file != null) {
      setProfileImage(info.file);
    }
  };

  const handleClick = async () => {
    console.log(firstName, profileImage, email, password, lastName);
    setIsLoading(true);

    if (!firstName || !lastName || !email || !password || !profileImage) {
      setIsLoading(false);
      return api.error({
        message: "Error",
        description: "Please fill in all fields and upload an image",
      });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      return api.error({
        message: "Invalid Email",
        description: "Please enter a valid email address",
      });
    }

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileImage", profileImage);

      // API Request
      const response = await userApi.signup(
        firstName,
        lastName,
        email,
        password,
        profileImage
      );
      if (response.status === 200) {
        api.success({
          message: "Sign Up Success",
          description: "Successfully signed up",
        });
      } else {
        setIsLoading(false);
      }
      setTimeout(() => {
        router.push("/auth/signin");
      }, 1500);
    } catch (error: any) {
      api.error({
        message: "Sign Up Failed",
        description: error.response?.data?.message || "An error occurred",
      });
    } finally {
      setIsLoading(false);
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
                <div className="flex justify-center">
                  <Upload
                    listType="picture-circle"
                    maxCount={1}
                    beforeUpload={() => false} // Prevent automatic upload
                    onChange={handleUpload}
                  >
                    {!profileImage && (
                      <button
                        style={{ border: 0, background: "none" }}
                        type="button"
                      >
                        <PlusCircleOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </button>
                    )}
                  </Upload>
                </div>
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
