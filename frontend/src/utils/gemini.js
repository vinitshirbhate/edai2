export const getGeminiSuggestion = async (apiKey, cropData) => {
  const prompt = `
  You are an expert agricultural assistant.
  
  Given the following crop and environmental conditions, suggest how to take care of the plant for best growth:
  
  Crop Name: ${cropData.name}
  Temperature Range: ${cropData.temperature[0]} to ${cropData.temperature[1]} °C
  Humidity Range: ${cropData.humidity[0]} to ${cropData.humidity[1]}%
  Soil Moisture Range: ${cropData.soilMoisture[0]} to ${cropData.soilMoisture[1]}%
  
  Explain in simple steps.
  in bullet points only
  `;

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
      apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ??
    "No suggestion available."
  );
};
