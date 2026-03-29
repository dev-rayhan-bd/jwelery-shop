"use client";
import React, { useState } from "react";
import { Form, Input, Radio, Button } from "antd";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { useChangePasswordMutation } from "@/redux/Api/userAPi";
import {
  useGetProfileQuery,
} from "@/redux/Api/userAPi";
import { toast } from "react-toastify";
const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const { data: profile } = useGetProfileQuery();
  const [passError, setPassError] = useState("");
  const onFinish = async (values) => {
    if (values?.newPassword === values.oldPassword) {
      return setPassError("Your old password cannot be your new password.");
    }
    if (values?.newPassword !== values?.confirmPassword) {
      return setPassError("Confirm password doesn't match.");
    } else {
      setPassError("");
    }

    const data = {
      current_password: values.currentPassword,
      new_password: values.newPassword,
    };
    try {
      const response = await changePassword(data).unwrap();
      toast.success(response.message);
    } catch (error) {
      // console.log(error);
      toast.error(error.data.message);
    }
  }
  return (
    <div>
      <div>
        <div className=" mt-10 md:grid grid-cols-12 gap-6">
          {/* Order Details */}
          <div className="col-span-6">
            <h2 className="text-2xl font-semibold">Welcome to your account!</h2>
            <p className="text-gray-600 mt-2">
              Update your details, manage addresses, store payment methods, and
              keep your account secure.
            </p>

            <p className="text-gray-600 mt-4">
              If you need any help{" "}
              <Link
                href="/contactUs"
                className="text-blue-600 underline font-medium"
              >
                contact us
              </Link>
              :
            </p>

            {
              profile?.shipping_address ?
                <div className="mt-5">
                  <p className="flex items-center mb-2">
                    <span className="mr-2">
                      <FaPhoneAlt />
                    </span>{" "}
                    {profile?.phone}
                  </p>
                  <p className="flex items-center mb-2">
                    <span className="mr-2">
                      <IoMail />
                    </span>{" "}
                    {profile?.email}
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">
                      <FaLocationDot />
                    </span>
                    {profile?.shipping_address?.street_address}
                  </p>
                </div>
                :
                <div>
                  <Link href={'/changeAddress'}><button className=" cursor-pointer border px-7 py-2 border-gray-400 mt-5">
                    Update Address
                  </button></Link>
                </div>
            }
          </div>

          <div className="col-span-6 md:pl-6 mt-9 md:mt-0">
            <h1 className="text-xl font-semibold pb-4">Change Password</h1>
            <Form layout="vertical" onFinish={onFinish}>
              {/* Current Password */}
              <Form.Item
                name="currentPassword"
                label="Old Password"
                rules={[
                  { required: true, message: "Please enter your current password!" },
                ]}
              >
                <Input.Password style={{ padding: "9px", borderRadius: "0px" }} placeholder="Old Password" />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: "Please enter a new password!" }]}
              >
                <Input.Password style={{ padding: "9px", borderRadius: "0px" }} placeholder="New Password" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Please confirm your new password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password style={{ padding: "9px", borderRadius: "0px" }} placeholder="Confirm Password" />
              </Form.Item>

              {/* Display error if password validations fail */}
              {passError && <p className="text-red-500 text-sm mb-2">{passError}</p>}


              {/* Submit Button */}
              <button type="submit" className="w-full bg-black text-white py-2 cursor-pointer">
                Change Password
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
