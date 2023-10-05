import { db as FirebaseDB } from "./firebase-config.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

function encodeURLtoBase64(url) {
    return Buffer.from(url).toString('base64');
}

export async function storeData(data, collectionName, url) {
    const encodedUrl = encodeURLtoBase64(url);
    if(await checkExist(collectionName, encodedUrl)){
        await updateDoc(doc(FirebaseDB, collectionName, encodedUrl), data);
    } else {
        await setDoc(doc(FirebaseDB, collectionName, encodedUrl), data);
    }
    console.log("data stored")
}

export async function getData(collectionName, url) {
    const encodedUrl = encodeURLtoBase64(url);
    const collectionSnapshot = doc(FirebaseDB, collectionName, encodedUrl);
    const docSnap = await getDoc(collectionSnapshot);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    }
}

export async function checkExist(collectionName, url) {
    const encodedUrl = encodeURLtoBase64(url);
    const collectionSnapshot = doc(FirebaseDB, collectionName, encodedUrl);
    const docSnap = await getDoc(collectionSnapshot);
    if (docSnap.exists()) {
        console.log("Document exists:", docSnap.data());
        return true;
    } else {
        return false;
    }
}