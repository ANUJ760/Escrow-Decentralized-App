import { useAccount, useReadContract } from "wagmi";
import { arbitratorAbi } from "../contracts/abi/Arbitrator";
import { ARBITRATOR_CONTRACT_ADDRESS } from "../contracts/addresses";

export function useArbitratorAccess() {
  const { address } = useAccount();
  const { data: owner, isLoading: isOwnerLoading } = useReadContract({
    address: ARBITRATOR_CONTRACT_ADDRESS,
    abi: arbitratorAbi,
    functionName: "owner",
  });

  const ownerAddress = owner as `0x${string}` | undefined;
  const isArbitrator =
    !!address &&
    !!ownerAddress &&
    address.toLowerCase() === ownerAddress.toLowerCase();

  return { isArbitrator, ownerAddress, isOwnerLoading };
}
