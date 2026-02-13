import { useWriteContract } from 'wagmi';
import { factoryAbi } from '../contracts/abi/EscrowFactory';
import { FACTORY_ADDRESS } from '../contracts/addresses';

export function useCreateEscrow() {

  const { writeContract, isPending } = useWriteContract();

  function createEscrow(buyer: string, seller: string) {
    writeContract({
      address: FACTORY_ADDRESS,
      abi: factoryAbi,
      functionName: 'createEscrow',
      args: [
        buyer,
        seller,
        BigInt(10_000_000_000_000_000), // 0.01 ETH
        86400
      ],
    });
  }

  return { createEscrow, isPending };
}
