import FirebaseDB from "./firebase-config.js";
 
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

export async function storeData(data, collectionName,url) {
    if(checkExist(collectionName,url)){
        await updateDoc(doc(FirebaseDB, collectionName, url), data
        );
    }else{
         await setDoc(doc(FirebaseDB, collectionName, url), data
        );
    }
    console.log("data stored")
    console.log(await getData(collectionName,url),"data")         
}

export async function getData(collectionName,url){
    const collectionSnapshot = doc(FirebaseDB, collectionName, url);
    const docSnap = await getDoc(collectionSnapshot);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
      } else {
        console.log("No such document!");
      };
}

export async function checkExist(collectionName,url){
    const collectionSnapshot = doc(FirebaseDB, collectionName, url);
    const docSnap = await getDoc(collectionSnapshot);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return true
      } else {
        console.log("No such document!");
        return false
      };
}