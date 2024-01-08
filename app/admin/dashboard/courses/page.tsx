"use client";
import React, { useState } from "react";
import { BsPlusLg, BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import Table from "../../../components/Table/Table";
import Link from "next/link";
export default function Course() {
  const [isActive, setIsActive] = useState(false);
  let data = [
    {
      id: "CM002",
      course_name: "Chemistry",
      credits: 10,
      sem: 1,
      department_name: "CMPN",
    },
    {
      id: "PY001",
      course_name: "Physics",
      credits: 10,
      sem: 1,
      department_name: "CMPN",
    },
    {
      id: "MS001",
      course_name: "Mathematics",
      credits: 10,
      sem: 1,
      department_name: "CMPN",
    },
  ];
  let column = [
    { field: "id", filter: true },
    { field: "course_name", filter: true },
    { field: "credits" },
    { field: "sem" },
    { field: "department_name" },
  ];
  return (
    <main className="">
      <div className="w-[100vw] h-[350px] bg-[#212529] ">
        <div className="h-[70px]"></div>
        <div className="text-white">
          <div className="h-[280px] bg-[#212529]  ">
            <div className="flex justify-between items-center  h-[120px] ">
              <div className="w-[250px] ml-5 ">
                <h1 className="text-2xl text-white">Courses</h1>
              </div>
              <div className="mr-5">
                <Link href="/admin/dashboard/courses/newCourse">
                  <button className="w-[150px] flex items-center gap-x-2 text-black rounded-3xl bg-purple-400 h-[42px]  active:bg-purple-500">
                    <div className="ml-3">
                      <BsPlusLg size={20} />
                    </div>
                    <p className="">Add Course</p>
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-between flex-col-reverse gap-y-3 lg:flex-row lg:gap-y-0 mb-5">
              <div className="flex gap-x-3 ml-5">
                <div className="bg-[#212529] w-[140px] h-[40px] flex items-center justify-center border-[1px] border-gray-600 rounded-3xl ">
                  <select className="bg-[#212529] text-white hover:cursor-pointer ">
                    <option hidden>Semester</option>
                    <option className="bg-[#212529]  ">First</option>
                    <option className="bg-[#212529]  ">Second</option>
                    <option className="bg-[#212529]  ">Third</option>
                  </select>
                </div>
                <div className="bg-[#212529] w-[150px] h-[40px] flex items-center justify-center  border-[1px] border-gray-600 rounded-3xl ">
                  <select className="bg-[#212529] text-white  hover:cursor-pointer">
                    <option className="bg-[#212529]  " hidden>
                      Department
                    </option>
                    <option className="bg-[#212529] ">CMPN</option>
                    <option className="bg-[#212529] ">INFT</option>
                    <option className="bg-[#212529] ">EXTC</option>
                    <option className="bg-[#212529] ">ETRX</option>
                    <option className="bg-[#212529] ">BIOM</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-x-3 mr-5 justify-end lg:justify-normal ">
                <div
                  className={
                    isActive
                      ? "cursor-pointer px-1 w-[40px] h-[40px] bg-purple-400  flex justify-center items-center rounded-full"
                      : "cursor-pointer px-1 w-[40px] h-[40px] border-[1px] border-gray-600 flex justify-center items-center rounded-full"
                  }
                  onClick={() => setIsActive(isActive)}
                >
                  <BsGrid3X3Gap size={20} style={{ color: "white" }} />
                </div>
                <div
                  className={
                    !isActive
                      ? "cursor-pointer px-1 w-[40px] h-[40px] bg-purple-400  flex justify-center items-center rounded-full"
                      : "cursor-pointer px-1 w-[40px] h-[40px] border-[1px] border-gray-600 flex justify-center items-center rounded-full"
                  }
                  onClick={() => setIsActive(!isActive)}
                >
                  <AiOutlineUnorderedList
                    size={20}
                    style={{ color: "white" }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-[60px]">
              <Table rowData={data} colDefs={column} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
