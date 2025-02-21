"use client";

import React, { useState, useRef } from "react";
import { Button, Flex, Card, Typography, Input, notification } from "antd";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { userApi } from "@/api/user/user-api";
import useCountdownTimer from "@/functions/timer";

const { Title } = Typography;

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { time, start, stop } = useCountdownTimer();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const params = useParams<{ id: string }>();

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  React.useEffect(() => {
    start();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stop();
    setIsLoading(true);
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setIsLoading(false);
      return api.error({
        message: "Error",
        description: "Please enter a valid 6-digit OTP",
      });
    }
    try {
      const response = await userApi.otp_verification(otpCode);
      setIsLoading(false);

      if (response?.data?.success) {
        Cookies.set("token", response.data.accessToken);
        api.success({ message: "Success", description: response.data.message });
        setTimeout(() => router.push("/home"), 2000);
      } else {
        api.error({
          message: "Error",
          description: response?.data?.message || "Invalid OTP",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      api.error({
        message: "Error",
        description: "Something went wrong. Please try again later.",
      });
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    start();
    try {
      const response = await userApi.resendOtp(params?.id);
      setIsLoading(false);
      console.log(response);

      if (response?.data?.success) {
        api.info({
          message: "OTP Resent",
          description: "A new OTP has been sent to your email.",
        });
      } else {
        api.error({
          message: "Error",
          description: response?.data?.message || "Invalid OTP",
        });
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      api.error({
        message: "Error",
        description: "Something went wrong. Please try again later.",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="grid h-screen w-full items-center justify-center">
        <div className="grid w-screen grid-cols-1 md:grid-cols-2 xl:grid-cols-3 bg-gradient-to-r">
          {/* Left Section (Hidden on Small Screens) */}
          <div className="hidden h-screen items-center justify-center bg-green-300 xl:col-span-2 sm:flex">
            <div className="text-center">
              <h1 className="text-[13rem] font-semibold text-white">CYOU</h1>
              <p className="text-xl text-white">
                Community You! Build to support your community.
              </p>
            </div>
          </div>

          {/* Right Section - OTP Form */}
          <div className="flex h-screen items-center justify-center border-silver-500 shadow-lg">
            <Card className="space-y-6 w-96 p-6">
              <Title level={3} className="text-center">
                OTP Verification
              </Title>
              <p className="text-center">
                Please check your email for a 6-digit code and enter it below.
              </p>

              <form onSubmit={handleSubmit} className="mt-4 ">
                {/* OTP Input Fields */}
                <Flex align="center" justify="center" gap={8}>
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el: any) => (inputRefs.current[index] = el?.input)}
                      maxLength={1}
                      size="large"
                      className="w-12 h-12 text-center text-xl font-bold"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={isLoading}
                    />
                  ))}
                </Flex>

                <p className="text-center mt-3">
                  {time === 0
                    ? "Didn't receive the code?"
                    : "Check your email and enter the code."}
                  {time === 0 && (
                    <strong
                      className="cursor-pointer text-blue-600"
                      onClick={handleResendOtp}
                    >
                      Resend now
                    </strong>
                  )}
                  <small className="text-gray-500"> {time} sec</small>
                </p>

                <div className="flex justify-center mt-5">
                  <Button
                    type="primary"
                    block
                    htmlType="submit"
                    size="large"
                    loading={isLoading}
                  >
                    Confirm
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
