import React from "react";

type Props = {};

const Card = (props: Props) => {
  return (
    <div className=" h-[500px] w-[100vw] flex items-center justify-center ">
      <div className="w-[230px] h-[320px] bg-slate-200 rounded-3xl flex justify-center ">
        <div>
          <div className="w-[60px] h-[60px] ">
            <img
              src="https://res.cloudinary.com/dqyvomyqy/image/upload/v1698946776/erp/user_4_i7sva3.png"
              alt=""
            />
          </div>
          <h1>Vedang Mule</h1>
          <p>INFT</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
