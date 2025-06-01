"use client";
import React, { useState } from "react";
import { Button, Card, Divider, Input, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/actions/user-action";
import { useLogin } from "@/app/hooks/use-login";
import { useGoogleLogin } from "@/app/hooks/use-google";
import { GoogleCredentialResponse } from "@/app/dto/auth.dto";
import Form from "antd/es/form/Form";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const { mutate: login, isPending: isLoginPending } = useLogin();
  const { mutate: googleLogin, isPending: isGooglePending } = useGoogleLogin();

  const handleLogin = () => {
    if (!email || !password) {
      api.error({
        message: "Validation Error",
        description: "Please enter both email and password.",
        duration: 3,
      });
      return;
    }

    login(
      { email: email.toLowerCase(), password },
      {
        onSuccess: (data) => {
          console.log(data, email, password);

          if (!data.success) {
            api.error({
              message: "Login Error",
              description: "Invalid credentials. Please try again.",
              duration: 3,
            });
            return;
          }
          api.success({
            type: "success",
            message: "Login successful",
            duration: 3,
          });
          const token = data.accessToken;
          const decoded = jwtDecode(token);
          dispatch(loginSuccess(decoded));
          Cookies.set("token", token.toString(), {
            expires: 1,
            sameSite: "strict",
            secure: true,
          });
          router.push("/");
        },
        onError: (error) => {
          api.error({
            message: "Login Error",
            description: error?.message || "An unexpected error occurred.",
          });
        },
      }
    );
  };

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const googleCredentialResponse =
      credentialResponse as GoogleCredentialResponse;
    const token = googleCredentialResponse?.credential;
    if (!token) {
      handleGoogleError();
      return;
    }
    googleLogin(
      { credential: googleCredentialResponse?.credential },
      {
        onSuccess: (response) => {
          const decoded = jwtDecode(response.accessToken);
          console.log(decoded);

          dispatch(loginSuccess(decoded));
          Cookies.set("token", response.accessToken, {
            expires: 1,
            secure: true,
            sameSite: "Strict",
          });
          api.success({
            type: "success",
            style: {
              background: "green",
              color: "white",
              accentColor: "white",
            },
            message: "Google Login successful",
          });
          router.push("/");
        },
        onError: (error) => {
          console.error("Google Sign-in Error:", error);
        },
      }
    );
  };

  const handleGoogleError = () => {
    api.error({
      type: "error",
      message: "Google Sign-in Error",
      description: "Please try again.",
    });
  };

  return (
    <>
      {contextHolder}
      <div className=" items-center justify-center h-screen w-full font-[var(--font-gantari)]">
        <div className="lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-3 w-full">
          {/* Branding Section */}
          <div className="hidden lg:flex h-screen items-center justify-center xl:col-span-2 bg-gradient-to-r">
            <div className="text-center">
              <h1 className="text-[13rem] font-bold">BuildYou</h1>
              <p className="text-xl">Excel at every stage & build the life</p>
            </div>
          </div>

          {/* Sign-In Card */}
          <div className="flex h-screen items-center justify-center shadow-lg">
            <Card className="w-[400px] space-y-6 p-4">
              <h1 className="text-4xl font-bold">Sign In</h1>

              <Form className="space-y-4">
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
              </Form>

              <div className="flex justify-between text-sm">
                <span>
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup">Sign up</Link>
                </span>
                <Link href="/auth/recovery">Forgot password?</Link>
              </div>

              <div className="flex justify-end">
                <Button
                  size="large"
                  type="primary"
                  loading={isLoginPending || isGooglePending}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  Sign In
                </Button>
              </div>

              <Divider>or</Divider>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(
                      "Login Success (Test Page):",
                      credentialResponse
                    );
                    handleGoogleSuccess(credentialResponse);
                  }}
                  onError={() => {
                    console.error("Login Error (Test Page)");
                    alert("Login Failed! Check console.");
                  }}
                  // Try with and without useOneTap here
                  // useOneTap
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
