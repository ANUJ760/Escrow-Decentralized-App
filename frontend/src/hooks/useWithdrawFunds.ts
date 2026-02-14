import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { escrowAbi } from '../contracts/abi/Escrow'
import { useState } from 'react'

export function useWithdrawFunds() {
    const [hash, setHash] = useState<`0x${string}` | undefined>()

    const { writeContractAsync, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } =
        useWaitForTransactionReceipt({ hash })

    async function withdrawFunds(escrowAddress: `0x${string}`) {
        const txHash = await writeContractAsync({
            address: escrowAddress,
            abi: escrowAbi,
            functionName: 'withdrawFunds',
        })

        setHash(txHash)
    }

    return {
        withdrawFunds,
        isPending,
        isConfirming,
        isSuccess,
        hash,
    }
}
