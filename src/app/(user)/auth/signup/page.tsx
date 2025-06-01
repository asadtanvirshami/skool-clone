"use client";

import React, { useState } from "react";
import { Button, Card, Input, notification, Upload } from "antd";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import {
  LockOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignup } from "@/app/hooks/use-signin";
import { AxiosError } from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const router = useRouter();

  const { mutate: signup, isPending } = useSignup();

  const [api, contextHolder] = notification.useNotification();

  const handleUpload = (info: UploadChangeParam<UploadFile>) => {
    if (info.file && info.file.originFileObj) {
      setProfileImage(info.file.originFileObj);
    } else {
      setProfileImage(null);
    }
  };

  const handleClick = async () => {
    if (!firstName || !lastName || !email || !password || !profileImage) {
      return api.error({
        style: { background: "red", color: "white", accentColor: "white" },
        message: "Validation Error",
        description: "Please fill in all fields and upload a profile image.",
      });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return api.error({
        message: "Invalid Email",
        description: "Please enter a valid email address.",
      });
    }

    signup(
      {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
        profileImage,
      },
      {
        onSuccess: (data) => {
          api.success({
            message: "Sign Up Success",
            description:
              data.message || "Your account has been created successfully!",
          });
          setTimeout(() => {
            router.push("/auth/signin");
          }, 1500);
        },
        onError: (error: AxiosError) => {
          const errorMessage =
            (error.response?.data as { message?: string })?.message ||
            error.message ||
            "An unexpected error occurred during sign up.";

          api.error({
            message: "Sign Up Failed",
            description: errorMessage,
          });
          console.error("Signup error:", error);
        },
      }
    );
  };

  return (
    <>
      {contextHolder}

      <div
        data-cy="main-grid"
        className="grid items-center justify-center h-screen w-full"
      >
        <div className="lg:grid bg-gradient-to-r lg:grid-cols-2 xl:grid xl:grid-cols-3 md:grid grid-cols-2 w-screen">
          <div className="hidden sm:flex h-screen align-middle justify-center items-center xl:col-span-2">
            <div className="justify-center align-middle items-center font-[family-name:var(--font-gantari)]">
              <h1 className="mx-auto text-[13rem] font-semibold text-white">
                BuildYou
              </h1>
              <div className="w-full flex justify-center">
                <small className="text-xl text-white ">
                  Excel at every stage &amp; build the life
                </small>
              </div>
            </div>
          </div>
          <div className="flex h-screen align-middle justify-center items-center border-silver-500 shadow-lg">
            <Card className="justify-center align-middle space-y-4">
              <h1 className="text-4xl font-bold font-[family-name:var(--font-gantari)]">
                Sign Up
              </h1>
              <form className="space-y-4 w-[400px] mt-8 font-[family-name:var(--font-gantari)]">
                <div className="flex justify-center">
                  <Upload
                    listType="picture-circle"
                    maxCount={1}
                    beforeUpload={() => false}
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
                  <label htmlFor="firstName" className="block font-medium">
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
                  <label htmlFor="lastName" className="block font-medium">
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
                  <label htmlFor="email" className="block font-medium">
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
                  <label htmlFor="password" className="block font-medium">
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
              <div className="flex justify-between items-center font-[family-name:var(--font-gantari)]">
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
                  loading={isPending}
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
