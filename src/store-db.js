
// imported external packages...

import { db as FirebaseDB } from "./firebase-config.js";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const collectionName = "wcs"

export async function storeData(data) {
    
    const parts = data.url.split('/');

    const uniqueUrl = parts[parts.length - 1];

    if (await checkExist(uniqueUrl)) {
        
        // await updateDoc(doc(FirebaseDB, collectionName, uniqueUrl), data);

        console.log('Exists ...', uniqueUrl);

    } else {

        await setDoc(doc(FirebaseDB, collectionName, uniqueUrl), data);

        console.log('Added ...', uniqueUrl);

    }
    
}

export async function checkExist(url) {

    const parts = url.split('/');

    const uniqueUrl = parts[parts.length - 1];
    
    const collectionSnapshot = doc(FirebaseDB, collectionName, uniqueUrl);

    const docSnap = await getDoc(collectionSnapshot);

    if (docSnap.exists()) {

        return true;

    } else {

        return false;

    }

}