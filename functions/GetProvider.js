import { ethers } from "ethers"

export const GetProvider = (network) => {
    const providers = {
        'goerli': process.env.RPC_GOERLI,
        'polygon': process.env.RPC_POLYGON,
        'sepolia': process.env.RPC_SEPOLIA
    }

    return new ethers.providers.JsonRpcProvider(providers[network])
}