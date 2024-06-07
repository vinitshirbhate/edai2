import Dashboard from "./dashboard";
import Sidebar from "../components/Sidebar";
import MainFrame from "../components/MainFrame";

export const Main = () => {
  return (
    <>
      <Sidebar>
        <div className="p-6 mr-5 ml-12 border  h-[95vh]  rounded-3xl mt-5 flex-grow">
          <MainFrame />
        </div>
      </Sidebar>
    </>
    // <div className="grid grid-cols-12">
    //   <div className="col-span-2">
    //   </div>
    //   <div className="col-span-10">
    //   </div>
    // </div>
  );
};
