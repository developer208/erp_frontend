"use client";
import React, { useEffect, useState } from "react";
import { obj, properties } from "@/app/utils/data";
import { HiOutlineRefresh } from "react-icons/hi";
import Table from "@/app/components/Table/Table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loading } from "@/app/components/Loading/Loading";
import { ValueGetterParams } from "ag-grid-community";
import { customAssignData } from "@/app/utils/customData";
import { useParams } from "next/navigation";
import axios from "axios";
interface Props {
  params: {
    id: number;
  };
}

interface type {
  msg: string;
  type: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

const initialData: type = {
  msg: "",
  type: "",
  user: {
    firstName: "",
    lastName: "",
  },
};

export default function Page(props: Props) {
  const [data, setData] = useState<type>(initialData);
  const params = useParams<{ id: string }>();
  let {
    data: data1,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigned-courses"],
    queryFn: () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/admin/assigned-courses?sem=&year=&user_id=${params.id}`,
        {
          withCredentials: true,
        }
      );
    },
  });

  let mutation = useMutation({
    mutationKey: ["profile"],
    mutationFn: () => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/auth/me`,
        {},
        {
          withCredentials: true,
        }
      );
    },
    onSuccess(data, variables, context) {
      setData(data.data);
    },
  });

  let column = [
    { field: "id", filter: true },
    { field: "course_name", filter: true },
    { field: "credits" },
    { field: "sem" },
    { field: "department_name" },
    { field: "year" },
  ];

  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <main className="w-[100vw] min-h-[100vh] bg-white  ">
      <div className=" h-[300px] pt-[70px] w-[100vw] bg-slate-50">
        <div className="text-black flex flex-col gap-2 w-[300px] h-auto ml-5  mt-10   ">
          <h1 className="text-3xl text-purple-700 font-bold ">Welcome</h1>
          <h3 className="text-2xl text-gray-600 ">
            Prof . {data.user.firstName} {data.user.lastName}
          </h3>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row px-5  mt-[-50px]   z-10 h-auto  overflow-hidden ">
        <div className="lg:w-[70%] h-full flex flex-col gap-2 lg:mr-2 ">
          <div className="min-h-[400px] bg-gray-100 ">
            <div className="w-auto flex gap-2 items-center pl-5 ">
              <div className="w-[30px] h-[30px] ">
                <img
                  src="https://res.cloudinary.com/dqyvomyqy/image/upload/v1710419316/erp/n3gbxg0ckeci5vozx4m5.png"
                  alt="course_img"
                />
              </div>
              <h1 className="p-3 text-xl font-semibold text-gray-600 ">
                Courses Under me
              </h1>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <Table
                rowData={customAssignData(data1?.data.list)}
                colDefs={column}
              />
            )}
          </div>
          <div className="h-[400px] bg-gray-100 ">2</div>
        </div>
        <div className="h-[500px] lg:w-[30%] lg:ml-2  rounded-lg  bg-gray-100 ">
          <div className="h-auto flex items-center gap-5 pl-4 py-2 border-b-2 border-gray-300 ">
            <div className="flex gap-3">
              <img
                src="https://res.cloudinary.com/dqyvomyqy/image/upload/v1710412527/erp/wgmkbgzg98atkjluppwi.png"
                alt="Mail"
                width={30}
                height={30}
              />
              <h1 className="text-2xl text-violet-800 ">Gmail Inbox</h1>
            </div>
            <div className="w-[30px] h-[30px] pt-[2px] ">
              <HiOutlineRefresh
                size={26}
                className="active: pt-1 cursor-pointer active:-rotate-[360deg] active:duration-1000  "
              />
            </div>
          </div>
          <div className="h-[450px] w-full overflow-y-scroll overflow-x-hidden flex flex-col ">
            {obj.map((item: properties) => {
              return (
                <div
                  key={item.id}
                  className="h-auto flex gap-2 my-2 border-2 border-gray-200 shadow-md  "
                >
                  <div className="w-[50px] h-[50px] m-2 flex justify-center items-center text-2xl font-bold border-2 rounded-full shadow-inner bg-blue-400 ">
                    {item.to.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="flex flex-col gap-2 p-2 ">
                    <div className="flex gap-2">
                      <h1 className="text-lg font-bold flex ">To :</h1>
                      <h3 className="flex items-center  ">{item.to}</h3>
                    </div>
                    <div className="flex gap-2 ">
                      <h1 className="text-lg font-bold flex ">Body :</h1>
                      <h3 className="flex items-center  ">{item.body}</h3>
                    </div>
                    <div className="flex gap-2">
                      <h1 className="text-lg font-bold flex ">Status :</h1>
                      <h3 className="flex items-center text-green-700  ">
                        {item.status}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
