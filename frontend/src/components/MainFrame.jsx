import React, { useState, useEffect } from "react";
import { useEspData } from "../pages/EspDataContext";
import Weather from "./weather";
import AreaChartComponent from "./Chart";

const MainFrame = () => {
  const espData = useEspData();

  if (!espData || espData.length === 0) {
    console.log("No data");
    return (
      <div className="flex flex-col justify-center items-center bg-teal-500 h-full">
        <img src="../../assets/WeatherIcons.gif" alt="Loading..." />
        <p className="text-3xl font-extrabold text-teal-900 flex flex-row gap-2">
          Fetching Your Data From The Cloud
          <span className="loading loading-dots loading-lg"></span>
        </p>
      </div>
    );
  }

  const latestData = espData[espData.length - 1];

  console.log("Latest data in MainFrame:", latestData);
  const { temperature, humidity, soilMoisture } = latestData || {};

  const calculateMoisture = soilMoisture
    ? (((1024 - soilMoisture) / 1024) * 100).toFixed(2)
    : null;

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

  // Transform soil moisture data
  const transformedEspData = espData.map((entry) => ({
    ...entry,
    soilMoisture: (((1024 - entry.soilMoisture) / 1024) * 100).toFixed(2),
  }));

  return (
    <>
      <div className="px-6">
        {city ? (
          <Weather city={city} />
        ) : (
          <div className="bg-teal-700 h-36 rounded-2xl flex justify-center place-items-center gap-x-7">
            <p className="text-xl font-semibold flex flex-row gap-2 text-teal-950">
              Checking for permissions{" "}
              <span className="loading loading-dots loading-md" />
            </p>
            <img
              src="../../assets/WeatherIcons.gif"
              alt="Loading..."
              className="w-36 h-36"
            />
          </div>
        )}
      </div>
      <div className="h-52 m-3 p-3 grid gap-6 grid-cols-3 flex-grow">
        <div className="rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center bg-teal-50">
          <img
            src="/assets/temprature.svg"
            alt="temperature"
            className="h-16 w-16"
          />
          <div className="text-4xl font-bold">
            <SensorValue value={temperature} unit="°C" title="Temperature" />
          </div>
        </div>
        <div className="rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center bg-teal-50">
          <img
            src="/assets/humidity.svg"
            alt="humidity"
            className="h-16 w-16"
          />
          <div className="text-4xl font-bold">
            <SensorValue
              value={calculateMoisture}
              unit="%"
              title="Soil Moisture"
            />
          </div>
        </div>
        <div className="rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center bg-teal-50">
          <img
            src="/assets/soilMoisture.svg"
            alt="humidity"
            className="h-16 w-16"
          />
          <div className="text-4xl font-bold">
            <SensorValue value={humidity} unit="%" title="Humidity" />
          </div>
        </div>
      </div>

      <main className="h-52 m-3 p-3 grid gap-6 grid-cols-3">
        <div className="rounded-md shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center bg-teal-50">
          <GridItem title="Temperature">
            <AreaChartComponent
              data={espData}
              dataKey="temperature"
              stroke="#FF0000"
              fill="#FF8888"
            />
          </GridItem>
        </div>

        <div className="rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center bg-teal-50">
          <GridItem title="Soil Moisture">
            <AreaChartComponent
              data={transformedEspData}
              dataKey="soilMoisture"
              stroke="#0000FF"
              fill="#8888FF"
            />
          </GridItem>
        </div>

        <div className="rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center bg-teal-50">
          <GridItem title="Humidity">
            <AreaChartComponent
              data={espData}
              dataKey="humidity"
              stroke="#00FF00"
              fill="#88FF88"
            />
          </GridItem>
        </div>
      </main>
    </>
  );
};

export const SensorValue = ({ value, unit, title }) => {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold">
        {value === undefined ? (
          <span className="loading loading-infinity loading-lg"></span>
        ) : (
          `${value}${unit}`
        )}
      </div>
      <div className="text-xl font-semibold mt-2">{title}</div>
    </div>
  );
};

const GridItem = ({ title, children }) => {
  return (
    <div className="flex flex-col items-center justify-center pr-6 rounded-xl w-full">
      <h3 className="text-2xl font-bold text-black mb-4">{title}</h3>
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default MainFrame;
