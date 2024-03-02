"use client";
import React, { useState, useEffect } from "react";
import { BsPlusLg, BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import "../../styles/styles.css";
import Table from "../Table/Table";
import Link from "next/link";
type Props = {};
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import { customUserList, decodeRole } from "@/app/utils/getRole";
import { UserDeleteButton, UserEditButton } from "../Button/Button";
import { fullDeptinfo, fullUserData, userData } from "@/app/interface";
import { ValueGetterParams } from "ag-grid-community";
import { CustomAxiosError } from "@/app/utils/customError";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function UserSectionOne({}: Props) {
  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState("");
  const [dept, setDept] = useState("");
  const router = useRouter();
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return axios.get(
        `http://localhost:4500/backend-api/auth/users?role=${decodeRole(
          role
        )}&department=${dept}`,
        {
          withCredentials: true,
        }
      );
    },
  });

  const delMutation = useMutation({
    mutationFn: (No: string) => {
      return axios.delete(
        `http://localhost:4500/backend-api/admin/delete?rollNo=${No}`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess(data, variables, context) {
      toast.success(data.data.msg);
      refetch();
    },
    onError(error: CustomAxiosError, variables, context) {
      let message: string = error.response?.data?.msg
        ? error.response?.data?.msg
        : "Api Error";
      toast.error(message);
    },
  });

  const {
    data: data1,
    isLoading: isLoading1,
    refetch: refech1,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: () => {
      return axios.get(
        "http://localhost:4500/backend-api/department/all-department",
        {
          withCredentials: true,
        }
      );
    },
  });

  const handleDelete = (props: userData) => {
    delMutation.mutate(props.rollNo);
  };
  const handleEdit = (props: userData) => {
    router.push(`/admin/dashboard/users/editUser/${props.rollNo}`);
    console.log("Clicked");
  };

  let column = [
    { field: "rollNo", filter: true },
    { field: "firstName", filter: true },
    { field: "middleName" },
    { field: "lastName" },
    { field: "email" },
    { field: "phoneNo" },
    { field: "role" },
    { headerName: "Department", field: "department_name" },
    {
      field: "Edit",
      cellRenderer: (props: ValueGetterParams) => (
        <UserEditButton func={handleEdit} {...props} />
      ),
      width: 90,
    },
    {
      field: "Delete",
      cellRenderer: (props: ValueGetterParams) => (
        <UserDeleteButton func={handleDelete} {...props} />
      ),
      width: 90,
    },
  ];
  const deptData: Array<fullDeptinfo> = data1?.data.list;

  useEffect(() => {
    refetch();
  }, [role, dept]);

  return (
    <div className="h-[280px] bg-[#212529]  ">
      <div className="flex justify-between items-center  h-[120px] ">
        <div className="w-[250px] ml-5 ">
          <h1 className="text-2xl text-white">Users</h1>
        </div>
        <div className="mr-5">
          <Link href="/admin/dashboard/users/newUser">
            <button className="w-[130px] flex items-center gap-x-2 text-black rounded-3xl bg-purple-400 h-[42px]  active:bg-purple-500">
              <div className="ml-3">
                <BsPlusLg size={20} />
              </div>
              <p className="">Add User</p>
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between flex-col-reverse gap-y-3 lg:flex-row lg:gap-y-0 mb-5">
        <div className="flex gap-x-3 ml-5">
          <div className="bg-[#212529] w-[120px] h-[40px] flex items-center justify-center border-[1px] border-gray-600 rounded-3xl ">
            <select
              onChange={(e) => {
                setRole(e.target.value);
              }}
              className="bg-[#212529] text-white"
            >
              <option hidden>Role</option>
              <option value="">ALL</option>
              <option value="ADMIN" className="bg-[#212529] ">
                Admin
              </option>
              <option value="PROFESSOR" className="bg-[#212529] ">
                Professor
              </option>
              <option value="STUDENT" className="bg-[#212529] ">
                Student
              </option>
            </select>
          </div>
          <div className="bg-[#212529] w-[120px] h-[40px] flex items-center justify-center  border-[1px] border-gray-600 rounded-3xl ">
            <select
              onChange={(e) => setDept(e.target.value)}
              className="bg-[#212529] text-white  "
            >
              <option className="bg-[#212529]  " hidden>
                Department
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
          {/* <div className="bg-[#212529]  w-[120px] h-[40px] flex items-center justify-center border-[1px] border-gray-600 rounded-3xl ">
            <select className="bg-[#212529] text-white">
              <option hidden>Batch</option>
              <option className="bg-[#212529]">Batch 2021</option>
              <option className="bg-[#212529]">Batch 2022</option>
              <option className="bg-[#212529]">Batch 2023</option>
              <option className="bg-[#212529]">Batch 2024</option>
            </select>
          </div> */}
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
        {isLoading ? (
          <Loading />
        ) : (
          <Table rowData={customUserList(data?.data.list)} colDefs={column} />
        )}
      </div>
    </div>
  );
}
