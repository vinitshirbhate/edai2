import React, { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection, doc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db };

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const listAllPlants = async () => {
    const cropsCollection = collection(db, "Crops");
    const documentRef = doc(cropsCollection, "document");
    const farmSubCollection = collection(documentRef, "Farm");
    const cashCropsSubCollection = collection(documentRef, "Cashcrops");
    const indoorsSubCollection = collection(documentRef, "Indoor");

    const [farmDocs, cashCropsDocs, indoorsDocs] = await Promise.all([
      getDocs(farmSubCollection),
      getDocs(cashCropsSubCollection),
      getDocs(indoorsSubCollection),
    ]);

    return {
      farm: farmDocs.docs,
      cashCrops: cashCropsDocs.docs,
      indoor: indoorsDocs.docs,
    };
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  return (
    <FirebaseContext.Provider value={{ listAllPlants, getImageURL }}>
      {children}
    </FirebaseContext.Provider>
  );
};
