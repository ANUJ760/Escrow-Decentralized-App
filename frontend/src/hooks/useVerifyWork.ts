import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { escrowAbi } from '../contracts/abi/Escrow'
import { useState } from 'react'

export function useVerifyWork() {
    const [hash, setHash] = useState<`0x${string}` | undefined>()

    const { writeContractAsync, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } =
        useWaitForTransactionReceipt({ hash })

    async function verifyWork(escrowAddress: `0x${string}`) {
        const txHash = await writeContractAsync({
            address: escrowAddress,
            abi: escrowAbi,
            functionName: 'verifyWork',
        })

        setHash(txHash)
    }

    return {
        verifyWork,
        isPending,
        isConfirming,
        isSuccess,
        hash,
    }
}
