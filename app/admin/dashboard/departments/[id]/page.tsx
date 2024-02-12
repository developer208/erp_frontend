"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FcDepartment } from "react-icons/fc";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { CustomAxiosError } from "@/app/utils/customError";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
type props = {};

export default function Page(Props: props) {
  const [isUp, setIsUp] = useState(false);
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["department"],
    queryFn: () => {
      return axios.get(
        `http://localhost:4500/backend-api/department/info-department?code=${params.id}`,
        {
          withCredentials: true,
        }
      );
    },
    enabled: true,
  });

  const [name, setName] = useState(data?.data.data.code);
  const [code, setCode] = useState(data?.data.data.name);

  const editMutation = useMutation({
    mutationKey: ["editDept"],
    mutationFn: (code1: string) => {
      return axios.put(
        `http://localhost:4500/backend-api/department/edit-department?code=${code1}`,
        { name, code },
        {
          withCredentials: true,
        }
      );
    },
    onSuccess(data, variables, context) {
      toast.success(data.data.msg);
      router.push("/admin/dashboard/departments");
    },
    onError(error: CustomAxiosError, variables, context) {
      let message: string = error.response?.data?.msg
        ? error.response?.data?.msg
        : "Api Error";
      toast.error(message);
    },
  });

  const handleEditDepartment = (e: any) => {
    e.preventDefault();
    if (name !== "" && code !== "") {
      editMutation.mutate(params.id);
    } else {
      toast.warning("feild is empty");
    }
  };

  let column = [
    { field: "code", filter: true },
    { field: "name", filter: true },
  ];

  useEffect(() => {
    setCode(data?.data.data.code);
    setName(data?.data.data.name);
    console.log("useEffect Ran");
  }, [data]);

  useEffect(() => {
    return () => {
      setCode("");
      setName("");
    };
  }, []);

  return (
    <main>
      <div className="h-[350px] bg-[#212529]  ">
        <div className="pt-[70px]"></div>
        <div className="flex justify-between items-center  h-[120px] ">
          <div className="w-[250px] ml-5 ">
            <h1 className="text-2xl text-white">Departments</h1>
          </div>
          <div className="mr-5 hidden ">
            <button
              onClick={() => setIsUp((val) => !val)}
              className="w-[100px] flex items-center gap-x-2 text-black rounded-3xl bg-purple-400 h-[42px]  active:bg-purple-500"
            >
              <p className="pl-5">Add </p>
              {isUp ? (
                <div className="ml-3">
                  <IoIosArrowDown size={20} />
                </div>
              ) : (
                <div className="ml-3">
                  <IoIosArrowUp size={20} />
                </div>
              )}
            </button>
          </div>
        </div>
        <div
          className="flex flex-col
          lg:flex-row  "
        >
          <div className="lg:w-[40%] min-h-[500px]">
            <div className="mt-[10px] bg-[#dee2e6] h-[400px] mx-3 lg:mx-5 rounded-md">
              <div className="text-black h-[70px] flex gap-x-3 border-y-2 border-black">
                <h1 className=" text-2xl sm:text-4xl mt-3 ml-5 flex items-center ">
                  Edit Department {params.id}
                </h1>
                <div className="mt-3 flex items-center ">
                  <FcDepartment size={35} />
                </div>
              </div>
              <form action="#" method="POST" className="">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row  gap-y-2 my-4 ">
                    <label
                      className=" text-2xl mx-3 flex items-end "
                      htmlFor=""
                    >
                      Name -
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className=" w-[90%] sm:w-[60%] h-[40px] border-b-2 bg-[#dee2e6] text-2xl border-black  mx-3 "
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row  gap-y-2 my-4 ">
                    <label
                      className=" text-2xl mx-3 flex items-end "
                      htmlFor=""
                    >
                      Code -
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-[60%] h-[40px] border-b-2 bg-[#dee2e6] text-2xl border-black  mx-3 "
                    />
                  </div>
                  <div className="flex  justify-end">
                    <button
                      type="button"
                      onClick={(e) => handleEditDepartment(e)}
                      className="w-[140px] mr-5 mb-4 text-black rounded-3xl bg-purple-400 h-[42px]  active:bg-purple-500"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
