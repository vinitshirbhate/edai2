import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { app } from '../../firebase';

const EspDataContext = createContext();

export const useEspData = () => {
    return useContext(EspDataContext);
};

export const EspDataProvider = ({ children }) => {
    const [espData, setEspData] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        const fetchData = async () => {
            const colRef = collection(db, 'EspData');
            try {
                const oneWeekAgo = getOneWeekAgoDateString();
                const q = query(colRef, orderBy('CreateTime', 'desc'), where('CreateTime', '>=', oneWeekAgo));
                const snapshot = await getDocs(q);

                const dataByDay = {};

                snapshot.docs.forEach(doc => {
                    const docData = doc.data();
                    docData.CreateTime = convertStringToDate(docData.CreateTime);
                    const dayKey = docData.CreateTime.toISOString().slice(0, 10); // Use date as key
                    
                    if (!dataByDay[dayKey]) {
                        // If no entry exists for this day, add the new entry
                        dataByDay[dayKey] = {
                            CreateTime: docData.CreateTime,
                            temperature: docData.Temperature,
                            humidity: docData.Humidity,
                            soilMoisture: docData.SoilMoisture
                        };
                    } else if (isSameDay(dataByDay[dayKey].CreateTime, docData.CreateTime)) {
                        // If an entry exists for this day and it's the same day as the new entry, update it
                        dataByDay[dayKey] = {
                            CreateTime: docData.CreateTime,
                            temperature: docData.Temperature,
                            humidity: docData.Humidity,
                            soilMoisture: docData.SoilMoisture
                        };
                    }
                });

                const data = Object.values(dataByDay).map(entry => ({
                    name: entry.CreateTime.toLocaleDateString('en-US', { weekday: 'short' }),
                    temperature: entry.temperature,
                    humidity: entry.humidity,
                    soilMoisture: entry.soilMoisture
                })).reverse(); // Reverse to show oldest first
                
                setEspData(data);
                console.log(data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        
        fetchData();
    }, [db]);

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
        return date.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14); // Convert to yyyymmddhhmmss format
    };

    // Function to check if two dates are on the same day
    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    return (
        <EspDataContext.Provider value={espData}>
            {children}
        </EspDataContext.Provider>
    );
};
