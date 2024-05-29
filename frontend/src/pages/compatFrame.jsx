import React, { useEffect, useState, useRef } from "react";
import { useFirebase, FirebaseProvider } from "../../firebase";
import BookCard from "../components/Card";
import { SensorValue, getTodayName } from "../components/MainFrame";
import { useEspData } from "./EspDataContext";
import ModalComp from "../components/ModalComp";

const CropCategory = ({ title, crops }) => {
  const scrollRef = useRef(null);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className="relative m-6 gap-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1 className="text-2xl text-black font-bold mb-3 ml-4">{title}:-</h1>
        <div className="flex items-center relative">
          {isHover && (
            <>
              <button
                onClick={scrollLeft}
                className="btn btn-outline btn-success btn-circle absolute left-0 z-40"
              >
                ❮
              </button>
              <button
                onClick={scrollRight}
                className="btn btn-outline btn-success btn-circle absolute right-0 z-40"
              >
                ❯
              </button>
            </>
          )}
          <div
            className="flex overflow-x-auto space-x-4 scrollbar-hide"
            ref={scrollRef}
          >
            {crops.map((crop) => (
              <BookCard key={crop.id} name={crop.id} {...crop.data()} />
            ))}
          </div>
        </div>
      </div>
      <div className="divider relative"></div>
    </>
  );
};

const CompatFrame = () => {
  const firebase = useFirebase();
  const [crops, setCrops] = useState({ farm: [], cashCrops: [], indoor: [] });
  const [open, setOpen] = useState(false);
  const [suitableCrops, setSuitableCrops] = useState({
    farm: [],
    cashCrops: [],
    indoor: [],
  });

  useEffect(() => {
    firebase.listAllPlants().then((cropsData) => setCrops(cropsData));
  }, [firebase]);

  const espData = useEspData();

  if (!espData || espData.length === 0) {
    console.log("no data");
    return <div>No data available</div>;
  }

  const latestData = espData.find((data) => data.name === getTodayName());

  const { temperature, humidity, soilMoisture } = latestData || {};

  const calculateMoisture =
    espData.length === 0
      ? null
      : (((1024 - soilMoisture) / 1024) * 100).toFixed(2);

  const filterSuitableCrops = () => {
    const suitableCrops = {
      farm: [],
      cashCrops: [],
      indoor: [],
    };

    Object.keys(crops).forEach((category) => {
      crops[category].forEach((crop) => {
        const data = crop.data();
        if (
          data.itemp !== undefined &&
          data.ftemp !== undefined &&
          data.ihumidity !== undefined &&
          data.fhumidity !== undefined &&
          data.isoilmoisture !== undefined &&
          data.fsoilmoisture !== undefined &&
          data.itemp <= temperature &&
          data.ftemp >= temperature &&
          data.ihumidity <= humidity &&
          data.fhumidity >= humidity &&
          data.isoilmoisture <= calculateMoisture &&
          data.fsoilmoisture >= calculateMoisture
        ) {
          suitableCrops[category].push(crop);
        }
      });
    });

    return suitableCrops;
  };

  const handleModal = () => {
    const suitable = filterSuitableCrops();
    setSuitableCrops(suitable);
    setOpen(true);
  };

  return (
    <>
      <div className="overflow-y-auto h-full">
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
        <div className="flex place-items-center justify-center">
          <button
            className="text-2xl text-black font-bold btn btn-success w-full mx-24"
            onClick={handleModal}
          >
            Find Plants you can grow in this environment
          </button>
        </div>
        {open && (
          <ModalComp open={open} setOpen={setOpen} suitableCrops={suitableCrops} />
        )}
        <div className="overflow-hidden flex flex-col">
          {[
            { title: "Farm Crops", crops: crops.farm },
            { title: "Cash Crops", crops: crops.cashCrops },
            { title: "Indoor Plants", crops: crops.indoor },
          ].map((category) => (
            <CropCategory
              key={category.title}
              title={category.title}
              crops={category.crops}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default () => (
  <FirebaseProvider>
    <CompatFrame />
  </FirebaseProvider>
);
