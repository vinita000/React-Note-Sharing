// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// import { getDatabase, ref } from "firebase/database";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyRLEqVAhxL85fPi4gXhvDPjxVYPQ7tsU",
  authDomain: "notesharing-app-b81ec.firebaseapp.com",
  databaseURL: "https://notesharing-app-b81ec-default-rtdb.firebaseio.com",
  projectId: "notesharing-app-b81ec",
  storageBucket: "notesharing-app-b81ec.appspot.com",
  messagingSenderId: "17914605774",
  appId: "1:17914605774:web:79ede7bb4cdc5a506fe09f",
  measurementId: "G-4D7FBSSR89"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();

// export const database = getDatabase(app);
// export const notesRef = ref(database, 'notes');
