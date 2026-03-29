"use client";
import React, { useEffect } from "react";
import { Form, Input, Radio, Button } from "antd";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/Api/userAPi";
import { toast } from "react-toastify";
const EditProfileSection = () => {
  const { data: profile } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const [form] = Form.useForm();

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });
    }
  }, [profile, form]);

  const onEditProfile = async (values) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("phone", values.phone);
    try {
      const response = await updateProfile(data).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.data.message);
      // console.log(error);
    }
  };
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

          <div className="col-span-6  md:pl-6 mt-9 md:mt-0">
            <h1 className="text-xl font-semibold pb-4">Edit Profile</h1>
            <Form onFinish={onEditProfile} layout="vertical" form={form}>
              <Form.Item name="name" label="Name">
                <Input
                  style={{ padding: "9px", borderRadius: "0px" }}
                  placeholder="Enter name"
                  rules={[{ required: true, message: "Please write a Email" }]}
                />
              </Form.Item>

              <Form.Item name="email" label="Email">
                <Input
                  disabled
                  style={{ padding: "9px", borderRadius: "0px" }}
                  placeholder="Enter Email"
                  rules={[{ required: true, message: "Please write a Email" }]}
                />
              </Form.Item>

              <Form.Item name="phone" label="Phone Number">
                <Input
                  style={{ padding: "9px", borderRadius: "0px" }}
                  placeholder="Enter Phone Number"
                  type="Number"
                  rules={[{ required: true, message: "Please write a Number" }]}
                />
              </Form.Item>

              <button
                type="primary"
                className="w-full bg-black text-white py-2 cursor-pointer"
              >
                Update
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileSection;
