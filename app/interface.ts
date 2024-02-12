import { ValueGetterParams } from "ag-grid-community";
import { Interface } from "readline";
export interface userData {
  rollNo: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNo: number;
  role: string;
  department_name: string;
}

export interface fullUserData extends userData {
  id: number;
}

export interface deptInfo {
  name: string;
  code: string;
}

export interface fullDeptinfo extends deptInfo {
  id: number;
}

export interface customDeleteDepartment extends ValueGetterParams {
  func: (data: fullDeptinfo) => void;
}

export interface customDeleteUser extends ValueGetterParams {
  func: (data: fullUserData) => void;
}

export interface courseData {
  id: string;
  course_name: string;
  sem: number;
  credits: number;
  department_name: string;
}
export interface customCourseData extends ValueGetterParams {
  func: (data: courseData) => void;
}

export interface assign {
  id: string;
  course_name: string;
  credits: number;
  sem: number;
  department_name: string;
  year: number;
}

export interface customAssign extends ValueGetterParams {
  func: (data: assign) => void;
}
