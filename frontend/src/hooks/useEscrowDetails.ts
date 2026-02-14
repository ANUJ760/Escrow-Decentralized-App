import { useReadContract } from 'wagmi'
import { escrowAbi } from '../contracts/abi/Escrow'

export function useEscrowDetails(escrowAddress: `0x${string}` | undefined) {
    const { data: buyer } = useReadContract({
        address: escrowAddress,
        abi: escrowAbi,
        functionName: 'buyer',
        query: { enabled: !!escrowAddress },
    })

    const { data: seller } = useReadContract({
        address: escrowAddress,
        abi: escrowAbi,
        functionName: 'seller',
        query: { enabled: !!escrowAddress },
    })

    const { data: amount } = useReadContract({
        address: escrowAddress,
        abi: escrowAbi,
        functionName: 'amount',
        query: { enabled: !!escrowAddress },
    })

    const { data: state, refetch: refetchState } = useReadContract({
        address: escrowAddress,
        abi: escrowAbi,
        functionName: 'state',
        query: { enabled: !!escrowAddress },
    })

    const { data: arbitrator } = useReadContract({
        address: escrowAddress,
        abi: escrowAbi,
        functionName: 'arbitrator',
        query: { enabled: !!escrowAddress },
    })

    const { data: fundsWithdrawn } = useReadContract({
        address: escrowAddress,
        abi: escrowAbi,
        functionName: 'fundsWithdrawn',
        query: { enabled: !!escrowAddress },
    })

    const { data: disputeWinner } = useReadContract({
        address: escrowAddress,
        abi: escrowAbi,
        functionName: 'disputeWinner',
        query: { enabled: !!escrowAddress },
    })

    return {
        buyer,
        seller,
        amount,
        state,
        arbitrator,
        fundsWithdrawn,
        disputeWinner,
        refetchState,
    }
}
