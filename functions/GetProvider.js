import { ethers } from "ethers"

export const GetProvider = (network) => {
    const providers = {
        'goerli': process.env.RPC_GOERLI,
        'polygon': process.env.RPC_POLYGON,
    }

    return new ethers.providers.JsonRpcProvider(providers[network])
}