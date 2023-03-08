import { ethers } from "ethers"
import { GetProvider } from "./GetProvider.js"
import { nft_abi } from "../abi.js"

export const GetAllTypes = async() => {
    const provider = GetProvider(process.env.state === 'testing' ? 'goerli' : 'polygon')
    const bpp = new ethers.Contract(process.env.bpp_contract, nft_abi, provider)

    let type_objs = []
    let i = 0
    let stop = false
    
    while(!stop) {
        let obj = await bpp.types(i).catch(() => {
            stop = true
        })

        if(stop) break

        type_objs.push({
            name: obj.name,
            typeId: parseInt(obj.typeId),
            price: parseInt(obj.price),
            maxSupply: parseInt(obj.maxSupply),
            currentCount: parseInt(obj.currentCount)
        })

        i++
    }


    return type_objs
}