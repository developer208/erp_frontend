"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { FaBookBookmark } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fullDeptinfo } from "@/app/interface";
import { toast } from "react-toastify";
export default function Page() {
  const params = useParams<{ id: string }>();
  const [id, setID] = useState("");
  const [course_name, setCourseName] = useState("");
  const [credits, setCredits] = useState("");
  const [sem, setSem] = useState("");
  const [department_name, setDepartmentName] = useState("");

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
  const deptData: Array<fullDeptinfo> = data?.data.list;

  const handleAddCourse = (e: any) => {
    e.preventDefault();
    if (
      id !== "" &&
      course_name !== "" &&
      department_name !== "" &&
      sem !== "" &&
      credits !== ""
    ) {
    } else {
      toast.warning("Feild is Empty !");
    }
  };

  return (
    <main className="w-[100vw] h-[350px] bg-[#212529]">
      <div className="w-[100vw] h-[70px] bg-[#212529]"></div>
      <div className="mt-[80px] bg-[#dee2e6] min-h-[500px] mx-3 lg:mx-5 rounded-lg lg:mt-[100px] ">
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
    </main>
  );
}
