import React from "react";
import { useEspData } from "../pages/EspDataContext";
const MainFrame = () => {
  const espData = useEspData();
 if(espData.length==0){
  console.log("no data");
 }else{
  var {Humidity} = espData[0];

  console.log(Humidity);
 }
  return (
    <>
      <div className="flex justify-center h-36 bg-slate-800 rounded-lg align items-center">
        Weather API
      </div>
      <div class=" h-52 m-5 p-3 grid gap-6 grid-cols-3">
        <div className=" rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black">
        <p className="value" id="temperature">{espData.length==0 ? "Loading...  " :espData[0].Temperature}&#8451;</p>
           {/* <p className="value" id="temperature">22&#8451;</p> */}
        </div>
        <div className=" rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black">
        <p className="value" id="temperature">{espData.length==0 ? "Loading...  " :espData[0].SoilMoisture}%</p>
        </div>
        <div className=" rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black">
                    <p className="value" id="temperature">{espData.length==0 ? "Loading...  " :Humidity}%</p>

        </div>
      </div>
    </>
  );
};

export default MainFrame;
