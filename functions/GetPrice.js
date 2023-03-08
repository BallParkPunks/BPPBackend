import { ethers } from 'ethers'
import { GetProvider } from './GetProvider.js'
import { nft_abi } from '../abi.js'

export const GetPrice = async (req) => {
    const type = req.query.type
    const amount = req.query.amount

    const provider = process.env.state === 'testing' ? GetProvider('goerli') : GetProvider('polygon')
    const bpp = new ethers.Contract(process.env.bpp_contract, nft_abi, provider)

    const price = await bpp.getPrice(type, amount)

    return parseInt(price)
}