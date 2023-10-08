
// defining firebase configuration...

import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCG1M2gxLdXsw9Zu8qed6ZLmhfLiVLdpFA",
  authDomain: "web-crawling-scrapping.firebaseapp.com",
  projectId: "web-crawling-scrapping",
  storageBucket: "web-crawling-scrapping.appspot.com",
  messagingSenderId: "435166016600",
  appId: "1:435166016600:web:7d4eea871c5d946063062d",
  measurementId: "G-JGP75JV45B"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
