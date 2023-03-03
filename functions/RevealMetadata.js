import { initializeApp } from "firebase/app";
import dotenv from 'dotenv'
import { getFirestore, collection, query, getDocs, where, setDoc, doc } from 'firebase/firestore/lite'
import { GetMetadata } from "./GetMetadata.js"
import { VerifySignature } from "./VerifySignature.js";
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

export const RevealMetadata = async (req) => {
    const tokenId = req.query.tokenId
    const signature = req.query.signature
    const message = req.query.message
    const address = req.query.address
    
    //if(!VerifySignature(signature,address,message,tokenId)) return false

    let metadata = GetMetadata(req)

    const mdRef = collection(db, 'metadata')

    metadata.reveal = true
    setDoc(doc(mdRef, tokenId), {
        reveal: true
    }, {merge: true})

    return true
}