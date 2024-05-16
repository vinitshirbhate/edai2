import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
