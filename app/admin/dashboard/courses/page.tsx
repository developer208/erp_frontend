"use client";
import React, { useEffect, useState } from "react";
import { BsPlusLg, BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import Table from "../../../components/Table/Table";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "@/app/components/Loading/Loading";
import { courseData, fullDeptinfo } from "@/app/interface";
import {
  CourseDeleteButton,
  CourseEditButton,
} from "@/app/components/Button/Button";
import { ValueGetterParams } from "ag-grid-community";
import { CustomAxiosError } from "@/app/utils/customError";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function Course() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [sem, setSem] = useState("");
  const [dept, setDept] = useState("");
  let { data, isLoading, refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/course/all-courses?sem=${sem}&department=${dept}`,
        {
          withCredentials: true,
        }
      );
    },
  });
  const {
    data: data1,
    isLoading: isLoading1,
    refetch: refetch1,
  } = useQuery({
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
  const delMutation = useMutation({
    mutationKey: ["Delete-Course"],
    mutationFn: (id: string) => {
      return axios.delete(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/course/del-course?id=${id}`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess(data, variables, context) {
      toast.success(data.data.msg);
      refetch();
    },
    onError(error: CustomAxiosError, variables, context) {
      let message: string = error.response?.data?.msg
        ? error.response?.data?.msg
        : "Api Error";
      toast.error(message);
    },
  });
  let column = [
    { field: "id", filter: true },
    { field: "course_name", filter: true },
    { field: "credits" },
    { field: "sem" },
    { field: "department_name" },
    {
      field: "Edit",
      cellRenderer: (props: ValueGetterParams) => (
        <CourseEditButton func={handleEdit} {...props} />
      ),
      width: 90,
    },
    {
      field: "Delete",
      cellRenderer: (props: ValueGetterParams) => (
        <CourseDeleteButton func={handleDelete} {...props} />
      ),
      width: 90,
    },
  ];
  const deptData: Array<fullDeptinfo> = data1?.data.list;

  function handleEdit(props: courseData) {
    console.log(props);
    router.push(`/admin/dashboard/courses/${props.id}`);
  }
  function handleDelete(props: courseData) {
    delMutation.mutate(props.id);
  }

  useEffect(() => {
    refetch();
  }, [sem, dept]);

  return (
    <div className="w-[100vw] h-[350px] bg-[#212529] ">
      <div className="h-[70px]"></div>
      <div className="text-white mr-3 ">
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
                <select
                  onChange={(e) => setSem(e.target.value)}
                  className="bg-[#212529] text-white hover:cursor-pointer "
                >
                  <option hidden>Semester</option>
                  <option className="bg-[#212529]  " value="1">
                    One
                  </option>
                  <option className="bg-[#212529]  " value="2">
                    Two
                  </option>
                  <option className="bg-[#212529]  " value="3">
                    Three
                  </option>
                  <option className="bg-[#212529]  " value="4">
                    Four
                  </option>
                  <option className="bg-[#212529]  " value="5">
                    Five
                  </option>
                  <option className="bg-[#212529]  " value="6">
                    Six
                  </option>
                  <option className="bg-[#212529]  " value="7">
                    Seven
                  </option>
                  <option className="bg-[#212529]  " value="8">
                    Eight
                  </option>
                </select>
              </div>
              <div className="bg-[#212529] w-[150px] h-[40px] flex items-center justify-center  border-[1px] border-gray-600 rounded-3xl ">
                <select
                  onChange={(e) => setDept(e.target.value)}
                  className="bg-[#212529] text-white  hover:cursor-pointer"
                >
                  <option className="bg-[#212529]  " hidden>
                    Department
                  </option>
                  {deptData?.slice(1).map((item: fullDeptinfo) => {
                    return (
                      <option key={item.id} value={item.code}>
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
            {isLoading ? (
              <Loading />
            ) : (
              <Table rowData={data?.data.list} colDefs={column} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
