// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBWBlzlfOH8w-WAeUL7Bfv7lxy_qTnbGug",
    authDomain: "zalo-chat-5d081.firebaseapp.com",
    databaseURL: "https://zalo-chat-5d081-default-rtdb.firebaseio.com",
    projectId: "zalo-chat-5d081",
    storageBucket: "zalo-chat-5d081.appspot.com",
    messagingSenderId: "313123780201",
    appId: "1:313123780201:web:8a746e6f081c9cb4ec14f8",
    measurementId: "G-3RPF84T4EW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // Add this line to initialize authentication

export { db, storage, auth };
