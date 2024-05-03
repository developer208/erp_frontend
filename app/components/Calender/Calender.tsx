import React from "react";
import YearPicker from "react-year-picker";

export default function CalendarCompo() {
  const handleChange = (date: any) => {
    console.log(date);
  };
  return <YearPicker onChange={handleChange} />;
}
