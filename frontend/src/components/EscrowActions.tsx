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

interface EscrowActionsProps {
    escrowAddress: `0x${string}`
}

export default function EscrowActions({ escrowAddress }: EscrowActionsProps) {
    const { address } = useAccount()
    const { buyer, seller, amount, state, fundsWithdrawn, refetchState } = useEscrowDetails(escrowAddress)

    const { fundEscrow, isPending: isFunding, isSuccess: fundSuccess } = useFundEscrow()
    const { sellerAcceptWork, isPending: isAccepting, isSuccess: acceptSuccess } = useSellerAcceptWork()
    const { submitWork, isPending: isSubmitting, isSuccess: submitSuccess } = useSubmitWork()
    const { verifyWork, isPending: isVerifying, isSuccess: verifySuccess } = useVerifyWork()
    const { raiseDispute, isPending: isDisputing, isSuccess: disputeSuccess } = useRaiseDispute()
    const { withdrawFunds, isPending: isWithdrawing, isSuccess: withdrawSuccess } = useWithdrawFunds()
    const { cancelEscrow, isPending: isCancelling, isSuccess: cancelSuccess } = useCancelEscrow()

    const isBuyer = address?.toLowerCase() === buyer?.toLowerCase()
    const isSeller = address?.toLowerCase() === seller?.toLowerCase()

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
                <button
                    onClick={() => amount && fundEscrow(escrowAddress, amount)}
                    disabled={isFunding}
                    className="btn-primary w-full"
                >
                    {isFunding ? 'Funding...' : 'Fund Escrow'}
                </button>
            )
        }

        // State 1: FUNDED
        if (state === 1) {
            return (
                <div className="space-y-3">
                    {isSeller && (
                        <button
                            onClick={() => sellerAcceptWork(escrowAddress)}
                            disabled={isAccepting}
                            className="btn-primary w-full"
                        >
                            {isAccepting ? 'Accepting...' : 'Accept Work'}
                        </button>
                    )}
                    {isBuyer && (
                        <button
                            onClick={() => cancelEscrow(escrowAddress)}
                            disabled={isCancelling}
                            className="btn-secondary w-full"
                        >
                            {isCancelling ? 'Cancelling...' : 'Cancel (if deadline passed)'}
                        </button>
                    )}
                </div>
            )
        }

        // State 2: IN_PROGRESS
        if (state === 2 && isSeller) {
            return (
                <button
                    onClick={() => submitWork(escrowAddress)}
                    disabled={isSubmitting}
                    className="btn-primary w-full"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Work'}
                </button>
            )
        }

        // State 3: SUBMITTED
        if (state === 3 && isBuyer) {
            return (
                <div className="space-y-3">
                    <button
                        onClick={() => verifyWork(escrowAddress)}
                        disabled={isVerifying}
                        className="btn-primary w-full"
                    >
                        {isVerifying ? 'Verifying...' : 'Approve Work'}
                    </button>
                    <button
                        onClick={() => raiseDispute(escrowAddress)}
                        disabled={isDisputing}
                        className="btn-danger w-full"
                    >
                        {isDisputing ? 'Disputing...' : 'Raise Dispute'}
                    </button>
                </div>
            )
        }

        // State 4: DISPUTED
        if (state === 4) {
            return (
                <div className="glass-card p-4 bg-yellow-500/10 border-yellow-500/30 text-center">
                    <p className="text-yellow-300 font-semibold">Waiting for arbitrator to resolve dispute</p>
                </div>
            )
        }

        // State 5: RESOLVED
        if (state === 5 && !fundsWithdrawn) {
            return (
                <button
                    onClick={() => withdrawFunds(escrowAddress)}
                    disabled={isWithdrawing}
                    className="btn-primary w-full"
                >
                    {isWithdrawing ? 'Withdrawing...' : 'Withdraw Funds'}
                </button>
            )
        }

        // State 6: COMPLETED
        if (state === 6 && isSeller && !fundsWithdrawn) {
            return (
                <button
                    onClick={() => withdrawFunds(escrowAddress)}
                    disabled={isWithdrawing}
                    className="btn-primary w-full"
                >
                    {isWithdrawing ? 'Withdrawing...' : 'Withdraw Funds'}
                </button>
            )
        }

        // State 7: CANCELLED
        if (state === 7 && isBuyer && !fundsWithdrawn) {
            return (
                <button
                    onClick={() => withdrawFunds(escrowAddress)}
                    disabled={isWithdrawing}
                    className="btn-primary w-full"
                >
                    {isWithdrawing ? 'Withdrawing...' : 'Withdraw Funds'}
                </button>
            )
        }

        return (
            <div className="text-center text-gray-400 py-4">
                No actions available
            </div>
        )
    }

    return <div>{renderActions()}</div>
}
