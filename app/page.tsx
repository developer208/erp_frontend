"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CustomAxiosError } from "./utils/customError";
import { getRole } from "./utils/getRole";
interface Credential {
  email: string;
  password: string;
}

export default function Home() {
  const [pass, setPassword] = useState("");
  const [uname, setUsername] = useState("");

  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (cred: Credential) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/auth/login`,
        cred,
        {
          withCredentials: true, // Include credentials (cookies) with the request
        }
      );
    },
    onSuccess(data, variables, context) {
      let access: string = getRole(data.data.role);
      toast.success(data.data?.msg);
      if (access === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (access === "PROFESSOR") {
        router.push(`/professor/dashboard/${data.data.id}`);
      } else {
        router.push(`/student/dashboard/${data.data.id}`);
      }
    },
    onError(error: CustomAxiosError, variables, context) {
      let message: string = error.response?.data?.msg
        ? error.response?.data?.msg
        : "Api Error";
      toast.error(message);
    },
  });

  console.log("component re-rendered ");

  return (
    <main className="  text-purple-600 h-[100vh] flex justify-center items-center flex-col gap-y-3 ">
      <div className=" w-[100vw] h-[100vh] ">
        {/* <div >
        <img className='w-[100vw] h-[100vh]' src="https://res.cloudinary.com/dpa6ihifr/image/upload/v1695591795/student_analyzer/clg_gs2wvn.jpg" alt="background" />
      </div> */}
        <div className="flex items-center justify-center w-full h-[100vh] bg-white bg-local bg-no-repeat bg-cover bg-center bg-[url('https://res.cloudinary.com/dpa6ihifr/image/upload/v1695591795/student_analyzer/clg_gs2wvn.jpg')]">
          <div className="w-[480px] h-[440px] border-[1px] p-2 bg-white rounded-lg">
            <div className="flex justify-center">
              <img
                src="https://res.cloudinary.com/dpa6ihifr/image/upload/v1695591492/student_analyzer/t__o8k9xq.png"
                alt="vit_logo"
              />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black mt-3">
              Sign in to your account
            </h2>

            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      value={uname}
                      onChange={(e) => setUsername(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Username"
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <p className=" cursor-pointer text-sm font-semibold text-black hover:underline">
                      <Link href="/forgot_password" scroll={true}>
                        Forgot password?
                      </Link>
                    </p>
                  </div>
                  <div className="mt-2">
                    <input
                      value={pass}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      mutation.mutate({
                        email: uname,
                        password: pass,
                      });
                    }}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Sign In <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Link href="/dashboard" scroll={true}>
        <button className="w-[100px] h-[30px] text-black bg-slate-200 rounded-md  active:bg-slate-100 ">
          Dashboard
        </button>
      </Link> */}
    </main>
  );
}
