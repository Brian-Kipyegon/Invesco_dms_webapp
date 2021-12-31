// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDiIfpBjlcxcUY3JD88SFF5_qCI7ckLg0",
    authDomain: "dms-webapp-cd49c.firebaseapp.com",
    projectId: "dms-webapp-cd49c",
    storageBucket: "dms-webapp-cd49c.appspot.com",
    messagingSenderId: "764816456580",
    appId: "1:764816456580:web:b524a9c91117782434fbd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };