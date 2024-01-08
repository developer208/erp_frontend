import React from "react";

type Props = {};

type obj = {
  Date: String;
  Month: String;
  Event: String;
  Desc: String;
};

const data: Array<obj> = [
  {
    Date: "20",
    Month: "Sept",
    Event: "Ganpati Chaturthi",
    Desc: "Festival commemorating the birth of Lord Ganesh",
  },
  {
    Date: "25",
    Month: "Dec",
    Event: "Christmas Festival",
    Desc: "Festival commemorating the birth of Jesus Christ",
  },
  {
    Date: "14",
    Month: "Nov",
    Event: "Diwali Festival",
    Desc: "Festival of joy and happiness",
  },
  {
    Date: "21",
    Month: "Oct",
    Event: "Navratri Festival",
    Desc: "Festival of goddess Durga",
  },
  {
    Date: "15",
    Month: "Aug",
    Event: "Independence Day",
    Desc: "Independence from the United Kingdom on 15 August 1947",
  },
  {
    Date: "21",
    Month: "Oct",
    Event: "Navratri Festival",
    Desc: "Festival of goddess Durga",
  },
  {
    Date: "15",
    Month: "Aug",
    Event: "Independence Day",
    Desc: "Independence from the United Kingdom on 15 August 1947",
  },
];

export const NewsAndEvents = (props: Props) => {
  return (
    <div className="">
      <h1 className="text-xl pl-5 pt-2 font-medium ">News & Events</h1>
      <div className="mt-2 flex flex-col gap-y-4 ">
        {data.map((i, key) => {
          if (key < 4) {
            return (
              <div className="flex  min-h-[60px] " key={key}>
                <div className="min-w-[50px] h-[50px] rounded-3xl mx-4">
                  <h1 className="text-lg font-medium text-center  bg-slate-200   ">
                    {i.Date}
                  </h1>
                  <h1 className="text-lg font-medium text-center   bg-slate-200   ">
                    {i.Month}
                  </h1>
                </div>
                <div className="min-h-[60px]">
                  <h1 className="text-sm font-bold ">{i.Event}</h1>
                  <p>{i.Desc}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
