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

  useEffect(() => {
    if (imageURL) {
      firebase.getImageURL(imageURL).then(setUrl).catch(console.error);
    }
  }, [firebase, imageURL]);

  return (
    <>
      <div className="card card-compact min-w-60 h-60 bg-base-100 shadow-xl">
        <figure>
          <img src={url} alt={`${name} image`} />
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
      </div>
    </>
  );
};

export default BookCard;
