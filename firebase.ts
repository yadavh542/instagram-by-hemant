// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQE6MB28s3AGaPKlA5YZcPGVHoo51lZkM",
  authDomain: "instagram-by-hemant.firebaseapp.com",
  projectId: "instagram-by-hemant",
  storageBucket: "instagram-by-hemant.appspot.com",
  messagingSenderId: "592889262495",
  appId: "1:592889262495:web:7928d69503f1c81d674daa"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig):getApp();
const db=getFirestore();
const storage=getStorage();

export {app,db,storage};