import { ethers } from "ethers";
import { arbitratorAbi } from "../../../frontend/src/contracts/abi/Arbitrator";

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const arbitrator = new ethers.Contract(
    process.env.ARBITRATOR_ADDRESS!,
    arbitratorAbi,
    wallet
);

export async function resolveOnChain(
    escrowAddress: string,
    buyerWins: boolean
) {
    const tx = await arbitrator.resolveEscrow(escrowAddress, buyerWins);
    await tx.wait();
    return tx.hash;
}