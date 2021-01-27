import { configure } from "@testing-library/react";

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDRxSKWTaKWIdKKirRcFQeBB-S681LtF-I",
  authDomain: "to-do-app-6198a.firebaseapp.com",
  projectId: "to-do-app-6198a",
  storageBucket: "to-do-app-6198a.appspot.com",
  messagingSenderId: "367844272004",
  appId: "1:367844272004:web:b3fb3af29eea88c6fc9fd1",
  measurementId: "G-Y2W9NHHB2T",
});

const db = firebaseApp.firestore();
export default db;
