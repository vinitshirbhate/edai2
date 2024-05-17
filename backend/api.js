const axios = require("axios");

async function logPlantGrowth(plantName, apiKey) {
  const options = {
    method: "GET",
    url: "https://trefle.io/api/v1/species/search",
    params: {
      q: plantName,
      token: " ta6rLdWm3NqbKwDqJ1QTeWhW_VQqreq3D9fdX3tHaaM",
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data.length > 0) {
      const plantSpecies = response.data[0];
      console.log(
        `Growth information for ${
          plantSpecies.common_name || plantSpecies.scientific_name
        }:`
      );
      console.log("Sunlight needs:", plantSpecies.growth.sunlight);
      console.log(
        "Minimum precipitation:",
        plantSpecies.growth.minimum_precipitation
      );
      console.log(
        "Maximum precipitation:",
        plantSpecies.growth.maximum_precipitation
      );
      console.log("Minimum pH:", plantSpecies.growth.minimum_ph);
      console.log("Maximum pH:", plantSpecies.growth.maximum_ph);
      console.log(
        "Minimum temperature:",
        plantSpecies.growth.minimum_temperature.deg_c
      );
      console.log(
        "Maximum temperature:",
        plantSpecies.growth.maximum_temperature.deg_c
      );
    } else {
      console.log(`No information found for ${plantName}.`);
    }
  } catch (error) {
    console.error("Error fetching plant growth data:", error);
  }
}

// Example usage:
const plantName = "Tree cotton";
const apiKey = "YOUR_TREFLE_API_KEY";

logPlantGrowth(plantName, apiKey);
