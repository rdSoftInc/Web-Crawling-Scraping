
// defining firebase configuration...

import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAC3wcWCjp5-MXTY4HtXh94U1IndKuShrs",
  authDomain: "web-crawling-scraping.firebaseapp.com",
  projectId: "web-crawling-scraping",
  storageBucket: "web-crawling-scraping.appspot.com",
  messagingSenderId: "174128680023",
  appId: "1:174128680023:web:8b7b2533f2e9f11969a712"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
