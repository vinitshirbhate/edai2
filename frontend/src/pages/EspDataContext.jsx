import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
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
                // Query the collection and order the documents by creation time in descending order
                const q = query(colRef, orderBy('CreateTime', 'desc'), limit(1));
                const snapshot = await getDocs(q);
                
                // Check if there are any documents returned
                if (!snapshot.empty) {
                    // Get the latest document's data
                    const latestDocData = snapshot.docs[0].data();
                    latestDocData.CreateTime = convertStringToDate(latestDocData.CreateTime);
                    setEspData(() => latestDocData);
                    console.log(latestDocData);
                } else {
                    console.log("No documents found in the collection.");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        
        fetchData();
    }, [db]);

     // Helper function to convert yyyymmddhhmmss to Date
     const convertStringToDate = (dateString) => {
        const year = parseInt(dateString.substring(0, 4));
        const month = parseInt(dateString.substring(4, 6)) - 1; // Months are 0-indexed
        const day = parseInt(dateString.substring(6, 8));
        const hour = parseInt(dateString.substring(8, 10));
        const minute = parseInt(dateString.substring(10, 12));
        const second = parseInt(dateString.substring(12, 14));

        return new Date(year, month, day, hour, minute, second);
    };

    return (
        <EspDataContext.Provider value={espData}>
            {children}
        </EspDataContext.Provider>
    );
};