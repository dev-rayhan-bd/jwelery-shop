"use client";
import { useGetAllProductQuery } from "@/redux/Api/webmanageApi";
import { ConfigProvider, Input, Modal } from "antd";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import GlobalSingleProduct from "./GlobalSingleProduct";

const GlobalSearchModal = ({ isModalOpen, handleOk, handleCancel }) => {
    const [search, setSearch] = useState("");
    const { data, isLoading } = useGetAllProductQuery(
        { query: search, limit: 3 },
        { skip: !search }
    );

    // console.log(data);
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    return (
        <ConfigProvider
            theme={{
                "components": {
                    "Modal": {
                        "contentBg": "rgba(255,255,255,0.90)"
                    }
                }
            }}
        >
            <Modal
                className=""
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                closeIcon={false}
                footer={false}
                width={600}
            >
                <ConfigProvider
                    theme={{
                        components: {
                            "Input": {
                                "activeBorderColor": "rgb(0,0,0)",
                                "hoverBorderColor": "rgb(8,8,8)",
                                "colorPrimaryHover": "rgb(0,0,0)",
                                "colorPrimaryActive": "rgb(0,0,0)",
                                "controlHeight": 44,
                                "borderRadius": 3,
                                "primaryColor": "rgb(0,0,0)",
                                "inputFontSize": 16,
                            }
                        },
                    }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div
                            className={`"}`}
                        >
                            <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-[#5c5c5c] to-[#080808] bg-clip-text text-transparent mb-2">
                                Discover Your Perfect Piece
                            </h2>
                            <p className="text-gray-800 text-sm">Search through our curated collection of fine jewelry</p>
                        </div>
                    </div>
                    <div className="flex justify-center ">
                        <div className="  w-[400px]">
                            <Input onChange={handleSearch} prefix={<AiOutlineSearch size={30} />} className=" w-[400px] text-xl" placeholder="Search Product" />
                        </div>
                    </div>
                    <div className={``}>

                        {isLoading ? (
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 container m-auto mt-6">

                                <div className="w-full">
                                    {/* Skeleton for Image */}
                                    <div className="bg-[#d3d3d3] animate-pulse md:h-[200px] h-[100px] w-full"></div>

                                    {/* Skeleton for Favorite Icon */}
                                    <div className="absolute cursor-pointer top-0 right-0 flex items-center p-1 mr-1 mt-1 rounded-full text-xl bg-[#d3d3d3] animate-pulse"></div>

                                    {/* Skeleton for Name */}
                                    <div className="pt-2">
                                        <div className="bg-[#d3d3d3] animate-pulse h-6 w-[70%]"></div>
                                    </div>

                                    {/* Skeleton for Price */}
                                    <div className="text-sm mt-1">
                                        <div className="bg-[#d3d3d3] animate-pulse h-6 w-[40%]"></div>
                                    </div>
                                </div>

                                <div className="w-full">
                                    {/* Skeleton for Image */}
                                    <div className="bg-[#d3d3d3] animate-pulse md:h-[200px] h-[100px] w-full"></div>

                                    {/* Skeleton for Favorite Icon */}
                                    <div className="absolute cursor-pointer top-0 right-0 flex items-center p-1 mr-1 mt-1 rounded-full text-xl bg-[#d3d3d3] animate-pulse"></div>

                                    {/* Skeleton for Name */}
                                    <div className="pt-2">
                                        <div className="bg-[#d3d3d3] animate-pulse h-6 w-[70%]"></div>
                                    </div>

                                    {/* Skeleton for Price */}
                                    <div className="text-sm mt-1">
                                        <div className="bg-[#d3d3d3] animate-pulse h-6 w-[40%]"></div>
                                    </div>
                                </div>

                                <div className="w-full">
                                    {/* Skeleton for Image */}
                                    <div className="bg-[#d3d3d3] animate-pulse md:h-[200px] h-[100px] w-full"></div>

                                    {/* Skeleton for Favorite Icon */}
                                    <div className="absolute cursor-pointer top-0 right-0 flex items-center p-1 mr-1 mt-1 rounded-full text-xl bg-[#d3d3d3] animate-pulse"></div>

                                    {/* Skeleton for Name */}
                                    <div className="pt-2">
                                        <div className="bg-[#d3d3d3] animate-pulse h-6 w-[70%]"></div>
                                    </div>

                                    {/* Skeleton for Price */}
                                    <div className="text-sm mt-1">
                                        <div className="bg-[#d3d3d3] animate-pulse h-6 w-[40%]"></div>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 container m-auto mt-6">
                                {data?.products?.length > 0 ? (
                                    data.products.map((product) => (
                                        <GlobalSingleProduct
                                            key={product?._id}
                                            item={product}
                                            handleCancel={handleCancel}
                                        />
                                    ))
                                ) : search && (
                                    <div className="w-full h-16 grid place-items-center col-span-4">
                                        <h3>No Data Found</h3>
                                    </div>
                                )}
                            </div>
                        )}


                    </div>

                </ConfigProvider>

            </Modal>
        </ConfigProvider >

    );
};

export default GlobalSearchModal;