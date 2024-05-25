import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

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

        // Adding a short delay to ensure logs are flushed before redirection
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        console.error("User still logged in:", user);
      }
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <>
      <div className=" border bg-gray-400 p-4 backdrop-filter backdrop-blur-md bg-opacity-0 h-[95vh] w-72 rounded-3xl mt-5 ml-3">
        <div className="flex">
          <div className=" bg-slate-200 rounded-full h-12 w-12 flex justify-center mt-1 mr-3">
            <div className="flex flex-col justify-center h-full text-xl font-bold text-slate-500">
              {userDetails ? (
                <>
                  <h3> {userDetails.fullname.substring(0, 1)}</h3>
                </>
              ) : (
                <div className="skeleton w-12 h-12 rounded-full shrink-0 bg-white"></div>
              )}
            </div>
          </div>
          <div className=" mt-3 flex flex-col justify-center text-2xl h-full font-medium mr-3.5 text-black">
            {userDetails ? (
              <>
                <h3>{userDetails.fullname}</h3>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-24 bg-white"></div>
                <div className="skeleton h-4 w-32 bg-white"></div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-px bg-white opacity-90 mt-3" />
        <div className="flex flex-col justify-center pt-6 space-y-4">
          <div className="flex items-center p-3 text-xl font-medium rounded-lg group dark:text-black hover:bg-green-700 hover:bg-opacity-40">
            <img
              src="/assets/home.svg"
              alt="home"
              className="h-6 w-6 font-bold"
            />
            <button onClick={() => navigate("/dashboard")} className="ms-3">
              Dashboard
            </button>
          </div>
          <div className="flex items-center p-3 text-xl font-medium rounded-lg group dark:text-black hover:bg-green-700 hover:bg-opacity-40">
            <img src="/assets/compat.svg" alt="compat" className="h-6 w-6" />
            <button onClick={() => navigate("/compatibility")} className="ms-3">
              Compatibility
            </button>
          </div>
          <div className="flex items-center p-3 text-xl font-medium rounded-lg group dark:text-black hover:bg-green-700 hover:bg-opacity-40">
            <img src="/assets/result.svg" alt="result" className="h-6 w-6" />
            <button className="ms-3">Result</button>
          </div>
        </div>
        {/* Logout Button */}
        <div className=" mt-48 mx-10 ml-7">
          <div className="flex items-center  pt-3 pb-3 text-xl font-medium rounded-lg group dark:text-black hover:bg-red-700 justify-center">
            <img src="/assets/logout.svg" alt="logout" className="w-6 h-6" />
            <button className="ms-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
