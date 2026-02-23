import React from "react";
import hero from "../../../public/shared/sss.jpg";
import Image from "next/image";
import FaqSection from "../../components/shared/FaqSection";
import Link from "next/link";

export const metadata = {
  title: "FAQs",
  description: "Common questions about orders, shipping, returns, and custom jewelry at Cathy’s Jewelry.",
};
const page = () => {
  return (
    <div className="container m-auto mt-9 px-4 lg:px-0">
      <div>
        <h1 className="pb-4">Home/FAQs</h1>
        <div
          className="relative bg-cover bg-center md:h-[55vh] h-[200px] -mt-[1px]"
          style={{
            width: "100%",
          }}
        >
          <Image
            src={hero}
            className="rounded-2xl"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
          <div className="absolute px-4 lg:px-0 inset-0 flex justify-center items-center ">
            <div className="">
              <div className="">
                <div className="text-3xl font-semibold md:text-5xl ">
                  <h1 className="">FAQs</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="font-semibold text-lg mt-16">Welcome to our FAQ section! </h1>
      <p className="pt-2">Here, you'll find answers to common questions about orders, shipping, returns, and custom jewelry. If you need further assistance, feel free to <span className="text-gray-600 mt-4">
          If you need any help{" "}
          <Link
            href="/contactUs"
            className="text-blue-600 underline font-medium"
          >
            contact us
          </Link>
          :
        </span></p>
      <FaqSection></FaqSection>
    </div>
  );
};

export default page;
