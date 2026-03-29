"use client";
import { use, useState } from "react";
import { Form, Input, ConfigProvider, Upload, Typography, Radio } from "antd";
import { useAddOrderCustomMutation } from "@/redux/Api/webmanageApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const Custom = () => {
  const [addOrder, { isLoading }] = useAddOrderCustomMutation()
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const router = useRouter();
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values) => {
    // console.log("Received values:", values);
    const formData = new FormData();

    formData.append("type", values?.type);
    formData.append("name", values?.name);
    formData.append("email", values?.email);
    formData.append("phone", values?.phone);
    formData.append("address", values?.address);
    formData.append("jewelry_type", values?.jewelry_type);
    formData.append("description", values?.description);
    fileList.forEach((file) => {
      formData.append("image", file.originFileObj);
    });
    try {
      const response = await addOrder(formData).unwrap();
      toast.success(response.message);
      router.push('/')
    } catch (error) {
      toast.error(error.data.message);
    }

  };

  return (
    <div className="container mx-auto mt-10 lg:flex justify-between space-x-12">
      {/* Left Column: Steps */}
      <ConfigProvider
        theme={{
          components: {
            "Checkbox": {
              "colorPrimary": "rgb(0,0,0)",
              "colorPrimaryBorder": "rgb(0,0,0)",
              "colorPrimaryHover": "rgb(0,0,0)"
            },
            "Slider": {
              "trackBg": "rgb(120,120,120)",
              "trackHoverBg": "rgb(126,126,126)",
              "colorPrimaryBorderHover": "rgb(0,0,0)",
              "colorFillContentHover": "rgba(0,0,0,0.15)",
              "handleActiveColor": "rgb(0,0,0)",
              "handleColor": "rgb(0,0,0)",
              "dotActiveBorderColor": "rgb(22,22,22)",
              "handleActiveOutlineColor": "rgba(105,105,105,0.2)"
            },
            "Select": {
              "activeBorderColor": "rgb(0,0,0)",
              "hoverBorderColor": "rgb(0,0,0)",
              "activeOutlineColor": "rgba(88,88,88,0.1)",
              "colorPrimary": "rgb(0,0,0)",
              "controlHeight": 40,
              "borderRadius": 2,
              "optionSelectedBg": "rgb(242,242,242)"
            },
            "Input": {
              "activeBorderColor": "rgb(0,0,0)",
              "hoverBorderColor": "rgb(0,0,0)",
              "colorPrimaryActive": "rgb(0,0,0)",
              "colorPrimaryHover": "rgb(0,0,0)",
              "colorPrimary": "rgb(0,0,0)",
            },
            "Radio": {
              "colorPrimary": "rgb(0,0,0)",
              "colorPrimaryActive": "rgb(0,0,0)",
              "colorPrimaryBorder": "rgb(98,100,102)",
              "colorPrimaryHover": "rgb(20,20,20)"
            }
          },
        }}
      >
        <div className="lg:flex-1 lg:space-y-6">
          <Title level={3}>How It Works?</Title>
          <ul className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Step 1:</strong> Share Your Idea – Upload a sketch,
              reference image, or describe your concept.
            </li>
            <li>
              <strong>Step 2:</strong> Select Materials – Choose your preferred
              metal, gemstones, and settings.
            </li>
            <li>
              <strong>Step 3:</strong> Approve the Design – Our expert jewelers
              will create a 3D design for your approval.
            </li>
            <li>
              <strong>Step 4:</strong> Crafting Begins – Once approved, we bring
              your vision to life with expert craftsmanship.
            </li>
            <li>
              <strong>Step 5:</strong> Receive Your Custom Piece – Your
              personalized jewelry is delivered to your doorstep.
            </li>
          </ul>
        </div>

        <div className="flex-1 space-y-6">
          <Title level={3}>Input Details for Custom/Repair</Title>
          <Form
            form={form}
            name="customForm"
            onFinish={onFinish}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            labelAlign="left"
            className="space-y-4"
          >
            <Form.Item

              name="type"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Radio.Group
                name="radiogroup"
                defaultValue={1}
                options={[
                  { value: 'custom', label: "Custom" },
                  { value: 'repair', label: "Repair" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input
                style={{ borderRadius: "0px", padding: "10px" }}
                placeholder="Enter your full name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                style={{ borderRadius: "0px", padding: "10px" }}
                placeholder="Enter your email"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              type="Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                style={{ borderRadius: "0px", padding: "10px" }}
                placeholder="Enter your phone number"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </Form.Item>

            <Form.Item
              label="Delivery Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your delivery address!",
                },
              ]}
            >
              <Input
                style={{ borderRadius: "0px", padding: "10px" }}
                placeholder="Enter your address"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </Form.Item>

            <Form.Item
              label="Jewelry Type"
              name="jewelry_type"
              rules={[{ required: true, message: "Please input jewelry type!" }]}
            >
              <Input
                style={{ borderRadius: "0px", padding: "10px" }}
                placeholder="Enter jewelry type"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea
                style={{ borderRadius: "0px" }}
                placeholder="Write here"
                className="p-2 border border-gray-300 rounded-md w-full"
                rows={4}
              />
            </Form.Item>

            <Form.Item label="Photos">
              <Upload
                style={{ borderRadius: "8px", background: "red", padding: "10px" }}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple={true}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>

            </Form.Item>
            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                disabled={isLoading}
                className="w-full py-3 bg-black text-white cursor-pointer"
              >
                {isLoading ? "Loading..." : "Place Order"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default Custom;
