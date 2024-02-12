import { assign, courseData } from "../interface";

interface data {
  year: number;
  course: courseData;
}

export const customAssignData = (old_array: Array<data>) => {
  let arr: Array<assign> = [];
  old_array.forEach((i: data) => {
    let obj = {
      id: i.course.id,
      course_name: i.course.course_name,
      department_name: i.course.department_name,
      credits: i.course.credits,
      sem: i.course.sem,
      year: i.year,
    };
    arr.push(obj);
  });
  return arr;
};
