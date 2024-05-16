import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import cottonImage from "../utils/cotton.jpg";
import plantData from "../utils/plants.json"; // Import your JSON data

const CompatFrame = () => {
  function redirect(plantName) {
    const plant = plantData.plants.find((p) => p.name === plantName);
    const wikipedia_url = `https://en.wikipedia.org/wiki/${plantData}`;

    if (plant && plant.wikipedia_url) {
      window.open(plant.wikipedia_url, "_blank");
    } else {
      console.log("Wikipedia URL not found for this plant.");
    }
  }
  return (
    <div className="h-full relative">
      <div className="flex flex-col w-full lg:flex-row h-full">
        <div className="grid flex-grow card rounded-box place-items-center gap-y-11 overflow-x-auto">
          <form className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered rounded-full"
            />
            <button
              type="submit"
              className="btn btn-circle bg-sky-500 text-white"
            >
              <IoSearchSharp className="w-6 h-6 outline-none" />
            </button>
          </form>
          {plantData.plants.map((plant, index) => (
            <div
              key={index}
              className="card card-compact w-96 bg-base-100 shadow-xl"
            >
              <figure>
                <img src={plant.image_url} alt={plant.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{plant.name}</h2>
                <p>Temperature: {plant.temperature}</p>
                <p>Humidity: {plant.humidity}</p>
                <p>Soil Moisture: {plant.soil_moisture}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={redirect(plant.name)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="divider lg:divider-horizontal  divider-success text-black">
          <button className=" bg-teal-500 w-32 h-32 rounded-full font-bold text-xl shadow-lg hover:bg-teal-400">
            Compare
          </button>
        </div>
        <div className="grid flex-grow h-card  rounded-box place-items-center">
          <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={cottonImage} alt="cotton" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">cotton!</h2>
              <p>
                Cotton crop is a vital agricultural commodity, serving as a
                source of fiber for textiles and numerous industrial products
                worldwide.
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">More Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        /* Custom scrollbar */
        .overflow-x-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background-color: transparent;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        /* Position scrollbar below button and slightly to the left */
        .overflow-x-auto::-webkit-scrollbar-button {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default CompatFrame;
