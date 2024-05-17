import React from "react";
import CompatFrame from "./compatFrame";
import Sidebar from "../components/Sidebar";
const Compatibility = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-10">
        <div className="p-6 mr-5 ml-12 border hover:bg-clip-padding hover:backdrop-filter backdrop-blur-md bg-opacity-0 h-[95vh]  rounded-3xl mt-5">
          <CompatFrame />
        </div>
      </div>
    </div>
  );
};

export default Compatibility;
