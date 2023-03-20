import express from 'express'
export const router = express.Router()

import bodyParser from 'body-parser'
import { initializeApp } from "firebase/app";
import { GetMetadata } from './functions/GetMetadata.js';
import { getFirestore } from 'firebase/firestore/lite'
import { RevealMetadata } from './functions/RevealMetadata.js';
import { GetPrice } from './functions/GetPrice.js';
import { GetTotalMints } from './functions/GetTotalMints.js';
import dotenv from 'dotenv'
import { GetAllTypes } from './functions/GetAllTypes.js';
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

if(db) {
    console.log('db connected')
}

// api.link/get_metadata?typeId=123&tokenId=10
router.get('/get_metadata', async (req, res) => {
    try{
        const tokenId = req.query.tokenId
        const type = req.query.typeId

        const result = await GetMetadata(tokenId, type)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.json({success: false, error: error})
    }
})

// api.link/get_metadata?tokenId=1234&signature=0x123lkj23l12kj3&message=6486849392&address=0xabcd1234
router.get('/reveal_metadata', async (req, res) => {
    try{
        const tokenId = req.query.tokenId
        const signature = req.query.signature
        const message = req.query.message
        const address = req.query.address

        const result = await RevealMetadata(tokenId, signature, message, address)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.json({success: false, error: error})
    }
})

// api.link/get_metadata?typeId=123&amount=3
router.get('/get_price', async (req, res) => {
    try {
        const type = req.query.typeId
        const amount = req.query.amount

        const result = await GetPrice(type, amount) 
        res.json(result)
    } catch (error) {
        console.log(error)
        res.json({success: false, error: error})
    }
})

// api.link/get_metadata?typeId=123
router.get('/get_total_mints', async (req, res) => {
    try {
        const type = req.query.typeId

        const result = await GetTotalMints(type) 
        res.json(result)
    } catch (error) {
        console.log(error)
        res.json({success: false, error: error})
    }
})

// no params required
router.get('/get_all_types', async (req, res) => {
    try {
        const result = await GetAllTypes()
        
        res.send(result)
    } catch (error) {
        res.json({success: false, error: error})
    }
})

router.use(bodyParser.json())