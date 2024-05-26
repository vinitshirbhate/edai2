import React, { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection, doc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyD5w9__r6FHfKNGdRYYFOfwCNEhSxwtKfY",
  authDomain: "edai2-98b68.firebaseapp.com",
  databaseURL: "https://edai2-98b68-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "edai2-98b68",
  storageBucket: "edai2-98b68.appspot.com",
  messagingSenderId: "318565585968",
  appId: "1:318565585968:web:a286f2503c24918b3fc9f5",
  measurementId: "G-VCQH2BTQFL",
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
      getDocs(indoorsSubCollection)
    ]);

    return {
      farm: farmDocs.docs,
      cashCrops: cashCropsDocs.docs,
      indoor: indoorsDocs.docs
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
