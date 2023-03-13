/**
 * @description This file contains logic to ensure that the wallet address sent
 * in a function call is owned by the originator of the function call. This is to
 * prevent updates and deployments from being performed on behalf of a wallet who 
 * did not request it. 
 */
import { initializeApp } from "firebase/app"
import { ethers } from "ethers"
import { getFirestore, collection, query, getDocs, setDoc, doc } from 'firebase/firestore/lite'
import { nft_abi } from "../abi.js"
import { GetProvider } from "./GetProvider.js"

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

export const VerifySignature = async(signature, address, message, tokenId) => {
    if((Date.now() - parseInt(message)) > 60000) return false;

    let provider = GetProvider( process.env.state === 'testing' ? 'goerli' : 'polygon' )
    const contract = new ethers.Contract(process.env.bpp_contract, nft_abi, provider)

    // Retrieve all used signatures from DB 
    const sigRef = collection(db, 'Signatures')
    const q = query(sigRef)
    const sigSnapshot = await getDocs(q)

    let usedSignatures = sigSnapshot.docs[0].data().usedSignatures

    // Make sure provided signature has not already been used
    if(usedSignatures.includes(signature)) console.log('used sig')
    if(usedSignatures.includes(signature)) return false

    // Add signature to DB to prevent reuse
    usedSignatures.push(signature)
    await setDoc(doc(sigRef, 'UsedSignatures'), {
        usedSignatures: usedSignatures,
    })

    // Recover originator of signature
    const recover = ethers.utils.verifyMessage(message, signature)

    // Ensure recovered address is equal to 'address'
    if(recover.toLowerCase() !== address.toLowerCase()) console.log(recover)
    if(recover.toLowerCase() !== address.toLowerCase()) return false

    const owner = await contract.ownerOf(tokenId)
    if (recover.toLowerCase() !== owner.toLowerCase()) return false

    // If all checks are passed, return true
    return true
}