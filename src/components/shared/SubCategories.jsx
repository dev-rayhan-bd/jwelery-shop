"use client";
import { useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Filter } from "./Filter";
import CardShop from "./CardShop";
import mainUrl from "./mainUrl";
import { Pagination } from "antd";

const SubCategories = ({ categorys, categoryId }) => {
  const splideRef = useRef(null);

  const handlePrevClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go("<");
    }
  };

  const handleNextClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go(">");
    }
  };
  const limit = 10;
  const [selectedSubCategory, setSelectedSubCategory] = useState(categoryId);
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    price_min: null,
    price_max: null,
    availability: null,
    rating: null,
    sort: "low_to_high",
    page: 1,
    limit,
  });
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedSubCategory) params.append("category", selectedSubCategory);
      if (filters.price_min) params.append("price_min", filters.price_min);
      if (filters.price_max) params.append("price_max", filters.price_max);
      if (filters.availability)
        params.append("availability", filters.availability);
      if (filters.rating) params.append("rating", filters.rating);
      if (filters.sort) params.append("sort", filters.sort);
      if (filters.page) params.append("page", filters.page);
      if (filters.limit) params.append("limit", filters.limit);
      const fetched = await mainUrl(`/products?${params.toString()}`).finally(
        () => {
          setLoading(false);
        }
      );

      // console.log(fetched);

      setProducts(fetched);

      if (min === 0 && max === 0 && fetched?.products?.length > 0) {
        let tempMin = Infinity;
        let tempMax = -Infinity;

        fetched.products.forEach((product) => {
          const currentMax = Math.max(product.price, product.discount_price);
          const currentMin = Math.min(product.price, product.discount_price);

          if (currentMax > tempMax) tempMax = currentMax;
          if (currentMin < tempMin) tempMin = currentMin;
        });

        setMin(tempMin);
        setMax(tempMax);
      }
    };

    fetchProducts();
  }, [selectedSubCategory, filters]);
  return (
    <div>
      <div>
        <div className="container mx-auto mt-20 ">
          <div className="mb-11">
            <div className="">
              <div className="text-center max-w-2xl mx-auto mb-6 px-4 lg:px-0">
                {/* <Title head={"category"} title={"Browse By Category"}></Title> */}
                <h1 className="md:text-3xl text-xl font-semibold">
                  What Our Happy Customers Say
                </h1>
                <div className=" text-[#2E2E2E] pt-3 md:text-base text-sm">
                  Real stories of love, elegance, and unforgettable
                  moments—discover why our customers trust us for their most
                  precious jewelry.
                </div>
              </div>
              <div></div>
            </div>

            <div className="">
              <div className="grid grid-cols-16">
                <div
                  className=" justify-start flex items-center col-span-1"
                  onClick={handlePrevClick}
                >
                  <div className=" rounded-full text-2xl  text-black cursor-pointer">
                    <SlArrowLeft />
                  </div>
                </div>

                <div className="col-span-14">
                  <Splide
                    ref={splideRef}
                    options={{
                      type: categorys?.subcategories?.length > 1 ? "loop" : "slide",
                      perPage: Math.min(6, categorys?.subcategories?.length || 1),
                      gap: "1rem",
                      arrows: false,
                      pagination: false,
                      breakpoints: {
                        1724: { perPage: Math.min(6, categorys?.subcategories?.length || 1) },
                        968: { perPage: Math.min(3, categorys?.subcategories?.length || 1) },
                        640: { perPage: Math.min(2, categorys?.subcategories?.length || 1) },
                      },
                    }}
                    aria-label="Category Slide"
                    className="w-full"
                  >
                    {categorys?.subcategories?.map((item, index) => (
                      <SplideSlide key={index} className="">
                        <div className="text-center ">
                          <div className="flex justify-center">
                            <button
                              onClick={() => setSelectedSubCategory(item._id)}
                            >
                              <Image
                                className={`md:h-[220px] h-[145px] object-cover rounded`}
                                width={400}
                                height={200}
                                src={item.img_url}
                                alt=""
                              />
                            </button>
                          </div>
                          <h1
                            className={`text-xl mt-3 ${selectedSubCategory === item._id && "underline"
                              }`}
                          >
                            {item.name}
                          </h1>
                        </div>
                      </SplideSlide>
                    ))}
                  </Splide>
                </div>
                <div
                  className=" flex items-center justify-end col-span-1"
                  onClick={handleNextClick}
                >
                  <div className="   rounded-full text-2xl  text-black cursor-pointer">
                    <SlArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Filter
          showing={products?.products?.length || 0}
          filters={filters}
          setFilters={setFilters}
          min={min}
          max={max}
        />
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 container m-auto mt-6">
        {products?.products?.length > 0 ? (
          products.products?.map((product) => (
            <CardShop key={product._id} item={product} />
          ))
        ) : (
          <div className="w-full h-16 grid place-items-center col-span-4">
            <h3>{loading ? "Loading..." : "No Data"}</h3>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination
          current={filters.page}
          pageSize={limit}
          total={products?.pagination?.totalProducts || 0}
          onChange={(e) => setFilters((p) => ({ ...p, page: e }))}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default SubCategories;
