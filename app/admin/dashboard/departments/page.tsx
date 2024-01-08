"use client";
import React, { useState } from "react";
import { BsPlusLg, BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import Link from "next/link";
import Table from "../../../components/Table/Table";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FcDepartment } from "react-icons/fc";
type props = {};

export default function Page(Props: props) {
  const [isActive, setIsActive] = useState(false);
  const [isUp, setIsUp] = useState(false);

  let data = [
    {
      code: "CMPN",
      name: "Computer Engineering",
    },
    {
      code: "INFT",
      name: "Information Technology",
    },
    {
      code: "EXTC",
      name: "Electronics Engineering",
    },
  ];
  let column = [
    { field: "code", filter: true },
    { field: "name", filter: true },
  ];

  return (
    <main>
      <div className="h-[350px] bg-[#212529]  ">
        <div className="pt-[70px]"></div>
        <div className="flex justify-between items-center  h-[120px] ">
          <div className="w-[250px] ml-5 ">
            <h1 className="text-2xl text-white">Departments</h1>
          </div>
          <div className="mr-5 hidden ">
            <button
              onClick={() => setIsUp((val) => !val)}
              className="w-[100px] flex items-center gap-x-2 text-black rounded-3xl bg-purple-400 h-[42px]  active:bg-purple-500"
            >
              <p className="pl-5">Add </p>
              {isUp ? (
                <div className="ml-3">
                  <IoIosArrowDown size={20} />
                </div>
              ) : (
                <div className="ml-3">
                  <IoIosArrowUp size={20} />
                </div>
              )}
            </button>
          </div>
        </div>
        <div
          className="flex flex-col
          lg:flex-row  "
        >
          <div className="lg:w-[60%] min-h-[500px]">
            <div className="mt-[10px] bg-[#dee2e6] h-[400px] mx-3 lg:mx-5 rounded-md">
              <div className="text-black h-[70px] flex gap-x-3 border-y-2 border-black">
                <h1 className=" text-2xl sm:text-4xl mt-3 ml-5 flex items-center ">
                  New Department
                </h1>
                <div className="mt-3 flex items-center ">
                  <FcDepartment size={35} />
                </div>
              </div>
              <form className="">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row  gap-y-2 my-4 ">
                    <label
                      className=" text-2xl mx-3 flex items-end "
                      htmlFor=""
                    >
                      Name -
                    </label>
                    <input
                      type="text"
                      className=" w-[90%] sm:w-[60%] h-[40px] border-b-2 bg-[#dee2e6] text-2xl border-black  mx-3 "
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row  gap-y-2 my-4 ">
                    <label
                      className=" text-2xl mx-3 flex items-end "
                      htmlFor=""
                    >
                      Code -
                    </label>
                    <input
                      type="text"
                      className="w-[60%] h-[40px] border-b-2 bg-[#dee2e6] text-2xl border-black  mx-3 "
                    />
                  </div>

                  <Link href="/admin/dashboard">
                    <div className="flex  justify-end">
                      <button className="w-[140px] mr-5 mb-4 text-black rounded-3xl bg-purple-400 h-[42px]  active:bg-purple-500">
                        Add User
                      </button>
                    </div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:w-[40%] mt-[10px] ">
            <h1 className=" ml-5 mb-4 font-semibold  text-2xl lg:hidden ">
              List Of Departments
            </h1>
            <Table rowData={data} colDefs={column} />
          </div>
        </div>
      </div>
    </main>
  );
}
