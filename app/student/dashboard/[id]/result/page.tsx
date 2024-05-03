"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Table from "@/app/components/Table/Table";
import { BsPlusLg, BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "@/app/components/Loading/Loading";
import { fullDeptinfo, fullUserData } from "@/app/interface";
import { customUserList } from "@/app/utils/getRole";
import { useParams } from "next/navigation";
import {
    EnrollButton,
    StudentDetails,
    ViewAssigned,
} from "@/app/components/Button/Button";
import { ValueGetterParams } from "ag-grid-community";
import { useRouter } from "next/navigation";
import YearPicker from "react-year-picker";
import { cal_data } from "@/app/utils/CalData";
import { table } from 'table';
import { customAssignData } from "@/app/utils/customData";
import { CustomAxiosError } from "@/app/utils/customError";
import ResultGraph from "@/app/components/Graphs/ResultGraph";
import { schemeArray } from "@/app/utils/data";
type Props = {};

const Page = (props: Props) => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    const [data, setData] = useState([]);
    const [sem, setSem] = useState("");
    const [sgpa, setSgpa] = useState(0);
    const [list,setList]=useState([]);
    const params = useParams<{ id: string }>();
    const mutation = useMutation({
        mutationKey: ["result"],
        mutationFn: () => {
            return axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/backend-api/result/result?sem=${sem}`, {}, { withCredentials: true })
        },
        onSuccess(data, variables, context) {
            console.log(data.data.data);
            setData(data.data.data);
            setSgpa(data.data.sgpa);
            setList(data.data.list);
        },
        onError(error: CustomAxiosError, variables, context) {
            let message: string = error.response?.data?.msg
                ? error.response?.data?.msg
                : "Api Error";
            toast.error(message);
        },
    })
    let column = [
        { field: "courseID", filter: true },
        { field: "mse", filter: true },
        { field: "ese" },
        { field: "isa" },
        { field: "creditEarned" },
        { field: "gradePoint" },
        { field: "gradeObtained" },
        { field: "total", headerName: "Credit * GradePoint" }
    ];

    return (
        <main className="">
            <div className="w-[100vw] max-h-[350px] bg-slate-700">
                <div className="h-[70px]"></div>
                <div className="mr-3 min-h-auto ">
                    <div className="flex justify-between items-center  h-[120px] ">
                        <div className="w-[250px] ml-5 ">
                            <h1 className="text-2xl text-white">Result</h1>
                        </div>
                    </div>
                    <div className="flex justify-between flex-col-reverse gap-y-3 lg:flex-row lg:gap-y-0 mb-5">
                        <div className="flex gap-x-3 ml-5">
                            <div className="bg-slate-700 shadow-md w-[140px] h-[40px] flex items-center justify-center  border-[1px] border-gray-600 rounded-3xl ">
                                <select
                                    onChange={(e) => setSem(e.target.value)}
                                    className="bg-slate-700 shadow-md text-white  "
                                >
                                    <option className="bg-slate-700 shadow-md  " hidden>
                                        Semester
                                    </option>
                                    <option className="bg-slate-700  " value="1">
                                        One
                                    </option>
                                    <option className="bg-slate-700  " value="2">
                                        Two
                                    </option>
                                    <option className="bg-slate-700  " value="3">
                                        Three
                                    </option>
                                    <option className="bg-slate-700  " value="4">
                                        Four
                                    </option>
                                    <option className="bg-slate-700  " value="5">
                                        Five
                                    </option>
                                    <option className="bg-slate-700  " value="6">
                                        Six
                                    </option>
                                    <option className="bg-slate-700  " value="7">
                                        Seven
                                    </option>
                                    <option className="bg-slate-700  " value="8">
                                        Eight
                                    </option>
                                </select>
                            </div>
                            <button onClick={() => mutation.mutate()} className="bg-blue-400 text-black rounded-2xl border-[1px] border-black  w-fit h-full p-2 px-4 " >Generate</button>
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
                    <div className="mt-[60px] flex lg:flex-row lg:gap-x-2  flex-col ml-2  lg:mx-5   ">
                        <div className=" w-full  lg:w-[70%] bg-gray-100 " >
                            {data.length === 0 ? (
                                <h1>Result Not Decleared</h1>
                            ) : (
                                <Table
                                    rowData={data}
                                    colDefs={column}
                                />
                                // <></>
                            )}
                        </div>
                        <div className=" w-full lg:w-[30%] bg-slate-50 min-h-[500px] rounded-md flex  flex-col gap-y-3 " >
                            <div className="w-full h-[40px] flex  items-center justify-center  border-2 border-gray-200 " >
                                <div className="flex text-blue-700 gap-3" >
                                    <h1>SGPA :-</h1>
                                    <h3>{sgpa}</h3>
                                </div>

                            </div>
                            <div className=" w-full border-2 border-gray-200 flex flex-col justify-center " >
                                <h1 className=" w-full  h-[50px] flex justify-center text-2xl items-center " >Scheme</h1>
                            <div className="flex flex-col " >
                            <div className="border-[1px] border-black  w-full flex justify-center h-[50px] items-center " >
                                                <div className="flex gap-x-4 font-semibold w-full " >
                                                    <h5 className="w-[50%] flex justify-center" >Grade Points</h5>
                                                    <h5 className="w-[50%] flex justify-center" >Performance</h5>
                                                </div>
                                            </div>
                            {schemeArray.map((i)=>{
                                    return(
                                            <div className="border-[1px] border-black  w-full flex justify-center h-[50px] items-center " >
                                                <div className="flex gap-x-9  w-full " >
                                                    <h5 className="w-[50%] flex justify-center " >{i.points}</h5>
                                                    <h5 className="w-[50%] flex justify-center " >{i.performance}</h5>
                                                </div>
                                            </div>
                                    )
                                })}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[97vw] h-[500px] bg-slate-50 my-4 mx-5 " >
                            <ResultGraph data={list} />
                    </div>
                </div>
            </div>
        </main>
    );
};
export default Page;
