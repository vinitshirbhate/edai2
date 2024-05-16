import React from "react";
import { Link, useNavigate } from "react-router-dom";
export const Sidebar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    localStorage.removeItem("token");
  }
  return (
    <>
      <div className=" border bg-gray-400 p-4 backdrop-filter backdrop-blur-md bg-opacity-0 h-[95vh] w-72 rounded-3xl mt-5 ml-3">
        <div className="flex">
          <div className=" bg-slate-200 rounded-full h-12 w-12 flex justify-center mt-1 mr-3">
            <div className="flex flex-col justify-center h-full text-xl font-bold text-slate-500">
              V
            </div>
          </div>
          <div className=" mt-3 flex flex-col justify-center text-2xl h-full font-medium mr-3.5 text-black">
            Vinit Shirbhate
          </div>
        </div>
        <div class="w-full h-px bg-white opacity-90 mt-3"></div>
        {/* <div className="divider"></div> */}
        <div className="flex flex-col justify-center pt-6 space-y-4">
          {/* <button className=" text-lg capitalize underline">Home</button> */}
          {/* <button className="text-xl font-semibold underline">Home</button> */}
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
            <button
              onClick={() => navigate("/dashboard")}
              class="ms-3 h-full w-full flex place-items-center"
            >
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

            <button onClick={() => navigate("/compatiblity")} class="ms-3">
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
            <button class="ms-3">Result</button>
          </a>
        </div>
        <div className=" mt-40">
          <button
            className=" text-black flex text-xl font-semibold ml-12 mt-20 hover:bg-red-500 rounded-lg p-3 gap-2
        "
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
