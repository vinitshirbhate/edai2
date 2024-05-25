import Dashboard from "./dashboard";
import Sidebar from "../components/Sidebar";

export const Main = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-10">
        <Dashboard />
      </div>
    </div>
  );
};
