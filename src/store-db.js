import { db as FirebaseDB } from "./firebase-config.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

function encodeURLtoBase64(url) {
    return Buffer.from(url).toString('base64');
}

export async function storeData(data, collectionName, url) {
    const changedUrl = url.replace("https://","")
    if(await checkExist(collectionName, changedUrl)){
        await updateDoc(doc(FirebaseDB, collectionName, changedUrl), data);
    } else {
        await setDoc(doc(FirebaseDB, collectionName, changedUrl), data);
    }
    console.log("data stored")
}

export async function getData(collectionName, uchangedUrlrl) {
    const changedUrl = url.replace("https://","")
    const collectionSnapshot = doc(FirebaseDB, collectionName, changedUrl);
    const docSnap = await getDoc(collectionSnapshot);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    }
}

export async function checkExist(collectionName, url) {
    const changedUrl = url.replace("https://","")
    const collectionSnapshot = doc(FirebaseDB, collectionName, changedUrl);
    const docSnap = await getDoc(collectionSnapshot);
    if (docSnap.exists()) {
        console.log("Document exists:", docSnap.data());
        return true;
    } else {
        return false;
    }
}