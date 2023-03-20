import { initializeApp } from "firebase/app"
import { getFirestore, collection, query, getDocs, where, setDoc, doc } from 'firebase/firestore/lite'
import { VerifySignature } from "./VerifySignature.js"
import { GetProvider } from "./GetProvider.js"
import { ethers } from "ethers"
import { nft_abi } from "../abi.js"
import dotenv from 'dotenv'
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

export const RevealMetadata = async (tokenId, signature, message, address) => {
    if(process.env.state === 'production') {
        /**
         * Verify that the caller is who they claim to be and that they
         * own the token they are trying to reveal
         */
        if(!VerifySignature(signature,address,message,tokenId)) return false
    }

    let provider = GetProvider( process.env.state === 'testing' ? 'goerli' : 'polygon' )
    const contract = new ethers.Contract(process.env.bpp_contract, nft_abi, provider)

    // get the token ID's mapping to its corresponding type and index - to be used in db query
    const type = parseInt(await contract.token_type(tokenId))
    const index = parseInt(await contract.token_index(tokenId))

    // query db for given type and index
    const q = query(collection(db, "metadata"), where("tokenId", "==", index.toString()), where("type", "==", type.toString()))
    const Snapshot = await getDocs(q)

    if(Snapshot.docs.length === 0) {
        throw 'No result for that tokenId'
    }
    const refId = Snapshot.docs[0].ref.id

    const mdRef = collection(db, 'metadata')
    // change reveal to true
    setDoc(doc(mdRef, refId), {
        reveal: true
    }, {merge: true})

    return true
}