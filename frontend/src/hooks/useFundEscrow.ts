import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { escrowAbi } from '../contracts/abi/Escrow'
import { useState } from 'react'

export function useFundEscrow() {
    const [hash, setHash] = useState<`0x${string}` | undefined>()

    const { writeContractAsync, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } =
        useWaitForTransactionReceipt({ hash })

    async function fundEscrow(escrowAddress: `0x${string}`, amount: bigint) {
        const txHash = await writeContractAsync({
            address: escrowAddress,
            abi: escrowAbi,
            functionName: 'fundEscrow',
            value: amount,
        })

        setHash(txHash)
    }

    return {
        fundEscrow,
        isPending,
        isConfirming,
        isSuccess,
        hash,
    }
}
