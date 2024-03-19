import React from "react";

const MainFrame = () => {
  return (
    <>
      <div className="flex justify-center h-36 bg-slate-800 rounded-lg align items-center">
        Weather API
      </div>
      <div class=" h-52 m-5 p-3 grid gap-6 grid-cols-4">
        <div className=" rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black">
          temprature
        </div>
        <div className=" rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black">
          soil moisture
        </div>
        <div className=" rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black">
          Humidity
        </div>
        <div className=" rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black">
          Naya kuch invent karo
        </div>
      </div>
    </>
  );
};

export default MainFrame;
