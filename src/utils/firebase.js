import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4dplgi70mWA4ELcJJ0NXRecIdDttUC-I",
  authDomain: "kurrykitchen-1f3cc.firebaseapp.com",
  projectId: "kurrykitchen-1f3cc",
  storageBucket: "kurrykitchen-1f3cc.appspot.com",
  messagingSenderId: "793558914060",
  appId: "1:793558914060:web:ad8b19f8c8ec97c50d4a29",
  measurementId: "G-W7X2JQS579"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();