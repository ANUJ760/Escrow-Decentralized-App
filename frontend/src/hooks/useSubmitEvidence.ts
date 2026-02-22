import { useWriteContract } from 'wagmi'
import { escrowAbi } from '../contracts/abi/Escrow'
import { uploadToIPFS } from '../lib/utils'

export function useSubmitEvidence(escrowAddress: `0x${string}`) {

    const { writeContract } = useWriteContract()

    async function submit(file: File) {
        const cid = await uploadToIPFS(file)

        writeContract({
            address: escrowAddress,
            abi: escrowAbi,
            functionName: 'submitEvidence',
            args: [cid],
        })
    }

    return { submit }
}