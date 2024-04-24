"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Table from "@/app/components/Table/Table";
import { BsPlusLg, BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { fullDeptinfo, fullUserData } from "@/app/interface";
import { customUserList } from "@/app/utils/getRole";
import { CustomAxiosError } from "@/app/utils/customError";
import { toast } from "react-toastify";
import {
  EnrollButton,
  StudentDetails,
  ViewAssigned,
} from "@/app/components/Button/Button";
import { ValueGetterParams } from "ag-grid-community";
import { useRouter } from "next/navigation";
import YearPicker from "react-year-picker";
import { cal_data } from "@/app/utils/CalData";
type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isUp, setIsUp] = useState(false);
  const [dept, setDept] = useState("");
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [batch, setBatch] = useState("");
  const formData = new FormData();
  const formData1 = new FormData();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/student/students-list?dept=${dept}&batch=${batch}`,
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
    router.push(`/admin/dashboard/students/enroll/${props.id}`);
  };

  const view = (props: fullUserData) => {
    router.push(`/admin/dashboard/students/subjects/${props.id}`);
  };

  useEffect(() => {
    refetch();
  }, [dept, batch]);

  const deptFullData: Array<fullDeptinfo> = deptData?.data.list;

  let column = [
    { field: "rollNo", filter: true },
    { field: "email" },
    { headerName: "Department", field: "department_name" },
    {
      field: "Result",
      cellRenderer: (props: ValueGetterParams) => <StudentDetails />,
    },
    {
      field: "Attendence",
      cellRenderer: (props: ValueGetterParams) => <StudentDetails />,
    },
  ];
  console.log(data);

  const mutation = useMutation({
    mutationKey: ["result-data"],
    mutationFn: () => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api`,
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
      router.push("/admin/dashboard/users");
    },
    onError(error: CustomAxiosError, variables, context) {
      let message: string = error.response?.data?.msg
        ? error.response?.data?.msg
        : "Api Error";
      toast.error(message);
    },
  });

  const mutation1 = useMutation({
    mutationKey: ["Attendence-alert"],
    mutationFn: () => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/attendence/add-multiple`,
        formData1,
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
    },
    onError(error: CustomAxiosError, variables, context) {
      let message: string = error.response?.data?.msg
        ? error.response?.data?.msg
        : "Api Error";
      toast.error(message);
    },
  });

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

  const handleFileChange1 = (e: any) => {
    const selectedFile1 = e.target.files[0];
    setFile1(selectedFile1);
  };

  const handleSubmit1 = (e: any) => {
    e.preventDefault();
    if (file1) {
      formData1.append("file", file1);
    }
    mutation1.mutate();
  };
  return (
    <main className="">
      <div className="w-[100vw] min-h-[350px] bg-slate-700">
        <div className="h-[70px]"></div>
        <div className="mr-3 min-h-auto ">
          <div className="flex flex-col lg:flex-row gap-y-5  lg:justify-between lg:items-center  min-h-[120px] mb-5 ">
            <div className="w-[250px] ml-5 ">
              <h1 className="text-3xl mt-10 lg:mt-0 text-white">Academics</h1>
            </div>
            <div className="flex lg:flex-row lg:mt-5 flex-col gap-y-2  gap-x-5 ">
              <div className="bg-slate-600 lg:bg-slate-800 lg:min-w-[400px]  mx-5 lg:mx-0 rounded-md ">
                <form className="flex justify-end" onSubmit={handleSubmit}>
                  <div className="w-[300px] mt-5 flex flex-col items-end  gap-3   ">
                    <div className="h-full flex flex-col gap-3 ">
                      <h1 className="text-violet-300 font-semibold text-3xl">
                        Results
                      </h1>
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
                      className="w-[100px] text-black rounded-sm bg-purple-400 h-[42px]  active:bg-purple-500 mr-5 mb-5  "
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div className="bg-slate-600 lg:bg-slate-800 lg:min-w-[400px] mx-5 lg:mx-0 rounded-md ">
                <form className="flex justify-end" onSubmit={handleSubmit1}>
                  <div className="w-[300px] mt-5 flex flex-col items-end  gap-3   ">
                    <div className="h-full flex flex-col gap-3 ">
                      <h1 className="text-violet-300 font-semibold text-3xl">
                        Attendence
                      </h1>
                      <h1 className="text-white font-bold text-2xl py-2 ">
                        Add Excel (.csv)
                      </h1>
                      <input
                        type="file"
                        className="w-[300px] rounded-md hover:cursor-pointer text-white "
                        onChange={handleFileChange1}
                        name="file"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-[100px] text-black rounded-sm bg-purple-400 h-[42px]  active:bg-purple-500 mr-5 mb-5 "
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-col-reverse gap-y-3 lg:flex-row lg:gap-y-0 mb-5">
            <div className="flex gap-x-3 ml-5">
              <div className="bg-slate-700 shadow-md w-[140px] h-[40px] flex items-center justify-center  border-[1px] border-gray-600 rounded-3xl ">
                <select
                  onChange={(e) => setDept(e.target.value)}
                  className="bg-slate-700 shadow-md text-white  "
                >
                  <option className="bg-slate-700 shadow-md " hidden>
                    Department
                  </option>
                  {deptFullData?.slice(1)?.map((item: fullDeptinfo) => {
                    return (
                      <option
                        key={item.id}
                        className="bg-slate-700 shadow-md "
                        value={item.code}
                      >
                        {item.code}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="bg-slate-700 shadow-md w-[140px] h-[40px] flex items-center justify-center  border-[1px] border-gray-600 rounded-3xl ">
                <select
                  onChange={(e) => setBatch(e.target.value)}
                  className="bg-slate-700 shadow-md text-white  "
                >
                  <option className="bg-slate-700 shadow-md  " hidden>
                    Batch
                  </option>
                  {cal_data?.map((item: string) => {
                    return (
                      <option
                        key={item}
                        className="bg-slate-700 shadow-md "
                        value={item}
                      >
                        {item}
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
