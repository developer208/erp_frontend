"use client";
import React from "react";
import { NewsAndEvents } from "./NewsAndEvents";
import Chart from "./Chart";
type Props = {};

export default function Attendence({}: Props) {
  return (
    <div className="text-black w-full min-h-[450px]   flex flex-col lg:flex-row mt-[50px]   gap-y-3 lg:gap-x-2 ">
      <div className="lg:w-[40%] h-[350px] lg:min-h-[400px] mx-5 lg:ml-5 pt-5 lg:pl-5 bg-white rounded-lg ">
        <Chart />
      </div>
      <div className="lg:w-[60%] h-[350px] lg:min-h-[400px] mx-5  lg:mr-5 bg-white  rounded-lg ">
        <NewsAndEvents />
      </div>
    </div>
  );
}
