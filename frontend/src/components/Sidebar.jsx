import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import MainFrame from "./MainFrame";
import CompatFrame from "../pages/compatFrame";

const Sidebar = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not Logged In");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      console.log("Initiating sign-out process...");
      await auth.signOut();
      console.log("Sign-out promise resolved");

      const user = auth.currentUser;
      if (!user) {
        console.log("User logged out successfully!");

        navigate("/login");
      } else {
        console.error("User still logged in:", user);
      }
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <>
      <div className=" border bg-green-100 p-3 h-[96vh] rounded-3xl flex-grow m-6 w-3/4 ">
        <div className="flex justify-between">
          <div className="flex ">
            <div className=" bg-slate-800 rounded-full h-10 w-10 flex justify-center mt-2 mr-3 ml-6 ">
              <div className="flex flex-col justify-center h-full text-xl font-bold text-slate-300">
                {userDetails ? (
                  <>
                    <h3>
                      {" "}
                      {userDetails.fullname.toUpperCase().substring(0, 1)}
                    </h3>
                  </>
                ) : (
                  <div className="skeleton w-12 h-12 rounded-full shrink-0 bg-teal-700"></div>
                )}
              </div>
            </div>
            <div className=" mt-3 flex flex-row justify-center text-2xl h-full font-medium mr-3.5 text-black">
              {userDetails ? (
                <>
                  <h3>{userDetails.fullname}</h3>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="skeleton h-4 w-24 bg-teal-700"></div>
                  <div className="skeleton h-4 w-32 bg-teal-700"></div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row space-x-3 ">
            <div className="flex items-center p-3 text-xl font-medium rounded-lg group dark:text-black hover:bg-green-700 hover:bg-opacity-40">
              <img src="/assets/home.svg" alt="home" className="h-6 w-6 " />
              <button onClick={() => navigate("/dashboard")} className="ms-3">
                Dashboard
              </button>
            </div>
            <div className="flex items-center p-3 text-xl font-medium rounded-lg group dark:text-black hover:bg-green-700 hover:bg-opacity-40">
              <img src="/assets/compat.svg" alt="compat" className="h-6 w-6" />
              <button
                onClick={() => navigate("/compatibility")}
                className="ms-3"
              >
                Compatibility
              </button>
            </div>
          </div>
          <div className="flex items-center p-1 text-xl font-medium rounded-lg group dark:text-black hover:bg-red-700 justify-center mr-5">
            <img src="/assets/logout.svg" alt="logout" className="w-6 h-6" />
            <button className="ms-3 " onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="w-full h-px bg-black opacity-90 mt-3" />
        <div className="rounded-3xl flex-grow mt-2 h-[82vh] overflow-auto ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
