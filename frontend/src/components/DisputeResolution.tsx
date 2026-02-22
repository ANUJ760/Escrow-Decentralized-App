"use client";

import { useAccount } from 'wagmi'
import { useResolveDispute } from '../hooks/useResolveDispute'
import { useEscrowDetails } from '../hooks/useEscrowDetails'
import { useAIVerdict } from '../hooks/useAIVerdict'
import { useState } from 'react'
import { ARBITRATOR_ADDRESS } from '../contracts/addresses'
import TransactionStatus from './TransactionStatus'

interface DisputeResolutionProps {
    escrowAddress: `0x${string}`
}

export default function DisputeResolution({ escrowAddress }: DisputeResolutionProps) {
    const { address } = useAccount()
    const { state, buyer, seller, buyerEvidenceCID, sellerEvidenceCID } = useEscrowDetails(escrowAddress)
    const { resolveDispute, isPending, isConfirming, isSuccess, hash } = useResolveDispute()
    const { getVerdict, isLoading: isAILoading, error: aiError } = useAIVerdict()
    const [selectedWinner, setSelectedWinner] = useState<'buyer' | 'seller' | null>(null)

    const isArbitrator = address?.toLowerCase() === ARBITRATOR_ADDRESS.toLowerCase()

    if (state !== 4) {
        return null
    }

    if (!isArbitrator) {
        return (
            <div className="p-10 bg-black/5 border border-black/10 rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-2xl font-black text-black">Dispute in Progress</h3>
                </div>
                <p className="text-lg text-gray-700">
                    The arbitrator has been notified. This contract is frozen until a verdict is reached.
                </p>
            </div>
        )
    }

    async function handleAIVerdict() {
        const cid = buyerEvidenceCID || sellerEvidenceCID
        if (!cid) return

        try {
            const result = await getVerdict(cid as string)
            setSelectedWinner(result ? 'buyer' : 'seller')
        } catch {
            // error is already tracked in useAIVerdict state
        }
    }

    const hasEvidence = !!(buyerEvidenceCID || sellerEvidenceCID)

    return (
        <div className="glass-card p-10 bg-white/40 border-white/60">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-4xl font-black text-black">Arbitrator Decision</h2>
            </div>

            {/* AI Verdict Button */}
            {hasEvidence && (
                <div className="mb-10">
                    <button
                        onClick={handleAIVerdict}
                        disabled={isAILoading}
                        className="w-full p-8 rounded-2xl border-2 border-black/10 bg-white/50 hover:bg-white/80 transition-all text-black font-black text-xl flex items-center justify-center gap-4 disabled:opacity-50 group"
                    >
                        {isAILoading ? (
                            <>
                                <span className="animate-spin text-3xl">.</span>
                                Analyzing Evidence...
                            </>
                        ) : (
                            "Request AI Verdict"
                        )}
                    </button>
                    {aiError && (
                        <p className="text-red-600 text-sm mt-4 font-bold">System Error: {aiError}</p>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <button
                    onClick={() => setSelectedWinner('buyer')}
                    className={`p-10 rounded-2xl border-4 transition-all text-left space-y-2 ${selectedWinner === 'buyer'
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-black/5 bg-white/20 hover:border-black/10'
                        }`}
                >
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Option 01</div>
                    <div className="text-3xl font-black text-black">Buyer Wins</div>
                    <p className="text-sm text-gray-600">Release funds to {(buyer as string)?.slice(0, 10)}...</p>
                </button>

                <button
                    onClick={() => setSelectedWinner('seller')}
                    className={`p-10 rounded-2xl border-4 transition-all text-left space-y-2 ${selectedWinner === 'seller'
                        ? 'border-purple-500 bg-purple-50/50'
                        : 'border-black/5 bg-white/20 hover:border-black/10'
                        }`}
                >
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Option 02</div>
                    <div className="text-3xl font-black text-black">Seller Wins</div>
                    <p className="text-sm text-gray-600">Release funds to {(seller as string)?.slice(0, 10)}...</p>
                </button>
            </div>

            <button
                onClick={() => selectedWinner && resolveDispute(escrowAddress, selectedWinner === 'buyer')}
                disabled={!selectedWinner || isPending || isConfirming}
                className="w-full mt-10 py-6 rounded-2xl bg-black text-white text-2xl font-black hover:bg-gray-800 transition-all disabled:opacity-20"
            >
                {isPending || isConfirming ? 'Finalizing...' : 'Resolve Dispute'}
            </button>

            <div className="mt-6">
                <TransactionStatus
                    isPending={isPending}
                    isConfirming={isConfirming}
                    isSuccess={isSuccess}
                    hash={hash}
                    successMessage="Dispute resolved successfully!"
                />
            </div>
        </div>
    )
}
