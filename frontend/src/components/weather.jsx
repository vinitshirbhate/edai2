import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const Weather = () => {
  const defaults = {
    icon: "CLEAR_DAY",
    color: "goldenrod",
    size: 94,
    animate: true,
  };

  return (
    <div className="flex gap-6 justify-end">
      <div className=" ">
        <ReactAnimatedWeather
          icon={defaults.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div></div>
      <div className="text-black font-bold text-4xl p-8">Pune</div>
      <h1 className="text-black font-bold text-4xl p-8">37°C</h1>
    </div>
  );
};

export default Weather;
