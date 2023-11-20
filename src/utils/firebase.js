// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYUWfBz7d1emmFgVm2I8oIb6JjizrjGMA",
  authDomain: "netflixgpt-2f1d4.firebaseapp.com",
  projectId: "netflixgpt-2f1d4",
  storageBucket: "netflixgpt-2f1d4.appspot.com",
  messagingSenderId: "1069153983460",
  appId: "1:1069153983460:web:6ea74695ecd5cd13f105f1",
  measurementId: "G-1V61K8VMB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
