"use client";
import React, { useState } from "react";
import Link from "next/link";
import Table from "../../../components/Table/Table";
import { BsPlusLg, BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
type Props = {};

const Page = (props: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [isUp, setIsUp] = useState(false);
  let data = [
    {
      RollNo: "20101A0015",
      FirstName: "Vedang",
      MiddleName: "Vijay",
      LastName: "Mule",
      Email: "vedang.mule@vit.edu.in",
      PhoneNo: 9049334860,
      Role: "Student",
      Department: "INFT",
      JoiningDate: "2020",
      LeavingDate: "2024",
    },
    {
      RollNo: "20101A0016",
      FirstName: "Sarvesh",
      MiddleName: "Sachin",
      LastName: "Damle",
      Email: "sarvesh.damle@vit.edu.in",
      PhoneNo: 9923134963,
      Role: "Student",
      Department: "INFT",
      JoiningDate: "2020",
      LeavingDate: "2024",
    },
    {
      RollNo: "20101A0017",
      FirstName: "Lokesh",
      MiddleName: "GovindRao",
      LastName: "Bagul",
      Email: "lokesh.bagul@vit.edu.in",
      PhoneNo: 9579548171,
      Role: "Student",
      Department: "INFT",
      JoiningDate: "2020",
      LeavingDate: "2024",
    },
    {
      RollNo: "20101A0015",
      FirstName: "Vedang",
      MiddleName: "Vijay",
      LastName: "Mule",
      Email: "vedang.mule@vit.edu.in",
      PhoneNo: 9049334860,
      Role: "Student",
      Department: "INFT",
      JoiningDate: "2020",
      LeavingDate: "2024",
    },
    {
      RollNo: "20101A0016",
      FirstName: "Sarvesh",
      MiddleName: "Sachin",
      LastName: "Damle",
      Email: "sarvesh.damle@vit.edu.in",
      PhoneNo: 9923134963,
      Role: "Student",
      Department: "INFT",
      JoiningDate: "2020",
      LeavingDate: "2024",
    },
    {
      RollNo: "20101A0017",
      FirstName: "Lokesh",
      MiddleName: "GovindRao",
      LastName: "Bagul",
      Email: "lokesh.bagul@vit.edu.in",
      PhoneNo: 9579548171,
      Role: "Student",
      Department: "INFT",
      JoiningDate: "2020",
      LeavingDate: "2024",
    },
    {
      RollNo: "20101A0015",
      FirstName: "Vedang",
      MiddleName: "Vijay",
      LastName: "Mule",
      Email: "vedang.mule@vit.edu.in",
      PhoneNo: 9049334860,
      Role: "Student",
      Department: "INFT",
      JoiningDate: "2020",
      LeavingDate: "2024",
    },
    {
      RollNo: "20101A0016",
      FirstName: "Sarvesh",
      MiddleName: "Sachin",
      LastName: "Damle",
      Email: "sarvesh.damle@vit.edu.in",
      PhoneNo: 9923134963,
      Role: "Student",
      Department: "INFT",
      JoiningDate: "2020",
      LeavingDate: "2024",
    },
    {
      RollNo: "20101A0017",
      FirstName: "Lokesh",
      MiddleName: "GovindRao",
      LastName: "Bagul",
      Email: "lokesh.bagul@vit.edu.in",
      PhoneNo: 9579548171,
      Role: "Student",
      Department: "INFT",
      JoiningDate: "2020",
      LeavingDate: "2024",
    },
    {
      RollNo: "20101A0015",
      FirstName: "Vedang",
      MiddleName: "Vijay",
      LastName: "Mule",
      Email: "vedang.mule@vit.edu.in",
      PhoneNo: 9049334860,
      Role: "Student",
      Department: "INFT",
      JoiningDate: "2020",
      LeavingDate: "2024",
    },
    {
      RollNo: "20101A0016",
      FirstName: "Sarvesh",
      MiddleName: "Sachin",
      LastName: "Damle",
      Email: "sarvesh.damle@vit.edu.in",
      PhoneNo: 9923134963,
      Role: "Student",
      Department: "INFT",
      JoiningDate: "2020",
      LeavingDate: "2024",
    },
    {
      RollNo: "20101A0017",
      FirstName: "Lokesh",
      MiddleName: "GovindRao",
      LastName: "Bagul",
      Email: "lokesh.bagul@vit.edu.in",
      PhoneNo: 9579548171,
      Role: "Student",
      Department: "INFT",
      JoiningDate: "2020",
      LeavingDate: "2024",
    },
  ];
  let column = [
    { field: "RollNo", filter: true },
    { field: "FirstName", filter: true },
    { field: "LastName" },
    { field: "Email" },
    { field: "PhoneNo" },
    { field: "Role" },
    { field: "Department" },
    { field: "JoiningDate" },
    { field: "LeavingDate" },
  ];
  return (
    <main className="">
      <div className="w-[100vw] h-[350px] bg-[#212529]">
        <div className="h-[70px]"></div>
        <div className="">
          <div className="flex justify-between items-center  h-[120px] ">
            <div className="w-[250px] ml-5 ">
              <h1 className="text-2xl text-white">Professors</h1>
            </div>
          </div>
          <div className="flex justify-between flex-col-reverse gap-y-3 lg:flex-row lg:gap-y-0 mb-5">
            <div className="flex gap-x-3 ml-5">
              <div className="bg-[#212529] w-[140px] h-[40px] flex items-center justify-center  border-[1px] border-gray-600 rounded-3xl ">
                <select className="bg-[#212529] text-white  ">
                  <option className="bg-[#212529] " hidden>
                    Branch
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
                <AiOutlineUnorderedList size={20} style={{ color: "white" }} />
              </div>
            </div>
          </div>
          <div className="mt-[60px]">
            <Table rowData={data} colDefs={column} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Page;
