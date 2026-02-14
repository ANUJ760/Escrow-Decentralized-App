import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { escrowAbi } from '../contracts/abi/Escrow'
import { useState } from 'react'

export function useSellerAcceptWork() {
    const [hash, setHash] = useState<`0x${string}` | undefined>()

    const { writeContractAsync, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } =
        useWaitForTransactionReceipt({ hash })

    async function sellerAcceptWork(escrowAddress: `0x${string}`) {
        const txHash = await writeContractAsync({
            address: escrowAddress,
            abi: escrowAbi,
            functionName: 'sellerAcceptWork',
        })

        setHash(txHash)
    }

    return {
        sellerAcceptWork,
        isPending,
        isConfirming,
        isSuccess,
        hash,
    }
}
