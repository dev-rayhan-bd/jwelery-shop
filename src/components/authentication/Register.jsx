"use client";

import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useSignUpMutation } from "../../redux/Api/userAPi"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import BaseUrl from "@/components/baseApi/BaseApi";
// import { toast } from "sonner";
// import { useLocale } from "next-intl";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [signUp] = useSignUpMutation();
  const router = useRouter();
  const onFinish = async (values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password
    }
    setLoading(true);
    try {
      const response = await signUp(data).unwrap();
      localStorage.setItem("email", values.email);
      toast.success(response.message);
      // console.log(response);

      setLoading(false)
      router.push("/auth/signUp/verifyRegisterOtp");

    } catch (error) {
      toast.error(error.data.message);
      // console.log(error);
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center  md:pt-0 px-4 justify-center bg-white">
      <div className="w-full lg:max-w-[1800px] lg:m-auto">
        <div className=" gap-5">
          <div className="lg:flex justify-center">
            <div className="bg-white lg:w-[500px] md:px-16 px-5 py-16 border ">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Sign Up</h2>

              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Name!",
                    },
                  ]}
                >
                  <Input
                    style={{ padding: '9px', borderRadius: '0px' }}
                    placeholder="Enter your Name"
                    className="w-full px-4 py-2 border rounded bg-white text-black"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input
                    style={{ padding: '9px', borderRadius: '0px' }}
                    placeholder="Enter your Email"
                    className="w-full px-4 py-2 border rounded bg-white text-black"
                  />
                </Form.Item>

                {/* <Form.Item
                  name="phone"
                  label="Contact Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Contact Number!",
                    },
                  ]}
                >
                  <Input
                  style={{padding:'9px' , borderRadius:'0px'}}
                    placeholder="Enter your Contact"
                    className="w-full px-4 py-2 border rounded bg-white text-black"
                  />
                </Form.Item> */}

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please set your password!" },
                    {
                      min: 8,
                      max: 20,
                      message: "Password must be 8-20 characters long!",
                    },
                  ]}
                >
                  <Input.Password
                    style={{ padding: '9px', borderRadius: '0px' }}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded-md bg-white text-black"
                  />
                </Form.Item>

                {/* <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                  style={{padding:'9px' , borderRadius:'0px'}}
                    placeholder="Re-enter your password"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </Form.Item> */}

                <Form.Item>
                  <button
                    type="submit"
                    loading={loading} // Show loading state
                    className="w-full py-2 hover:bg-none bg-black text-white cursor-pointer"
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </Form.Item>
              </Form>
              <span className="flex justify-center">
                already have an account?{" "}
                <Link href={"/auth/signIn"}>
                  <span className="font-semibold"> Sign In</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
