"use client";

import { useAccount } from 'wagmi'
import { useEscrowDetails } from '../hooks/useEscrowDetails'
import { useFundEscrow } from '../hooks/useFundEscrow'
import { useSellerAcceptWork } from '../hooks/useSellerAcceptWork'
import { useSubmitWork } from '../hooks/useSubmitWork'
import { useVerifyWork } from '../hooks/useVerifyWork'
import { useRaiseDispute } from '../hooks/useRaiseDispute'
import { useWithdrawFunds } from '../hooks/useWithdrawFunds'
import { useCancelEscrow } from '../hooks/useCancelEscrow'
import { useEffect } from 'react'
import TransactionStatus from './TransactionStatus'

interface EscrowActionsProps {
    escrowAddress: `0x${string}`
}

export default function EscrowActions({ escrowAddress }: EscrowActionsProps) {
    const { address } = useAccount()
    const { buyer, seller, amount, state, fundsWithdrawn, refetchState } = useEscrowDetails(escrowAddress)

    const { fundEscrow, isPending: isFunding, isSuccess: fundSuccess, hash: fundHash } = useFundEscrow()
    const { sellerAcceptWork, isPending: isAccepting, isSuccess: acceptSuccess, hash: acceptHash } = useSellerAcceptWork()
    const { submitWork, isPending: isSubmitting, isSuccess: submitSuccess, hash: submitHash } = useSubmitWork()
    const { verifyWork, isPending: isVerifying, isSuccess: verifySuccess, hash: verifyHash } = useVerifyWork()
    const { raiseDispute, isPending: isDisputing, isSuccess: disputeSuccess, hash: disputeHash } = useRaiseDispute()
    const { withdrawFunds, isPending: isWithdrawing, isSuccess: withdrawSuccess, hash: withdrawHash } = useWithdrawFunds()
    const { cancelEscrow, isPending: isCancelling, isSuccess: cancelSuccess, hash: cancelHash } = useCancelEscrow()

    const isBuyer = address?.toLowerCase() === (buyer as string)?.toLowerCase()
    const isSeller = address?.toLowerCase() === (seller as string)?.toLowerCase()

    useEffect(() => {
        if (fundSuccess || acceptSuccess || submitSuccess || verifySuccess ||
            disputeSuccess || withdrawSuccess || cancelSuccess) {
            setTimeout(() => refetchState(), 2000)
        }
    }, [fundSuccess, acceptSuccess, submitSuccess, verifySuccess,
        disputeSuccess, withdrawSuccess, cancelSuccess, refetchState])

    const renderActions = () => {
        // State 0: CREATED
        if (state === 0 && isBuyer) {
            return (
                <div className="space-y-4">
                    <button
                        onClick={() => amount && fundEscrow(escrowAddress, amount as bigint)}
                        disabled={isFunding}
                        className="btn-primary w-full py-6 text-xl"
                    >
                        {isFunding ? 'Funding...' : 'Deposit Funds'}
                    </button>
                    <TransactionStatus isPending={isFunding} isSuccess={fundSuccess} hash={fundHash} />
                </div>
            )
        }

        // State 1: FUNDED
        if (state === 1) {
            return (
                <div className="space-y-4">
                    {isSeller && (
                        <button
                            onClick={() => sellerAcceptWork(escrowAddress)}
                            disabled={isAccepting}
                            className="btn-primary w-full py-6 text-xl"
                        >
                            {isAccepting ? 'Accepting...' : 'Accept Assignment'}
                        </button>
                    )}
                    {isBuyer && (
                        <button
                            onClick={() => cancelEscrow(escrowAddress)}
                            disabled={isCancelling}
                            className="btn-secondary w-full py-4 text-xs font-bold uppercase tracking-widest text-gray-500"
                        >
                            {isCancelling ? 'Cancelling...' : 'Cancel Contract'}
                        </button>
                    )}
                    <TransactionStatus isPending={isAccepting} isSuccess={acceptSuccess} hash={acceptHash} />
                    <TransactionStatus isPending={isCancelling} isSuccess={cancelSuccess} hash={cancelHash} />
                </div>
            )
        }

        // State 2: IN_PROGRESS
        if (state === 2 && isSeller) {
            return (
                <div className="space-y-4">
                    <button
                        onClick={() => submitWork(escrowAddress)}
                        disabled={isSubmitting}
                        className="btn-primary w-full py-6 text-xl"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Deliverable'}
                    </button>
                    <TransactionStatus isPending={isSubmitting} isSuccess={submitSuccess} hash={submitHash} />
                </div>
            )
        }

        // State 3: SUBMITTED
        if (state === 3 && isBuyer) {
            return (
                <div className="space-y-6">
                    <button
                        onClick={() => verifyWork(escrowAddress)}
                        disabled={isVerifying}
                        className="btn-primary w-full py-6 text-xl"
                    >
                        {isVerifying ? 'Verifying...' : 'Approve & Release Funds'}
                    </button>
                    <button
                        onClick={() => raiseDispute(escrowAddress)}
                        disabled={isDisputing}
                        className="btn-danger w-full py-4 text-xs font-bold uppercase tracking-widest"
                    >
                        {isDisputing ? 'Disputing...' : 'Raise Formal Dispute'}
                    </button>
                    <TransactionStatus isPending={isVerifying} isSuccess={verifySuccess} hash={verifyHash} />
                    <TransactionStatus isPending={isDisputing} isSuccess={disputeSuccess} hash={disputeHash} />
                </div>
            )
        }

        // State 4: DISPUTED
        if (state === 4) {
            return (
                <div className="py-8 text-center border-t border-black/5">
                    <p className="text-gray-500 italic text-sm">Waiting for arbitrator resolution</p>
                </div>
            )
        }

        // State 5: RESOLVED, 6: COMPLETED, 7: CANCELLED
        if ((state === 5 || state === 6 || state === 7) && !fundsWithdrawn) {
            const canWithdraw = (state === 5 && (isBuyer || isSeller)) || (state === 6 && isSeller) || (state === 7 && isBuyer);

            if (canWithdraw) {
                return (
                    <div className="space-y-4">
                        <button
                            onClick={() => withdrawFunds(escrowAddress)}
                            disabled={isWithdrawing}
                            className="btn-primary w-full py-6 text-xl"
                        >
                            {isWithdrawing ? 'Withdrawing...' : 'Withdraw Funds'}
                        </button>
                        <TransactionStatus isPending={isWithdrawing} isSuccess={withdrawSuccess} hash={withdrawHash} />
                    </div>
                )
            }
        }

        return (
            <div className="text-gray-400 py-4 text-xs uppercase tracking-widest font-bold">
                Status: Finalized
            </div>
        )
    }

    return <div>{renderActions()}</div>
}
