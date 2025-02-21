"use client";
import React from "react";
import {
  Button,
  Flex,
  Card,
  Typography,
  Input,
  notification,
  Form,
} from "antd";
import type { GetProps } from "antd";
import { useRouter } from "next/navigation";
import { userApi } from "@/api/user/user-api";
const { Title } = Typography;

const SignIn = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: any) => {
    console.log("hit");

    setIsLoading(true);
    if (values.email === "") {
      setIsLoading(false);
      return api.error({
        message: "Error",
        description: "Please enter email",
      });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(values.email)) {
      setIsLoading(false);
      return api.error({
        message: "Invalid email",
        description: "Please enter a valid email",
      });
    }
    router.push("/auth/otp");

    try {
      const response = (await userApi.account_recovery(values.email)).data;
      setIsLoading(false);
      if (response?.success === true) {
        api.success({
          message: "Success",
          description: response?.message,
        });
        router.push(`/auth/otp/${response?.userId}`);
      } else {
        api.error({
          message: "Error",
          description: response?.message,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      return api.error({
        message: "Error",
        description: "Please try again",
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
              <h1 className="mx-auto text-[13rem] font-semibold font-[family-name:var(--font-geist-sans)] text-white">
                CYOU
              </h1>
              <div className="w-full flex justify-center">
                <small className="text-xl text-white">
                  Community You! You can build to support your community.
                </small>
              </div>
            </div>
          </div>
          <div className="flex h-screen align-middle justify-center font-[family-name:var(--font-redhat)] items-center border-silver-500 shadow-lg">
            <Card className="justify-center align-middle space-y-4 ">
              <div>
                <Title className="text-xl font-bold">Account Recovery</Title>
                <p>Please enter your email address to recover your account.</p>
              </div>
              <Form name="login" onFinish={onFinish}>
                <div className="mt-8">
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="xyz@gmail.com"
                      type="email"
                    />
                  </Form.Item>
                </div>
                <div className="text-center mt-8">
                  <p>
                    If your account exists so you will you will recieve OTP on
                    you email.
                  </p>
                </div>
                <div className="mt-8 justify-end flex">
                  <Button
                    disabled={isLoading}
                    size="large"
                    block
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
