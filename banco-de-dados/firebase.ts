// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firestore from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGqC_4e11GxEbFdRRQaMMH1e7bzztqogI",
  authDomain: "beatriz-3485a.firebaseapp.com",
  projectId: "beatriz-3485a",
  storageBucket: "beatriz-3485a.appspot.com",
  messagingSenderId: "909119794790",
  appId: "1:909119794790:web:c0763dca298c0474a5c7a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const db = firestore.getFirestore(app)
export {firestore}