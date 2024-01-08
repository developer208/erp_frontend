"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
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
                      value={username}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                    ></input>
                  </div>
                </div>
                <div className="flex justify-evenly">
                  <div className="flex gap-2">
                    <input type="radio" name="name" id="btn" />
                    <label htmlFor="">Admin</label>
                  </div>
                  <div className="flex gap-2">
                    <input type="radio" name="name" id="btn1" />
                    <label htmlFor="">Professor</label>
                  </div>
                  <div className="flex gap-2">
                    <input type="radio" name="name" id="btn2" />
                    <label htmlFor="">Student</label>
                  </div>
                </div>
                <div>
                  <Link href="/admin/dashboard" scroll={true}>
                    <button
                      type="button"
                      // onClick={(e) => handleLogin()}
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Sign In <ArrowRight className="ml-2" size={16} />
                    </button>
                  </Link>
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
