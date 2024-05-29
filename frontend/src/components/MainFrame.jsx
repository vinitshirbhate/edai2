import React, { useEffect, useState } from "react";
import { EspDataProvider, useEspData } from "../pages/EspDataContext";
import Weather from "./weather";
import { AreaChartComponent } from "./Chart";

const MainFrame = () => {
  const espData = useEspData();

  if (!espData || espData.length === 0) {
    console.log("no data");
    return <div>No data available</div>;
  }

  const todayName = getTodayName();
  const latestData = espData.find((data) => data.name === todayName); // Get today's data

  const { temperature, humidity, soilMoisture } = latestData || {};

  const calculateMoisture =
    espData.length === 0
      ? null
      : (((1024 - soilMoisture) / 1024) * 100).toFixed(2);

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
          <img
            src="/assets/temprature.svg"
            alt="temprature"
            className="h-16 w-16"
          />
          <div className="text-4xl font-bold">
            <SensorValue value={temperature} unit="°C" title="Temperature" />
          </div>
          <div className="text-xl font-semibold mt-2">Temperature</div>
        </div>
        <div className="rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center">
          <img
            src="/assets/humidity.svg"
            alt="temprature"
            className="h-16 w-16"
          />

          <div className="text-4xl font-bold">
            <SensorValue
              value={calculateMoisture}
              unit="%"
              title="Soil Moisture"
            />
          </div>
          <div className="text-xl font-semibold mt-2">Soil Moisture</div>
        </div>
        <div className="rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center">
          <img
            src="/assets/soilMoisture.svg"
            alt="temprature"
            className="h-16 w-16"
          />
          <div className="text-4xl font-bold">
            <SensorValue value={humidity} unit="%" title="Humidity" />
          </div>
          <div className="text-xl font-semibold mt-2">Humidity</div>
        </div>
      </div>

      <main className="h-52 m-5 p-3 grid gap-6 grid-cols-3">
        <div className="rounded-md shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center">
          <GridItem title="Temperature">
            <AreaChartComponent
              data={espData}
              dataKey="temperature"
              color="#4CAF50"
              title="Temperature"
            />
          </GridItem>
        </div>

        <div className="rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center">
          <GridItem title="Soil Moisture">
            <AreaChartComponent
              data={espData}
              dataKey="soilMoisture"
              color="#4CAF50"
              title="Soil Moisture"
            />
          </GridItem>
        </div>

        <div className="rounded-md min-h-[100px] shadow-lg border-stone-700 border-2 text-black flex flex-col place-items-center justify-center">
          <GridItem title="Humidity">
            <AreaChartComponent
              data={espData}
              dataKey="humidity"
              color="#4CAF50"
              title="Humidity"
            />
          </GridItem>
        </div>
      </main>
    </>
  );
};

export const SensorValue = ({ value, unit }) => {
  return (
    <div className="text-4xl font-bold">
      {value === undefined ? "Loading..." : `${value}${unit}`}
    </div>
  );
};

export const getTodayName = () => {
  const today = new Date();
  const dayIndex = today.getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dayIndex];
};

function GridItem({ title, children }) {
  return (
    <div className="flex flex-col items-center justify-center pr-6 rounded-xl w-full">
      <h3 className="text-2xl font-bold text-black mb-4">{title}</h3>
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default MainFrame;
