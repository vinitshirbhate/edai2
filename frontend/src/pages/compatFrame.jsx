import React, { useEffect, useState } from "react";
import BookCard from "../components/Card";
import { useFirebase, FirebaseProvider } from "/EDAI_2/edai2/frontend/firebase";

const CompatFrame = () => {
  const firebase = useFirebase();
  const [crops, setCrops] = useState({ farm: [], cashCrops: [], indoor: [] });

  useEffect(() => {
    firebase.listAllPlants().then((cropsData) => setCrops(cropsData));
  }, [firebase]);

  return (
    <div className="container">
      <h2>Farm Crops</h2>
      <div className="grid">
        {crops.farm.map((crop) => (
          <BookCard key={crop.id} name={crop.id} {...crop.data()} />
        ))}
      </div>
      <h2>Cash Crops</h2>
      <div className="grid">
        {crops.cashCrops.map((crop) => (
          <BookCard key={crop.id} name={crop.id} {...crop.data()} />
        ))}
      </div>
      <h2>Indoors Crops</h2>
      <div className="grid">
        {crops.indoor.map((crop) => (
          <BookCard key={crop.id} name={crop.id} {...crop.data()} />
        ))}
      </div>
    </div>
  );
};

export default () => (
  <FirebaseProvider>
    <CompatFrame />
  </FirebaseProvider>
);
