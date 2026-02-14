import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { escrowAbi } from '../contracts/abi/Escrow'
import { useState } from 'react'

export function useRaiseDispute() {
    const [hash, setHash] = useState<`0x${string}` | undefined>()

    const { writeContractAsync, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } =
        useWaitForTransactionReceipt({ hash })

    async function raiseDispute(escrowAddress: `0x${string}`) {
        const txHash = await writeContractAsync({
            address: escrowAddress,
            abi: escrowAbi,
            functionName: 'raiseDispute',
        })

        setHash(txHash)
    }

    return {
        raiseDispute,
        isPending,
        isConfirming,
        isSuccess,
        hash,
    }
}
