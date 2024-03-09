"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Table from "../../../components/Table/Table";
import { BsPlusLg, BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fullDeptinfo, fullUserData } from "@/app/interface";
import { customUserList } from "@/app/utils/getRole";
import { AssignButton, ViewAssigned } from "@/app/components/Button/Button";
import { ValueGetterParams } from "ag-grid-community";
import { useRouter } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isUp, setIsUp] = useState(false);
  const [dept, setDept] = useState("");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["professors"],
    queryFn: () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/admin/professors?department=${dept}`,
        {
          withCredentials: true,
        }
      );
    },
  });

  const { data: deptData } = useQuery({
    queryKey: ["departments"],
    queryFn: () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/department/all-department`,
        {
          withCredentials: true,
        }
      );
    },
  });

  const handleEnroll = (props: fullUserData) => {
    router.push(`/admin/dashboard/professors/assign/${props.id}`);
  };

  const view = (props: fullUserData) => {
    router.push(`/admin/dashboard/professors/subjects/${props.id}`);
  };

  useEffect(() => {
    refetch();
  }, [dept]);

  const deptFullData: Array<fullDeptinfo> = deptData?.data.list;

  let column = [
    { field: "rollNo", filter: true },
    { field: "firstName", filter: true },
    { field: "middleName" },
    { field: "lastName" },
    { field: "email" },
    { field: "phoneNo" },
    { field: "role" },
    { headerName: "Department", field: "department_name" },
    {
      field: "Assign",
      cellRenderer: (props: ValueGetterParams) => (
        <AssignButton func={handleEnroll} {...props} />
      ),
    },
    {
      field: "Subjects",
      cellRenderer: (props: ValueGetterParams) => (
        <ViewAssigned func={view} {...props} />
      ),
    },
  ];
  console.log(data);
  return (
    <main className="">
      <div className="w-[100vw] h-[350px] bg-[#212529]">
        <div className="h-[70px]"></div>
        <div className="mr-3">
          <div className="flex justify-between items-center  h-[120px] ">
            <div className="w-[250px] ml-5 ">
              <h1 className="text-2xl text-white">Professors</h1>
            </div>
          </div>
          <div className="flex justify-between flex-col-reverse gap-y-3 lg:flex-row lg:gap-y-0 mb-5">
            <div className="flex gap-x-3 ml-5">
              <div className="bg-[#212529] w-[140px] h-[40px] flex items-center justify-center  border-[1px] border-gray-600 rounded-3xl ">
                <select
                  onChange={(e) => setDept(e.target.value)}
                  className="bg-[#212529] text-white  "
                >
                  <option className="bg-[#212529] " hidden>
                    Department
                  </option>
                  {deptFullData?.slice(1)?.map((item: fullDeptinfo) => {
                    return (
                      <option
                        key={item.id}
                        className="bg-[#212529] "
                        value={item.code}
                      >
                        {item.code}
                      </option>
                    );
                  })}
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
            <Table rowData={customUserList(data?.data.list)} colDefs={column} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Page;
