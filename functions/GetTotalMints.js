import { ethers } from "ethers"
import { nft_abi } from "../abi.js"
import { GetProvider } from "./GetProvider.js"

export const GetTotalMints = async (req) => {
    const type = req.query.typeId
    
    // get provider depending on state (testing/production)
    const provider = process.env.state === 'testing' ? GetProvider('goerli') : GetProvider('polygon')

    // initialize contract object
    const bpp = new ethers.Contract(process.env.bpp_contract, nft_abi, provider)

    // query smart contract for Type object at index 'type'
    const type_obj = await bpp.types(type)

    // return member of type_obj with current count of mints
    return `${parseInt(type_obj.currentCount)}/${parseInt(type_obj.maxSupply)}`
}