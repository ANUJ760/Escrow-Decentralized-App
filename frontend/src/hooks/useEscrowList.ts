import { useReadContract } from 'wagmi'
import { factoryAbi } from '../contracts/abi/EscrowFactory'
import { FACTORY_ADDRESS } from '../contracts/addresses'

export function useEscrowList() {
    const { data: escrowsLength, refetch: refetchLength } = useReadContract({
        address: FACTORY_ADDRESS,
        abi: factoryAbi,
        functionName: 'escrowsLength',
    })

    const { data: escrows, refetch: refetchEscrows } = useReadContract({
        address: FACTORY_ADDRESS,
        abi: factoryAbi,
        functionName: 'escrows',
        args: [BigInt(0)],
        query: { enabled: false },
    })

    return {
        escrowsLength,
        refetchLength,
        refetchEscrows,
    }
}
