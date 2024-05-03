import SectionOne from "../../components/SectionOne/SectionOne";
import Attendence from "../../components/Graphs/Attendence";

export default function Dashboard() {
  return (
    <main className="text-black flex flex-col h-full ">
      <div className="w-[100vw] h-[70px] bg-[#212529]"></div>
      <div className="w-full  flex flex-col gap-5 ">
        <SectionOne />
        <Attendence />
      </div>
    </main>
  );
}
