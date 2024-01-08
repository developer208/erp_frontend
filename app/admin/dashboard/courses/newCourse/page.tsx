import React from "react";
import { FaBookBookmark } from "react-icons/fa6";
import Link from "next/link";
type props = {};

export default function page(Props: props) {
  return (
    <main>
      <div className="w-[100vw] h-[350px] bg-[#212529]">
        <div className="h-[70px]"></div>
        <div className="mt-[120px] bg-[#dee2e6] min-h-[500px] mx-3 lg:mx-5">
          <div className="text-black h-[70px] flex gap-x-3 border-y-2 border-black">
            <h1 className="text-4xl mt-3 ml-5">New Course</h1>
            <div className="mt-3">
              <FaBookBookmark size={35} />
            </div>
          </div>
          <form className="flex flex-col lg:flex-row">
            <div className="lg:w-[50%] flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row  gap-y-2 my-4 ">
                <label className=" text-2xl mx-3 flex items-end " htmlFor="">
                  Id -
                </label>
                <input
                  type="text"
                  className=" w-[90%] sm:w-[60%] h-[40px] border-b-2 bg-[#dee2e6] text-2xl border-black  mx-3 "
                />
              </div>
              <div className="flex flex-col sm:flex-row  gap-y-2 my-4 ">
                <label className=" text-2xl mx-3 flex items-end " htmlFor="">
                  Name -
                </label>
                <input
                  type="number"
                  className="w-[60%] h-[40px] border-b-2 bg-[#dee2e6] text-2xl border-black  mx-3 "
                />
              </div>
              <div className="flex flex-col sm:flex-row  gap-y-2 my-4 ">
                <label className=" text-2xl mx-3 flex items-end " htmlFor="">
                  Credits -
                </label>
                <input
                  type="number"
                  className="w-[60%] h-[40px] border-b-2 bg-[#dee2e6] text-2xl border-black  mx-3 "
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-y-2 my-4 ">
                <label className=" text-2xl mx-3 flex items-end " htmlFor="">
                  Semester -
                </label>
                <input
                  type="number"
                  className="w-[60%] h-[40px] border-b-2 bg-[#dee2e6] text-2xl border-black  mx-3 "
                />
              </div>
              <div className="flex   gap-y-2 my-4 ">
                <label className=" text-2xl mx-3 flex items-end " htmlFor="">
                  Department -
                </label>
                <select className=" ml-3 bg-[#dee2e6] w-[160px] border-[1px]  border-gray-500 rounded-md">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <Link href="/admin/dashboard/courses">
                <div className="flex justify-end">
                  <button className="w-[140px] mr-5 mb-4 text-black rounded-3xl bg-purple-400 h-[42px]  active:bg-purple-500">
                    Add User
                  </button>
                </div>
              </Link>
            </div>
            <div className="lg:w-[50%]   ">
              <h1 className="flex justify-center items-centers">
                svg IMAGE Right
              </h1>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
