import React, { useEffect, useState } from "react";

import { useFirebase } from "../../firebase";

const BookCard = ({
  name,
  imageURL,
  itemp,
  ftemp,
  ihumidity,
  fhumidity,
  isoilmoisture,
  fsoilmoisture,
}) => {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <div className="card card-compact min-w-60 h-60 bg-base-100 shadow-xl">
        {isLoading ? (
          <div className="h-full flex justify-center">
            <span className="loading loading-bars loading-lg" />
          </div>
        ) : (
          <>
            <figure>
              {url ? (
                <img src={url} alt={`${name} image`} />
              ) : (
                <div className="flex flex-col justify-center m-10">
                  <span className="loading loading-spinner loading-lg " />
                </div>
              )}
            </figure>
            <div className="card-body h-40">
              <h2 className=" flex items-center gap-1 font-medium text-xl">
                {name}
              </h2>
              Temperature: {itemp} - {ftemp}
              <br />
              Humidity: {ihumidity} - {fhumidity}
              <br />
              Soil Moisture: {isoilmoisture} - {fsoilmoisture}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BookCard;
