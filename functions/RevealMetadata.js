import { initializeApp } from "firebase/app";
import dotenv from 'dotenv'
import { getFirestore, collection, query, getDocs, where, setDoc, doc } from 'firebase/firestore/lite'
import { GetMetadata } from "./GetMetadata.js"
import { VerifySignature } from "./VerifySignature.js";
import { GetProvider } from "./GetProvider.js";
import { ethers } from "ethers";
import { nft_abi } from "../abi.js";
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

    let provider = GetProvider( process.env.state === 'production' ? 'polygon' : 'goerli' )

    const contract = new ethers.Contract(process.env.bpp_contract, nft_abi, provider)

    const type = parseInt(await contract.token_type(tokenId))
    const index = parseInt(await contract.token_index(tokenId))

    const q = query(collection(db, "metadata"), where("tokenId", "==", index.toString()), where("type", "==", type.toString()))
    const Snapshot = await getDocs(q)
    if(Snapshot.docs.length === 0) {
        throw 'No result for that tokenId'
    }
    const refId = Snapshot.docs[0].ref.id

    const mdRef = collection(db, 'metadata')
    setDoc(doc(mdRef, refId), {
        reveal: true
    }, {merge: true})

    return true
}