"use client";
import React, { useEffect, useState } from "react";
import "../../styles/styles.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import displayTimeStamp from "@/app/utils/Timestamp";
type Props = {};
type totalusers = {
  type: string;
  total: number;
  professor: number;
  student: number;
  dept: number;
  courses: number;
};

export default function SectionOne({}: Props) {
  const [st, setSt] = useState("");
  useEffect(() => {
    setSt(displayTimeStamp());
  }, []);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Total-Users"],
    queryFn: () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/graph/totalusers`,
        {
          withCredentials: true,
        }
      );
    },
  });

  const result: totalusers = data?.data;

  return (
    <div className="h-[280px]  bg-[#212529] ">
      <div className="flex justify-between items-center  h-[120px] ">
        <div className="w-[250px] ml-5 ">
          <p className="text-gray-400 mb-1">Hello Admin.</p>
          <h1 className="text-2xl text-white">{st}</h1>
        </div>
        {/* <div className="mr-5">
          <button className="w-[140px] text-black rounded-3xl bg-purple-400 h-[42px]  active:bg-purple-500">
            Add User
          </button>
        </div> */}
      </div>
      <div className="flex overflow-x-scroll overflow-hidden lg:overflow-hidden lg:flex-nowrap lg:justify-around lg:gap-x-2  lg:max-w-[100vw] lg:mx-5">
        <div className=" min-w-[180px] min-h-[200px] lg:w-[300px] text-black rounded-3xl  bg-white border-1  flex flex-col  border-gray-100 shadow-md pl-5 pt-7 ml-5 lg:ml-0 ">
          <div className="w-[70px] h-[70px] bg-purple-200 rounded-full flex justify-center items-center ">
            T
          </div>
          <div className="flex flex-col">
            <p>Total Users</p>
            <h1 className="text-xl font-medium ">{result?.total}</h1>
          </div>
        </div>
        <div className=" min-w-[180px]  min-h-[200px] lg:w-[300px] text-black rounded-3xl ml-5 bg-white border-1  flex flex-col  border-gray-100 shadow-md pl-5 pt-7 ">
          <div className="w-[70px] h-[70px] bg-green-200 rounded-full flex justify-center items-center ">
            P
          </div>
          <div className="flex flex-col">
            <p>Total Professors</p>
            <h1 className="text-xl font-medium ">{result?.professor}</h1>
          </div>
        </div>
        <div className=" min-w-[180px]  min-h-[200px] lg:w-[300px] text-black rounded-3xl ml-5 bg-white border-1  flex flex-col  border-gray-100 shadow-md pl-5 pt-7 ">
          <div className="w-[70px] h-[70px] bg-sky-200 rounded-full flex justify-center items-center ">
            S
          </div>
          <div className="flex flex-col">
            <p>Total Students</p>
            <h1 className="text-xl font-medium ">{result?.student}</h1>
          </div>
        </div>
        <div className=" min-w-[180px]  min-h-[200px] lg:w-[300px] text-black rounded-3xl ml-5 bg-white border-1  flex flex-col  border-gray-100 shadow-md pl-5 pt-7 ">
          <div className="w-[70px] h-[70px] bg-orange-200 rounded-full flex justify-center items-center ">
            C
          </div>
          <div className="flex flex-col">
            <p>Total Courses</p>
            <h1 className="text-xl font-medium ">{result?.courses}</h1>
          </div>
        </div>
        <div className=" min-w-[180px]  min-h-[200px] lg:w-[300px] text-black rounded-3xl ml-5 bg-white border-1  flex flex-col  border-gray-100 shadow-md pl-5 pt-7 ">
          <div className="w-[70px] h-[70px] bg-gray-200 rounded-full flex justify-center items-center ">
            D
          </div>
          <div className="flex flex-col">
            <p>Total Departments</p>
            <h1 className="text-xl font-medium ">{result?.dept - 1}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
