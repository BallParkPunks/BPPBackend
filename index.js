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

router.get('/reveal_metadata', async (req, res) => {
    try{
        const result = await RevealMetadata(req)

        res.json(result)
    } catch (error) {
        console.log(error)
        res.json({success: false, error: error})
    }
})

router.get('/get_price', async (req, res) => {
    try {
        const result = await GetPrice(req) 
        res.json(result)
    } catch (error) {
        console.log(error)
        res.json({success: false, error: error})
    }
})

router.get('/get_total_mints', async (req, res) => {
    try {
        const result = await GetTotalMints(req) 
        res.json(result)
    } catch (error) {
        console.log(error)
        res.json({success: false, error: error})
    }
})

router.use(bodyParser.json())