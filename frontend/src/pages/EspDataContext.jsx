import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { app } from "../../firebase";

const EspDataContext = createContext();

export const useEspData = () => {
  return useContext(EspDataContext);
};

export const EspDataProvider = ({ children }) => {
  const [espData, setEspData] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, "EspData");
      try {
        const oneWeekAgo = getOneWeekAgoDateString();
        console.log("Fetching data from:", oneWeekAgo);
        const q = query(colRef, where("CreateTime", ">=", oneWeekAgo));
        const snapshot = await getDocs(q);

        const dataByDay = {};

        snapshot.docs.forEach((doc) => {
          const docData = doc.data();
          docData.CreateTime = convertStringToDate(docData.CreateTime);
          const dayKey = docData.CreateTime.toISOString().slice(0, 10); // Use date as key

          // Create an array for each day to hold multiple entries
          if (!dataByDay[dayKey]) {
            dataByDay[dayKey] = [];
          }

          // Push each entry into the respective day's array
          dataByDay[dayKey].push({
            CreateTime: docData.CreateTime,
            temperature: docData.Temperature,
            humidity: docData.Humidity,
            soilMoisture: docData.SoilMoisture,
          });
        });

        // Process each day's data to get the latest entry
        const data = Object.entries(dataByDay).map(([dayKey, entries]) => {
          const latestEntry = entries.reduce((latest, current) => {
            return current.CreateTime > latest.CreateTime ? current : latest;
          });

          return {
            name: latestEntry.CreateTime.toLocaleDateString("en-US", {
              weekday: "short",
            }),
            temperature: latestEntry.temperature,
            humidity: latestEntry.humidity,
            soilMoisture: latestEntry.soilMoisture,
            CreateTime: latestEntry.CreateTime,
          };
        });

        setEspData(data);
        console.log("Data fetched in EspDataProvider:", data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();

    // Schedule deletion of previous week's same day records more frequently for testing
    const intervalId = setInterval(
      deleteOneWeekAgoData,
      getMillisecondsUntilNextDay()
    );
    deleteOneWeekAgoData(); // Call it immediately for testing

    return () => clearInterval(intervalId); // Cleanup interval
  }, [db]);

  const deleteOneWeekAgoData = async () => {
    try {
      const oneWeekAgo = getOneWeekAgoDateString();
      const dayAfterOneWeekAgo = getDayAfterOneWeekAgoDateString();
      console.log("Deleting data from:", oneWeekAgo, "to:", dayAfterOneWeekAgo);
      const colRef = collection(db, "EspData");
      const q = query(
        colRef,
        where("CreateTime", ">=", oneWeekAgo),
        where("CreateTime", "<", dayAfterOneWeekAgo)
      );
      const snapshot = await getDocs(q);

      const batch = writeBatch(db);
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log("One week ago's data deleted.");
    } catch (err) {
      console.error("Error deleting one week ago's data:", err);
    }
  };

  const convertStringToDate = (dateString) => {
    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(4, 6)) - 1; // Months are 0-indexed
    const day = parseInt(dateString.substring(6, 8));
    const hour = parseInt(dateString.substring(8, 10));
    const minute = parseInt(dateString.substring(10, 12));
    const second = parseInt(dateString.substring(12, 14));

    return new Date(year, month, day, hour, minute, second);
  };

  const getOneWeekAgoDateString = () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const oneWeekAgo = date
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .slice(0, 14);
    console.log("One week ago date string:", oneWeekAgo);
    return oneWeekAgo; // Convert to yyyymmddhhmmss format
  };

  const getDayAfterOneWeekAgoDateString = () => {
    const date = new Date();
    date.setDate(date.getDate() - 6);
    const dayAfterOneWeekAgo = date
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .slice(0, 14);
    console.log("Day after one week ago date string:", dayAfterOneWeekAgo);
    return dayAfterOneWeekAgo; // Convert to yyyymmddhhmmss format
  };

  const getMillisecondsUntilNextDay = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1); // Calculate next day
    tomorrow.setHours(0, 0, 0, 0); // Set time to 00:00:00
    const millisecondsUntilNextDay = tomorrow - now;
    console.log("Milliseconds until next day:", millisecondsUntilNextDay);
    return millisecondsUntilNextDay;
  };

  return (
    <EspDataContext.Provider value={espData}>
      {children}
    </EspDataContext.Provider>
  );
};
