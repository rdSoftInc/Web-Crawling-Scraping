
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC3qizv244bfEjN6b0tqsUB_m3UGfrd7MY",
  authDomain: "codebox-5ef5b.firebaseapp.com",
  databaseURL: "https://codebox-5ef5b.firebaseio.com",
  projectId: "codebox-5ef5b",
  storageBucket: "codebox-5ef5b.appspot.com",
  messagingSenderId: "227682819198",
  appId: "1:227682819198:web:d645da5ee5504709c08c2f",
  measurementId: "G-5R78N5DVLE"
};

const Firebase = initializeApp(firebaseConfig);
const FirebaseDB = getFirestore(Firebase);

export default FirebaseDB;
