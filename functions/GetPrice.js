import { ethers } from 'ethers'
import { GetProvider } from './GetProvider.js'
import { nft_abi } from '../abi.js'

export const GetPrice = async (req) => {
    const type = req.query.typeId
    const amount = req.query.amount

    // get provider depending on state (testing/production)
    const provider = process.env.state === 'testing' ? GetProvider('goerli') : GetProvider('polygon')

    // initialize contract object
    const bpp = new ethers.Contract(process.env.bpp_contract, nft_abi, provider)
    
    // query smart contract for price of given type * amount
    const price = await bpp.getPrice(type, amount)

    return parseInt(price)
}