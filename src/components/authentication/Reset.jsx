"use client";
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useResetPasswordMutation } from "@/redux/Api/userAPi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const Reset = () => {
//   const locale = useLocale();
const router = useRouter();
  const [loading, setLoading] = useState(false);
const [resetPassword] = useResetPasswordMutation()



const onFinish = async (values) => {
  const data = {
    email: localStorage.getItem("email"),
    password: values.password,
    token: localStorage.getItem("token"),
  };
  setLoading(true);
  try {
    const response = await resetPassword(data).unwrap();
    toast.success(response.message);
    router.push("/auth/signIn");
    setLoading(false);
  } catch (error) {
    toast.error(error.data.message);
    // console.log(error);
    setLoading(false);
  }
}


  return (
    <div className="items-center px-4 justify-center flex min-h-screen bg-white">
      <div>
        <div className="bg-white lg:w-[500px] lg:px-16 px-5 py-16 border">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Set a new password
          </h2>
          <h3 className="text-[#333333] text-center mb-5">
            Create a new password. Ensure it differs from previous ones for security.
          </h3>
          <Form
            name="reset-password"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please set your password!" },
                { min: 8, max: 10, message: "Password must be 8-10 characters long!" },
              ]}
            >
              <Input.Password style={{padding:'9px' , borderRadius:'0px'}} className="w-full px-4 py-2 border  rounded-md" placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The two passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password style={{padding:'9px' , borderRadius:'0px'}} className="w-full px-4 py-2 border  rounded-md" placeholder="Re-enter your password" />
            </Form.Item>

            <Form.Item>
              <button 
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                className="w-full py-2 bg-black text-white cursor-pointer"
                
              >
                {loading ? "Loading..." : "Reset"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
