import React from "react";
import Weather from "./weather";
const MainFrame = () => {
  return (
    <>
      <div className="flex justify-center h-36 weather rounded-lg align items-center">
        <Weather />
      </div>
      <div class=" h-52 m-5 p-3 grid gap-6 grid-cols-3">
        <div className=" rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black">
          temprature
        </div>
        <div className=" rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black">
          soil moisture
        </div>
        <div className=" rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black">
          Humidity
        </div>
      </div>
    </>
  );
};

export default MainFrame;
