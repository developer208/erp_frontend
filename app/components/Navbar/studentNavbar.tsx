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
type Props = {};

export default function StudNavbar({}: Props) {
  const router = useRouter();
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

  const [hamburgerState, setHamburgerState] = useState(true);
  return (
    <div className="border-b-2 fixed w-[100vw]   z-10  border-gray-700">
      <nav className="text-white   h-[70px] w-[100vw] bg-[#0077b6] flex justify-between bg-opacity-20 backdrop-filter backdrop-blur-lg   ">
        <div className="flex lg:gap-x-28">
          <div className="w-[70px] flex items-center hover:cursor-pointer mx-5  font-bold ">
            VIT
          </div>
          <div className="lg:flex w-[700px]  gap-x-16 lg:items-center hidden   ">
            <Link href="/admin/dashboard">
              <div className="hover:cursor-pointer hover:text-black">
                Dashboard
              </div>
            </Link>
            <Link href="/admin/dashboard/courses">
              <div className="hover:cursor-pointer hover:text-black">
                Result
              </div>
            </Link>
            <Link href="/admin/dashboard/departments">
              <div className="hover:cursor-pointer hover:text-black">
                Attendence
              </div>
            </Link>
          </div>
        </div>
        <div className="w-[130px]  lg:w-[130px]  flex items-center lg:justify-around hover:cursor-pointer justify-around mx-5 ">
          <div className=" hover:text-black">
            <PiUserCircle size={28} />
          </div>
          <div
            onClick={() => {
              mutation.mutate();
            }}
            className=" hidden lg:flex hover:text-black "
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
            ? "bg-[#212529] w-full  flex flex-col  lg:hidden absolute top-[-400px] "
            : "bg-[#212529] w-full  flex flex-col  lg:hidden absolute top-[70px]"
        }
      >
        <Link href="/admin/dashboard">
          <div
            className="hover:cursor-pointer border  border-gray-700 py-3 w-full flex justify-center text-white"
            onClick={() => setHamburgerState(!hamburgerState)}
          >
            Dashboard
          </div>
        </Link>
        <Link href="/admin/dashboard/courses">
          <div
            className="hover:cursor-pointer border  border-gray-700 py-3 w-full flex justify-center text-white"
            onClick={() => setHamburgerState(!hamburgerState)}
          >
            Result
          </div>
        </Link>
        <Link href="/admin/dashboard/departments">
          <div
            className="hover:cursor-pointer border  border-gray-700 py-3 w-full flex justify-center text-white"
            onClick={() => setHamburgerState(!hamburgerState)}
          >
            Attendence
          </div>
        </Link>
        <Link href="/">
          <div
            className="hover:cursor-pointer border  border-gray-700 py-3 w-full flex justify-center text-white"
            onClick={() => {
              mutation.mutate();
            }}
          >
            Logout
          </div>
        </Link>
      </div>
    </div>
  );
}
