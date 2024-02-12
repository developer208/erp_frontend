"use client";
import React, { useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { PiUserCircle } from "react-icons/pi";
import Link from "next/link";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { CustomAxiosError } from "@/app/utils/customError";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
type Props = {};

export default function ProfNavbar({}: Props) {
  const [hamburgerState, setHamburgerState] = useState(true);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const mutation = useMutation({
    mutationKey: ["Logout"],
    mutationFn: () => {
      return axios.post(
        "http://localhost:4500/backend-api/auth/logout",
        undefined,
        {
          withCredentials: true, // Include credentials (cookies) with the request
        }
      );
    },
    onSuccess(data, variables, context) {
      toast.success(data.data?.msg);
      router.replace("/");
    },
    onError(error: CustomAxiosError, variables, context) {
      let message: string = error.response?.data?.msg
        ? error.response?.data?.msg
        : "something went wrong";
      toast.error(message);
      router.replace("/");
    },
  });

  return (
    <div className="border-b-2 fixed w-[100vw]   z-10  shadow-xl ">
      <nav className="text-black   h-[70px] w-[100vw] bg-[white] flex justify-between  ">
        <div className="flex lg:gap-x-28">
          <div className="w-[70px] flex items-center hover:cursor-pointer mx-5  font-bold ">
            VIT
          </div>
          <div className="lg:flex w-[700px]  gap-x-16 lg:items-center hidden   ">
            <Link href={`/professor/dashboard/${params.id}`}>
              <div className="hover:cursor-pointer hover:font-bold">
                Dashboard
              </div>
            </Link>
            <Link href={`/professor/dashboard/${params.id}/students`}>
              <div className="hover:cursor-pointer hover:font-bold">
                Student
              </div>
            </Link>
            <Link href="/admin/dashboard/courses">
              <div className="hover:cursor-pointer hover:font-bold">Result</div>
            </Link>
            <Link href={`/professor/dashboard/${params.id}`}>
              <div className="hover:cursor-pointer hover:font-bold">
                Attendence
              </div>
            </Link>
          </div>
        </div>
        <div className="w-[130px]  lg:w-[130px]  flex items-center lg:justify-start lg:gap-2 hover:cursor-pointer justify-around mx-5 ">
          <div className=" hover:font-bold">
            <PiUserCircle size={28} />
          </div>
          <div
            onClick={() => {
              mutation.mutate();
            }}
            className=" hidden lg:flex hover:font-bold "
          >
            Logout
          </div>

          {hamburgerState ? (
            <div
              className="lg:hidden ml-3 "
              onClick={() => setHamburgerState(!hamburgerState)}
            >
              <RxHamburgerMenu size={28} />
            </div>
          ) : (
            <div
              className="lg:hidden ml-3"
              onClick={() => setHamburgerState(!hamburgerState)}
            >
              <RxCross1 size={28} />
            </div>
          )}
        </div>
      </nav>
      <div
        className={
          hamburgerState
            ? "bg-[white] w-full  flex flex-col  lg:hidden absolute top-[-400px] "
            : "bg-[white] w-full  flex flex-col  lg:hidden absolute top-[70px]"
        }
      >
        <Link href={`/professor/dashboard/${params.id}`}>
          <div
            className="hover:cursor-pointer border  border-gray-700 py-3 w-full flex justify-center text-black"
            onClick={() => setHamburgerState(!hamburgerState)}
          >
            Dashboard
          </div>
        </Link>
        <Link href={`/professor/dashboard/${params.id}/students`}>
          <div
            className="hover:cursor-pointer border  border-gray-700 py-3 w-full flex justify-center text-black"
            onClick={() => setHamburgerState(!hamburgerState)}
          >
            Student
          </div>
        </Link>
        <Link href={`/professor/dashboard/${params.id}`}>
          <div
            className="hover:cursor-pointer border  border-gray-700 py-3 w-full flex justify-center text-black"
            onClick={() => setHamburgerState(!hamburgerState)}
          >
            Result
          </div>
        </Link>
        <Link href={`/professor/dashboard/${params.id}`}>
          <div
            className="hover:cursor-pointer border  border-gray-700 py-3 w-full flex justify-center text-black"
            onClick={() => setHamburgerState(!hamburgerState)}
          >
            Attendence
          </div>
        </Link>

        <div
          className="hover:cursor-pointer border  border-gray-700 py-3 w-full flex justify-center text-black"
          onClick={() => {
            mutation.mutate();
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
}
