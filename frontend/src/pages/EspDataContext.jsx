import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
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
            const colRef =  collection(db, 'EspData');
            try {
                const snapshot = await getDocs(colRef);
                const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setEspData(()=>data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [db]);

    return (
        <EspDataContext.Provider value={espData}>
            {children}
        </EspDataContext.Provider>
    );
};
