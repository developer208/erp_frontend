"use client";
import { useParams } from "next/navigation";
type props = {};

const Page = (props: props) => {
  const params = useParams<{ id: string }>();

  return (
    <main>
      <div className="w-[100vw] h-[350px] bg-[#212529]">
        <div className="h-[70px]"></div>
        <div> subjects {params.id}</div>
      </div>
    </main>
  );
};

export default Page;
