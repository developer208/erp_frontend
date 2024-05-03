"use client";
import React, { useState } from "react";
import { BsPlusLg, BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import Table from "../../../../../components/Table/Table";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "@/app/components/Loading/Loading";
import { AddToCourse, RemoveAssign } from "@/app/components/Button/Button";
import { ValueGetterParams } from "ag-grid-community";
import { courseData } from "@/app/interface";
import { Year } from "@/app/utils/customYear";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { CustomAxiosError } from "@/app/utils/customError";
import { customAssignData } from "@/app/utils/customData";
export default function Page() {
  const params = useParams<{ id: string }>();
  const [isActive, setIsActive] = useState(false);
  let { data, isLoading, refetch } = useQuery({
    queryKey: ["assigned-courses"],
    queryFn: () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/admin/enrolled-courses?sem=&year=&user_id=${params.id}`,
        {
          withCredentials: true,
        }
      );
    },
  });

  const mutation = useMutation({
    mutationKey: ["Assign"],
    mutationFn: (i: courseData) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/assign/add`,
        {
          user_id: Number(params.id),
          course_id: i.id,
          sem: i.sem,
          year: Year(),
        },
        {
          withCredentials: true,
        }
      );
    },
    onSuccess(data, variables, context) {
      toast.success(data.data.msg);
    },
    onError(error: CustomAxiosError, variables, context) {
      let message: string = error.response?.data?.msg
        ? error.response?.data?.msg
        : "Api Error";
      toast.error(message);
    },
  });

  const handleRemove = (props: courseData) => {
    mutation.mutate(props);
  };

  let column = [
    { field: "id", filter: true },
    { field: "course_name", filter: true },
    { field: "credits" },
    { field: "sem" },
    { field: "department_name" },
    { field: "year" },
    {
      field: "Remove",
      cellRenderer: (props: ValueGetterParams) => (
        <RemoveAssign func={handleRemove} {...props} />
      ),
    },
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
              {isLoading ? (
                <Loading />
              ) : (
                <Table
                  rowData={customAssignData(data?.data.list)}
                  colDefs={column}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
