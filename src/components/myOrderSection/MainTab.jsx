'use client'
import { useState } from 'react'
import Regular from './Regular';
import Custom from './Custom';
import { useGetMyCustomOrderQuery, useGetMyOrderQuery } from '../../redux/Api/webmanageApi'
const MainTab = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  const { data: myOrder, isLoading: isLoadingMyOrder } = useGetMyOrderQuery()
  // console.log('myOrder', myOrder);
  const { data: myCustomOrder, isLoading: isLoadingMyCustomOrder } = useGetMyCustomOrderQuery()
  const isLoading = isLoadingMyOrder || isLoadingMyCustomOrder;

  return (
    <div className='mt-11'>
      <div className='flex border-b justify-center'>
        <div
          onClick={() => setSelectedTab("all")}
          className={` py-2.5  mx-2  cursor-pointer ${selectedTab === "all" ? "border-b text-black  " : " "
            }`}
        >
          <div className="flex justify-between px-5">
            <span className="flex gap-2">

              Regular
            </span>
          </div>
        </div>
        <div
          onClick={() => setSelectedTab("submitted")}
          className={` py-2.5  mx-2 cursor-pointer ${selectedTab === "submitted"
            ? "border-b text-black"
            : " "
            }`}
        >
          <div className="flex justify-between px-5 ">
            <span className="flex gap-2">

              Customs & Repairs
            </span>
          </div>
        </div>
      </div>

      <div className=" ">
        {
          isLoading ?
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 border-4 border-t-transparent border-black border-solid rounded-full animate-spin mt-5"></div>
            </div>

            :
            <div>
              {selectedTab === "all" && (
                <div>
                  <Regular myOrder={myOrder}></Regular>
                </div>
              )}
              {selectedTab === "submitted" && (
                <div>
                  <Custom myCustomOrder={myCustomOrder}></Custom>
                </div>
              )}
            </div>
        }
      </div>
    </div>
  )
}

export default MainTab