import React, { useEffect, useState } from "react";
import { useEspData } from "../pages/EspDataContext";
import Weather from "./weather";

const MainFrame = () => {
  const espData = useEspData();
  if (espData.length === 0) {
    console.log("no data");
  } else {
    var { Humidity, SoilMoisture, Temperature } = espData[0];
    console.log(Humidity);
  }

  // Calculate soil moisture percentage
  const calculateMoisture =
    espData.length === 0 ? null : ((1024 - SoilMoisture) / 1024) * 100;

  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4582848adf00f1e4eead728b6001a422&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            setCity(data.name);
          })
          .catch((error) => {
            console.error("Error fetching location:", error);
          });
      });
    };

    fetchLocation();
  }, []);

  return (
    <>
      {city ? <Weather city={city} /> : <p>Loading...</p>}
      <div className="h-52 m-5 p-3 grid gap-6 grid-cols-3">
        <div className="rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center">
          <svg
            viewBox="0 0 1024 1024"
            class="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M409.209 262.295v344.729c-54.508 33.715-88.16 93.574-88.16 162.025C321.049 874.508 406.684 960 512.918 960c106.204 0 190.033-85.492 190.033-190.951 0-67.562-35.431-126.789-88.762-160.728v-440.11C614.189 110.662 568.287 64 511.685 64c-56.603 0-102.476 46.662-102.476 104.211V262.295z"
                fill="#FCB814"
              ></path>
              <path
                d="M614.187 608.322V168.209c0-57.546-45.9-104.209-102.502-104.209-7.572 0-14.929 0.894-22.033 2.479 46.005 10.261 80.47 51.883 80.47 101.73v440.112c53.333 33.939 88.764 93.166 88.764 160.728 0 98.043-72.488 178.727-168.016 189.602 7.244 0.823 14.578 1.348 22.049 1.348 106.204 0 190.033-85.492 190.033-190.951-0.001-67.561-35.432-126.787-88.765-160.726z"
                fill="#030504"
              ></path>
              <path
                d="M553.843 648.47V485.08c0-23.938-18.432-29.386-41.083-29.386-22.666 0-42.605 6.968-42.605 30.906v161.87c-43.886 16.848-75.092 59.274-75.092 109.091 0 64.582 52.355 116.937 116.937 116.937s116.937-52.355 116.937-116.937c0-49.818-31.208-92.243-75.094-109.091z"
                fill="#FF3B30"
              ></path>
              <path
                d="M553.843 648.47V485.08c0-23.938-18.431-29.386-41.083-29.386-4.873 0-9.563 0.404-14.013 1.151 15.051 2.558 25.72 10.044 25.72 28.234v163.39c43.886 16.848 75.092 59.274 75.092 109.091 0 59.596-44.615 108.676-102.247 115.917 4.822 0.606 9.702 1.018 14.688 1.018 64.582 0 116.937-52.353 116.937-116.936 0-49.816-31.208-92.241-75.094-109.089z"
                fill="#030504"
              ></path>
              <path
                d="M467.312 788.814m-25.705 0a25.705 25.705 0 1 0 51.41 0 25.705 25.705 0 1 0-51.41 0Z"
                fill="#FFFFFF"
              ></path>
              <path
                d="M511.582 629.319c-8.246 0-14.933-6.687-14.933-14.933V179.241c0-8.248 6.687-14.933 14.933-14.933 8.248 0 14.933 6.686 14.933 14.933v435.146c0 8.245-6.686 14.932-14.933 14.932z"
                fill="#FFFFFF"
              ></path>
            </g>
          </svg>
          <div className="text-4xl font-bold">
            {espData.length === 0 ? "Loading..." : `${Temperature}°C`}
          </div>
          <div className="text-xl font-semibold mt-2">Temperature</div>
        </div>
        <div className="rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center">
          <svg
            fill="#000000"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.5,28A5.385,5.385,0,0,1,19,22.751a5.3837,5.3837,0,0,1,.874-2.8308L23.49,14.5383a1.217,1.217,0,0,1,2.02,0L29.06,19.8154A5.4923,5.4923,0,0,1,30,22.751,5.385,5.385,0,0,1,24.5,28Zm0-11.38-2.9356,4.3672A3.3586,3.3586,0,0,0,21,22.751a3.51,3.51,0,0,0,7,0,3.4356,3.4356,0,0,0-.63-1.867Z"
              fill="#00cbe6"
            />
            <circle cx="5" cy="13" r="1" />
            <circle cx="11" cy="19" r="1" />
            <circle cx="15" cy="25" r="1" />
            <circle cx="17" cy="15" r="1" />
            <circle cx="13" cy="11" r="1" />
            <circle cx="27" cy="11" r="1" />
            <circle cx="9" cy="27" r="1" />
            <circle cx="3" cy="21" r="1" />
            <rect x="2" y="6" width="28" height="2" />
          </svg>

          <div className="text-4xl font-bold">
            {espData.length === 0
              ? "Loading..."
              : `${calculateMoisture.toFixed(2)}%`}
          </div>
          <div className="text-xl font-semibold mt-2">Soil Moisture</div>
        </div>
        <div className="rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center">
          <svg
            viewBox="0 0 1024 1024"
            class="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M339.7 882.5C196.6 882.5 80.2 766.1 80.2 623c0-133.2 204.8-395.1 228.2-424.5 5.8-7.3 14.5-11.6 23.8-11.7 9.4-0.1 18.1 3.9 24.1 11 1.5 1.8 37.7 44.8 82.2 105.2 10.1 13.8 7.2 33.2-6.6 43.3-13.8 10.1-33.2 7.2-43.3-6.6-21.3-29-40.9-54-55.3-72.1-69.2 92-191.2 271.5-191.2 355.4 0 108.9 88.6 197.6 197.6 197.6S537.3 731.9 537.3 623c0-17.1 13.9-31 31-31s31 13.9 31 31c-0.1 143.1-116.5 259.5-259.6 259.5z"
                fill="#1A1A1A"
              ></path>
              <path
                d="M363.7 468.8c-27.9 59.7-46.8 115.7-46.8 158.4 0 164.6 133.4 298 298 298s298-133.4 298-298c0-12.8-1.9-26.9-5.5-41.9-327.2 33.9-284.9-194.9-543.7-116.5z"
                fill="#00cbe6"
              ></path>
              <path
                d="M333.6 567.6c-38.2 239.9 123 357.7 287.3 357.7 92.8 0 144.9-12.1 199.6-78.6-261.5 20.7-428.7-99.2-486.9-279.1z"
                fill="#00cbe6"
              ></path>
              <path
                d="M614.9 956.1C433.5 956.1 286 808.5 286 627.2c0-173.4 283.4-532.4 295.5-547.6 5.8-7.3 14.5-11.6 23.8-11.7 9.3-0.1 18.1 3.9 24.1 11 2 2.3 49 58.2 106.8 136.6 10.1 13.8 7.2 33.2-6.6 43.3-13.8 10.1-33.2 7.2-43.3-6.6-31.8-43.2-60.6-79.8-79.9-103.7C517 266.1 347.9 512.3 347.9 627.2c0 147.2 119.8 267 267 267s267-119.8 267-267c0-29.7-13.2-87.9-76.4-196.2-8.6-14.8-3.6-33.7 11.2-42.3 14.8-8.6 33.7-3.6 42.3 11.2 57.1 97.9 84.8 172.2 84.8 227.4 0 181.3-147.6 328.8-328.9 328.8z"
                fill="#1A1A1A"
              ></path>
            </g>
          </svg>
          <div className="text-4xl font-bold">
            {espData.length === 0 ? "Loading..." : `${Humidity}%`}
          </div>
          <div className="text-xl font-semibold mt-2">Humidity</div>
        </div>
      </div>
    </>
  );
};

export default MainFrame;
