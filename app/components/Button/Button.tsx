import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { ValueGetterParams } from "ag-grid-community";
import {
  customAssign,
  customCourseData,
  deptInfo,
  userData,
} from "@/app/interface";
import { useRouter } from "next/navigation";
import { customDeleteDepartment, customDeleteUser } from "@/app/interface";

export function DeptEditButton(props: customDeleteDepartment) {
  return (
    <button
      onClick={() => {
        props.func(props.data);
      }}
      className="hover:text-purple-600 cursor-pointer "
    >
      <FiEdit size={28} style={{ color: "black" }} />
    </button>
  );
}
export function DeptDeleteButton(props: customDeleteDepartment) {
  return (
    <button
      onClick={() => {
        props.func(props.data);
      }}
      className="hover:text-purple-600 cursor-pointer "
    >
      <MdDelete size={28} style={{ color: "red" }} />;
    </button>
  );
}

export function UserEditButton(props: customDeleteUser) {
  return (
    <button
      onClick={() => {
        props.func(props.data);
      }}
      className="hover:text-purple-600 cursor-pointer "
    >
      <FiEdit size={28} style={{ color: "black" }} />
    </button>
  );
}
export function UserDeleteButton(props: customDeleteUser) {
  return (
    <button
      onClick={() => {
        console.log(props.data);
        props.func(props.data);
      }}
      className="hover:text-purple-600 cursor-pointer "
    >
      <MdDelete size={28} style={{ color: "red" }} />;
    </button>
  );
}

export default function EnrollButton(props: customDeleteUser) {
  return (
    <button
      onClick={() => props.func(props.data)}
      className="text-white font-bold w-[80px] h-[30px] flex items-center justify-center mt-[5px] rounded-2xl bg-blue-600  hover:bg-blue-800 "
    >
      Enroll
    </button>
  );
}

export function AddToCourse(props: customCourseData) {
  return (
    <button
      onClick={() => props.func(props.data)}
      className="text-white font-bold w-[80px] h-[30px] flex items-center justify-center mt-[5px] rounded-2xl bg-blue-600  hover:bg-blue-800 "
    >
      Add
    </button>
  );
}

export function ViewAssigned(props: customDeleteUser) {
  return (
    <button
      onClick={() => props.func(props.data)}
      className="text-black font-bold w-[80px] h-[30px] flex items-center justify-center mt-[5px] rounded-2xl bg-yellow-300  hover:bg-yellow-500 "
    >
      View
    </button>
  );
}

export function RemoveAssign(props: customAssign) {
  return (
    <button
      onClick={() => {
        console.log(props.data);
        props.func(props.data);
      }}
      className="hover:text-purple-600 cursor-pointer "
    >
      <MdDelete size={28} style={{ color: "red" }} />;
    </button>
  );
}

export function CourseEditButton(props: customCourseData) {
  return (
    <button
      onClick={() => {
        props.func(props.data);
      }}
      className="hover:text-purple-600 cursor-pointer "
    >
      <FiEdit size={28} style={{ color: "black" }} />
    </button>
  );
}
export function CourseDeleteButton(props: customCourseData) {
  return (
    <button
      onClick={() => {
        props.func(props.data);
      }}
      className="hover:text-purple-600 cursor-pointer "
    >
      <MdDelete size={28} style={{ color: "red" }} />;
    </button>
  );
}
