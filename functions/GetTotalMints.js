import { ethers } from "ethers"
import { nft_abi } from "../abi.js"
import { GetProvider } from "./GetProvider.js"

export const GetTotalMints = async (req) => {
    const type = req.query.type
    const provider = process.env.state === 'testing' ? GetProvider('sepolia') : GetProvider('polygon')

    const nft = new ethers.Contract(process.env.bpp_contract, nft_abi, provider)

    const type_obj = await nft.types(type)

    return parseInt(type_obj.currentCount)
}