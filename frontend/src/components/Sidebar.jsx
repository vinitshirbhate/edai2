import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Sidebar = () => {
  const [userDetails, setUserDetails] = useState(null);

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
                <p></p>
              )}
            </div>
          </div>
          <div className=" mt-3 flex flex-col justify-center text-2xl h-full font-medium mr-3.5 text-black">
            {userDetails ? (
              <>
                <h3>{userDetails.fullname}</h3>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="w-full h-px bg-white opacity-90 mt-3"></div>
        {/* <div className="divider"></div> */}
        <div className="flex flex-col justify-center pt-6 space-y-4">
          <a
            href="#"
            className="flex items-center p-3 text-xl font-medium rounded-lg group dark:text-black hover:bg-green-700 hover:bg-opacity-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <button onClick={() => Navigate("/dashboard")} className="ms-3">
              Dashboard
            </button>
          </a>
          <a
            href="#"
            className="flex items-center p-3 text-xl font-medium rounded-lg group dark:text-black hover:bg-green-700 hover:bg-opacity-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
              />
            </svg>
            <button onClick={() => Navigate("/compatibility")} className="ms-3">
              Compatibility
            </button>
          </a>
          <a
            href="#"
            className="flex items-center p-3 text-xl font-medium rounded-lg group dark:text-black hover:bg-green-700 hover:bg-opacity-40"
          >
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </a>
            <button className="ms-3">Result</button>
          </a>
        </div>
        {/* Logout Button */}
        <div className=" mt-48 mx-10 ml-7">
          <div className="flex items-center  pt-3 pb-3 text-xl font-medium rounded-lg group dark:text-black hover:bg-red-700 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
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
