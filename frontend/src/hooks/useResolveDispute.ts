import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { arbitratorAbi } from '../contracts/abi/Arbitrator'
import { ARBITRATOR_CONTRACT_ADDRESS } from '../contracts/addresses'
import { useState } from 'react'

export function useResolveDispute() {
    const [hash, setHash] = useState<`0x${string}` | undefined>()

    const { writeContractAsync, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } =
        useWaitForTransactionReceipt({ hash })

    async function resolveDispute(
        escrowAddress: `0x${string}`,
        buyerWins: boolean
    ) {
        const txHash = await writeContractAsync({
            address: ARBITRATOR_CONTRACT_ADDRESS,
            abi: arbitratorAbi,
            functionName: 'resolveEscrow',
            args: [escrowAddress, buyerWins],
        })

        setHash(txHash)
    }

    return {
        resolveDispute,
        isPending,
        isConfirming,
        isSuccess,
        hash,
    }
}
