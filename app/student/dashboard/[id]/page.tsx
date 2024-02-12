import React from "react";

interface Props {
  params: {
    id: number;
  };
}

export default function Page(props: Props) {
  return (
    <main>
      <div className="bg-[#0077b6] h-[70px]"></div>
      <div className="bg-[#0077b6] h-[250px]"></div>
    </main>
  );
}
