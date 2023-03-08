import { initializeApp } from "firebase/app"
import dotenv from 'dotenv'
import { getFirestore, collection, query, getDocs, where } from 'firebase/firestore/lite'
dotenv.config()

const firebaseConfig = {
    apiKey: process.env.fb_key,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
}
const fb = initializeApp(firebaseConfig)
const db = getFirestore(fb)

export const GetMetadata = async (tokenId, type) => {
    const q = query(collection(db, "metadata"), where("tokenId", "==", tokenId), where("type", "==", type))
    const Snapshot = await getDocs(q)

    if(Snapshot.docs.length === 0) {
        throw 'No result for that tokenId'
    }

    const md = Snapshot.docs[0].data()
    if(!md.reveal) {
        return {image: md.placeholder, name: `Unopened Pack`}
    }

    return md
}