"use client";
import hero from "../../../public/shared/sss.jpg";
import Image from "next/image";
import mainUrl from "@/components/shared/mainUrl";
import { useEffect, useState } from "react";



const page = () => {
  const [about, setAbout] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await mainUrl(`/info?page=about-us`);
      setAbout(response);
    };
    fetchData();
  }, []);
  return (
    <div className="container m-auto mt-9 px-4 lg:px-0">
      <div>
        <h1 className="pb-4">Home/About Us</h1>
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
                  <h1 className="">About Us</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        {about && about?.content ? (
          <div dangerouslySetInnerHTML={{ __html: about?.content }} />
        ) : (
          <div>No data </div>
        )}
      </div>
    </div>
  );
};

export default page;
