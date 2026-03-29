"use client";

import React from "react";
import { Form, Input } from "antd";
import { useForgotPasswordMutation } from "@/redux/Api/userAPi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Forget = () => {
  const [loading, setLoading] = React.useState(false);
  const [forgetPassword] = useForgotPasswordMutation();
  const router = useRouter();
  const onFinish = async (values) => {
    const data = {
      email: values.email,
    };
    setLoading(true);
    try {
      const response = await forgetPassword(data).unwrap();
      localStorage.setItem("email", values.email);
      toast.success(response.message);
      router.push("/auth/signIn/forgetPassword/otp");
      setLoading(false);
    } catch (error) {
      toast.error(error.data.message);
      // console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center md:pt-0 px-4 justify-center bg-white">
      <div className="w-full">
        <div className="gap-5">
          <div className="lg:flex lg:justify-center">
            <div className="bg-white lg:w-[500px] px-5 py-16 border">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Forget Password
              </h2>

              <Form
                name="forgetPassword"
                layout="vertical"
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Invalid email address" },
                  ]}
                >
                  <Input
                    style={{ padding: "9px", borderRadius: "0px" }}
                    className="w-full px-4 py-2 border  rounded-md"
                    placeholder="Enter your Email"
                  />
                </Form.Item>

                <Form.Item>
                  <button
                    type="primary"
                    htmlType="submit"
                    className="w-full py-2 bg-black text-white cursor-pointer"
                    loading={loading} 
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
