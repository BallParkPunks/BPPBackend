import express from 'express'
export const router = express.Router()
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { GetMetadata } from './functions/GetMetadata.js';

dotenv.config()
import { getFirestore } from 'firebase/firestore/lite'
import { RevealMetadata } from './functions/RevealMetadata.js';
import { GetPrice } from './functions/GetPrice.js';
import { GetTotalMints } from './functions/GetTotalMints.js';
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
        const result = await GetMetadata(req)

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