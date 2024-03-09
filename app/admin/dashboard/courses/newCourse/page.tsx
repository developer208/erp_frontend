"use client";
import React, { useEffect, useState } from "react";
import { FaBookBookmark } from "react-icons/fa6";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fullDeptinfo } from "@/app/interface";
import { toast } from "react-toastify";
import { CustomAxiosError } from "@/app/utils/customError";
import { useRouter } from "next/navigation";
type props = {};

export default function Page(Props: props) {
  const [file, setFile] = useState(null);
  const formData = new FormData();
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery({
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

  const [id, setID] = useState("");
  const [course_name, setCourseName] = useState("");
  const [credits, setCredits] = useState("");
  const [sem, setSem] = useState("");
  const [department_name, setDepartmentName] = useState("");
  const deptData: Array<fullDeptinfo> = data?.data.list;

  const mutation = useMutation({
    mutationKey: ["AddCourse"],
    mutationFn: () => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/course/add-course`,
        {
          id,
          course_name,
          credits: Number(credits),
          sem: Number(sem),
          department_name,
        },
        {
          withCredentials: true,
        }
      );
    },
    onSuccess(data, variables, context) {
      toast.success(data.data.msg);
      router.push("/admin/dashboard/courses");
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
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/course/add-multiple-course`,
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
      router.push("/admin/dashboard/courses");
    },
    onError(error: CustomAxiosError, variables, context) {
      let message: string = error.response?.data?.msg
        ? error.response?.data?.msg
        : "Api Error";
      toast.error(message);
    },
  });

  const handleAddCourse = (e: any) => {
    e.preventDefault();
    if (
      id !== "" &&
      course_name !== "" &&
      department_name !== "" &&
      sem !== "" &&
      credits !== ""
    ) {
      mutation.mutate();
    } else {
      toast.warning("Feild is Empty !");
    }
  };

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
    <main>
      <div className="w-[100vw] h-[350px] bg-[#212529]">
        <div className="h-[70px]"></div>
        <form className="flex w-[100vw] justify-end" onSubmit={handleSubmit}>
          <div className="w-[350px] mt-5 mr-5 flex flex-col items-end  gap-3   ">
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
        </form>
        <div className="mt-[80px] bg-[#dee2e6] min-h-[500px] mx-3 lg:mx-5">
          <div className="text-black h-[70px] flex gap-x-3 border-y-2 border-black">
            <h1 className="text-4xl mt-3 ml-5">New Course</h1>
            <div className="mt-3">
              <FaBookBookmark size={35} />
            </div>
          </div>
          <form className="flex flex-col lg:flex-row">
            <div className="lg:w-[50%] flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row  gap-y-2 my-4 ">
                <label className=" text-2xl mx-3 flex items-end " htmlFor="">
                  Id -
                </label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setID(e.target.value)}
                  className=" w-[90%] sm:w-[60%] h-[40px] border-b-2 bg-[#dee2e6] text-2xl border-black  mx-3 "
                />
              </div>
              <div className="flex flex-col sm:flex-row  gap-y-2 my-4 ">
                <label className=" text-2xl mx-3 flex items-end " htmlFor="">
                  Name -
                </label>
                <input
                  type="text"
                  value={course_name}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-[60%] h-[40px] border-b-2 bg-[#dee2e6] text-2xl border-black  mx-3 "
                />
              </div>
              <div className="flex flex-col sm:flex-row  gap-y-2 my-4 ">
                <label className=" text-2xl mx-3 flex items-end " htmlFor="">
                  Credits -
                </label>
                <input
                  type="number"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  className="w-[60%] h-[40px] border-b-2 bg-[#dee2e6] text-2xl border-black  mx-3 "
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-y-2 my-4 ">
                <label className=" text-2xl mx-3 flex items-end " htmlFor="">
                  Semester -
                </label>
                <input
                  type="number"
                  value={sem}
                  onChange={(e) => setSem(e.target.value)}
                  className="w-[60%] h-[40px] border-b-2 bg-[#dee2e6] text-2xl border-black  mx-3 "
                />
              </div>
              <div className="flex   gap-y-2 my-4 ">
                <label className=" text-2xl mx-3 flex items-end " htmlFor="">
                  Department -
                </label>
                <select
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className=" ml-3 bg-[#dee2e6] w-[160px] border-[1px]  border-gray-500 rounded-md"
                >
                  <option value="" hidden>
                    select Dept
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
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={(e) => handleAddCourse(e)}
                  className="w-[140px] mr-5 mb-4 text-black rounded-3xl bg-purple-400 h-[42px]  active:bg-purple-500"
                >
                  Add User
                </button>
              </div>
            </div>
            <div className="lg:w-[50%]   ">
              <h1 className="flex justify-center items-centers">
                svg IMAGE Right
              </h1>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
