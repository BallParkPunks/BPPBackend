import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import dotenv from 'dotenv'


dotenv.config()
import { getFirestore, collection, query, getDocs, where, setDoc, doc } from 'firebase/firestore/lite'
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

export const GetMetadata = async (req) => {
    const tokenId = req.query.tokenId

    const q = query(collection(db, "metadata"), where("tokenId", "==", tokenId))
    const Snapshot = await getDocs(q)

    if(Snapshot.docs.length === 0) {
        throw 'No contract found with that address'
    }

    const md = Snapshot.docs[0].data()

    // let metadataObj = {
    //     name: md.name,
    //     attributes: md.attributes,
    //     image: md.image
    // }

    return md
}