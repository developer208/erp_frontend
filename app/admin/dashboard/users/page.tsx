import UserSectionOne from "@/app/components/User/UserSectionOne";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className="w-[100vw] h-[70px] bg-[#212529]"></div>
      <div className="w-full  ">
        <UserSectionOne />
      </div>
    </div>
  );
};

export default page;
