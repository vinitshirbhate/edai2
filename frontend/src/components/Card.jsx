import React, { useEffect, useState } from "react";
import { useFirebase } from "../../firebase";
import { getGeminiSuggestion } from "../utils/gemini";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const BookCard = ({
  name,
  imageURL,
  itemp,
  ftemp,
  ihumidity,
  fhumidity,
  isoilmoisture,
  fsoilmoisture,
  showSuggestionButton = false,
}) => {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestion, setGeminiSuggestion] = useState("");
  const [loadingSuggestion, setGeminiLoading] = useState(false);

  useEffect(() => {
    if (imageURL) {
      firebase
        .getImageURL(imageURL)
        .then((url) => {
          setUrl(url);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [firebase, imageURL]);

  const handleGeminiClick = async () => {
    setGeminiLoading(true);
    try {
      const suggestion = await getGeminiSuggestion(GEMINI_API_KEY, {
        name,
        temperature: [itemp, ftemp],
        humidity: [ihumidity, fhumidity],
        soilMoisture: [isoilmoisture, fsoilmoisture],
      });
      setGeminiSuggestion(suggestion);
    } catch (err) {
      console.error(err);
      setGeminiSuggestion("Failed to get a suggestion.");
    } finally {
      setGeminiLoading(false);
    }
  };

  return (
    <div className="card card-compact min-w-60 h-60 bg-base-100 shadow-xl">
      {isLoading ? (
        <div className="h-full flex justify-center items-center p-4">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : (
        <>
          <figure>
            {url ? (
              <img src={url} alt={`${name} image`} />
            ) : (
              <div className="flex justify-center items-center h-40">
                <span className="loading loading-spinner loading-lg" />
              </div>
            )}
          </figure>
          <div className="card-body ">
            <h2 className=" flex items-center gap-1 font-medium text-xl">
              {name}
            </h2>
            <p>
              🌡️ Temperature: {itemp} - {ftemp} °C
            </p>
            <p>
              💧 Humidity: {ihumidity} - {fhumidity} %
            </p>
            <p>
              🌱 Soil Moisture: {isoilmoisture} - {fsoilmoisture} %
            </p>

            {showSuggestionButton && (
              <>
                <button
                  className="btn btn-sm mt-2"
                  onClick={handleGeminiClick}
                  disabled={loadingSuggestion}
                >
                  {loadingSuggestion
                    ? "Getting Suggestion..."
                    : "Get AI Suggestion"}
                </button>
                {suggestion && (
                  <div className="mt-2 text-sm bg-gray-100 p-2 rounded max-h-40 overflow-y-auto text-black">
                    <strong>Gemini Suggestion:</strong>
                    <p className="text-black">{suggestion}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BookCard;
