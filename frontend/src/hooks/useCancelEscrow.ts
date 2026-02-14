import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { escrowAbi } from '../contracts/abi/Escrow'
import { useState } from 'react'

export function useCancelEscrow() {
    const [hash, setHash] = useState<`0x${string}` | undefined>()

    const { writeContractAsync, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } =
        useWaitForTransactionReceipt({ hash })

    async function cancelEscrow(escrowAddress: `0x${string}`) {
        const txHash = await writeContractAsync({
            address: escrowAddress,
            abi: escrowAbi,
            functionName: 'cancelIfDeadlinePassed',
        })

        setHash(txHash)
    }

    return {
        cancelEscrow,
        isPending,
        isConfirming,
        isSuccess,
        hash,
    }
}
