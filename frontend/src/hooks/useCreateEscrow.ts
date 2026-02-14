import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { factoryAbi } from '../contracts/abi/EscrowFactory'
import { FACTORY_ADDRESS } from '../contracts/addresses'
import { useState } from 'react'

export function useCreateEscrow() {
  const [hash, setHash] = useState<`0x${string}` | undefined>()

  const { writeContractAsync, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({
      hash,
    })

  async function createEscrow(
    buyer: `0x${string}`,
    seller: `0x${string}`,
    amountEth: string,
    deadlineSeconds: number
  ) {
    const txHash = await writeContractAsync({
      address: FACTORY_ADDRESS,
      abi: factoryAbi,
      functionName: 'createEscrow',
      args: [
        buyer,
        seller,
        parseEther(amountEth),
        BigInt(deadlineSeconds),
      ],
    })

    setHash(txHash)
  }

  return {
    createEscrow,
    isPending,
    isConfirming,
    isSuccess,
    hash,
  }
}
