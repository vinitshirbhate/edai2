import React, { useState, useEffect } from "react";
import ReactAnimatedWeather from "react-animated-weather";

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "4582848adf00f1e4eead728b6001a422";
        if (!apiKey) {
          throw new Error("API key is missing");
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();

        console.log("Fetched weather data:", data);

        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  const weatherDefaults = {
    CLEAR_DAY: {
      icon: "CLEAR_DAY",
      color: "yellow",
      size: 94,
      animate: true,
      gradient: "from-sky-400 to-blue-600",
      message:
        "Clear day? Time for plants to photosynthesize and show off their leafy green bling!",
    },
    CLEAR_NIGHT: {
      icon: "CLEAR_NIGHT",
      color: "darkblue",
      size: 94,
      animate: true,
      gradient: "from-gray-800 to-blue-800",
      message:
        "Clear night? The perfect time for plants to rest and dream of sunny days!",
    },
    PARTLY_CLOUDY_DAY: {
      icon: "PARTLY_CLOUDY_DAY",
      color: "lightblue",
      size: 94,
      animate: true,
      gradient: "from-teal-400 to-blue-800",
      message:
        "Partly cloudy? Plants love the soft sunlight—it’s like a natural Instagram filter!",
    },
    PARTLY_CLOUDY_NIGHT: {
      icon: "PARTLY_CLOUDY_NIGHT",
      color: "darkgray",
      size: 94,
      animate: true,
      gradient: "from-gray-800 to-blue-800",
      message:
        "Partly cloudy night? Plants are just chilling under the stars, no biggie!",
    },
    CLOUDY: {
      icon: "CLOUDY",
      color: "gray",
      size: 94,
      animate: true,
      gradient: "from-gray-200 to-gray-800",
      message:
        "Cloudy skies? Plants are getting cozy with a day of soft light and steady growth!",
    },
    RAIN: {
      icon: "RAIN",
      color: "blue",
      size: 94,
      animate: true,
      gradient: "from-sky-200 to-sky-700",
      message:
        "Rainy day? Plants are throwing a hydration party and everyone’s invited!",
    },
    SLEET: {
      icon: "SLEET",
      color: "lightblue",
      size: 94,
      animate: true,
      gradient: "from-teal-400 to-blue-800",
      message:
        "Sleet is falling? Plants are like, 'Make up your mind, weather!'",
    },
    SNOW: {
      icon: "SNOW",
      color: "white",
      size: 94,
      animate: true,
      gradient: "from-gray-200 to-gray-800",
      message:
        "Snow much fun! Plants are bundling up and dreaming of a white winter!",
    },
    WIND: {
      icon: "WIND",
      color: "lightgray",
      size: 94,
      animate: true,
      gradient: "from-gray-200 to-gray-800",
      message:
        "Windy day? Plants are dancing in the breeze like nobody's watching!",
    },
    FOG: {
      icon: "FOG",
      color: "lightgray",
      size: 94,
      animate: true,
      gradient: "from-gray-200 to-gray-800",
      message:
        "Foggy weather: Plants are feeling all mysterious and cool today!",
    },
  };
  const weatherCondition =
    weatherData.weather && weatherData.weather.length > 0
      ? weatherData.weather[0].main.toUpperCase()
      : "UNKNOWN";
  const weatherDefaultsConfig =
    weatherDefaults[weatherCondition] || weatherDefaults.CLEAR_DAY;

  return (
    <div
      className={`flex gap-6 justify-between bg-gradient-to-br ${weatherDefaultsConfig.gradient} w-full rounded-lg h-36 items-center p-4`}
    >
      <div className="flex items-center">
        <ReactAnimatedWeather
          icon={weatherDefaultsConfig.icon}
          color={weatherDefaultsConfig.color}
          size={weatherDefaultsConfig.size}
          animate={weatherDefaultsConfig.animate}
        />
      </div>
      <div className="flex justify-center mb-4">
        <p className="text-center font-bold text-xl italic text-black">
          {weatherDefaultsConfig.message}
        </p>
      </div>

      <div className="flex flex-col items-end text-black font-bold text-4xl p-8">
        <div>{city}</div>
        <div>{weatherData.main.temp}°C</div>
        <div className="text-xl">{`Wind: ${weatherData.wind.speed} m/s`}</div>
      </div>
    </div>
  );
};

export default Weather;
