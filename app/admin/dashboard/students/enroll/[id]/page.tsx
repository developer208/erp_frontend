"use client";
import React, { useState, useEffect } from "react";
import { BsPlusLg, BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import Table from "../../../../../components/Table/Table";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "@/app/components/Loading/Loading";
import { AddToCourse } from "@/app/components/Button/Button";
import { ValueGetterParams } from "ag-grid-community";
import { courseData, fullDeptinfo } from "@/app/interface";
import { Year } from "@/app/utils/customYear";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { CustomAxiosError } from "@/app/utils/customError";
export default function Page() {
  const [sem, setSem] = useState("");
  const [dept, setDept] = useState("");
  const params = useParams<{ id: string }>();
  const [isActive, setIsActive] = useState(false);
  const [file, setFile] = useState(null);
  const formData = new FormData();
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

  const mutation = useMutation({
    mutationKey: ["Enroll"],
    mutationFn: (i: courseData) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/enroll/add`,
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

  const mutation1 = useMutation({
    mutationKey: ["RegisterMultiple"],
    mutationFn: () => {
      console.log(formData.get("file"));
      return axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/auth/registerMultiple`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess(data, variables, context) {
      toast.success(data.data.msg);
      // router.push("/admin/dashboard/users");
    },
    onError(error: CustomAxiosError, variables, context) {
      let message: string = error.response?.data?.msg
        ? error.response?.data?.msg
        : "Api Error";
      toast.error(message);
    },
  });

  const handleAdd = (props: courseData) => {
    mutation.mutate(props);
  };

  let column = [
    { field: "id", filter: true },
    { field: "course_name", filter: true },
    { field: "credits" },
    { field: "sem" },
    { field: "department_name" },
    {
      field: "Enroll",
      cellRenderer: (props: ValueGetterParams) => (
        <AddToCourse func={handleAdd} {...props} />
      ),
    },
  ];

  const deptData: Array<fullDeptinfo> = data1?.data.list;
  useEffect(() => {
    refetch();
  }, [sem, dept]);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (file) {
      formData.append("file", file);
    }
    console.log(file);
    mutation1.mutate();
  };

  return (
    <main className="">
      <div className="w-[100vw] h-[350px] bg-[#212529]    ">
        <div className="h-[70px]"></div>
        <div className="text-white">
          <div className="h-[280px] bg-[#212529]  ">
            <div className="flex  flex-row justify-between items-center ml-5  min-h-[120px] mb-5  ">
              {/* <form className="flex justify-end" onSubmit={handleSubmit}>
                <div className="w-[300px] mt-5 flex flex-col items-end  gap-3 mr-5    ">
                  <div className="h-full flex flex-col gap-3 ">
                    <h1 className="text-white font-bold text-2xl py-2 ">
                      Add Excel (.csv)
                    </h1>
                    <input
                      type="file"
                      className="w-[300px] rounded-md hover:cursor-pointer text-white "
                      onChange={handleFileChange}
                      name="file"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-[100px] text-black rounded-sm bg-purple-400 h-[42px]  active:bg-purple-500 mr-5  "
                  >
                    Add
                  </button>
                </div>
              </form> */}
            </div>
            <div className="flex justify-between flex-col-reverse gap-y-3 lg:flex-row lg:gap-y-0 mb-5  ">
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
                <Table rowData={data?.data.list} colDefs={column} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
