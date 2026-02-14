"use client";

import { useAccount } from 'wagmi'
import { useResolveDispute } from '../hooks/useResolveDispute'
import { useEscrowDetails } from '../hooks/useEscrowDetails'
import { useState } from 'react'
import { ARBITRATOR_ADDRESS } from '../contracts/addresses'
import TransactionStatus from './TransactionStatus'

interface DisputeResolutionProps {
    escrowAddress: `0x${string}`
}

export default function DisputeResolution({ escrowAddress }: DisputeResolutionProps) {
    const { address } = useAccount()
    const { state, buyer, seller } = useEscrowDetails(escrowAddress)
    const { resolveDispute, isPending, isConfirming, isSuccess, hash } = useResolveDispute()
    const [selectedWinner, setSelectedWinner] = useState<'buyer' | 'seller' | null>(null)

    const isArbitrator = address?.toLowerCase() === ARBITRATOR_ADDRESS.toLowerCase()

    if (state !== 4) {
        return null
    }

    if (!isArbitrator) {
        return (
            <div className="glass-card p-6 bg-yellow-500/10 border-yellow-500/30 mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">⚠️</span>
                    <h3 className="font-semibold text-yellow-300">Dispute Active</h3>
                </div>
                <p className="text-sm text-yellow-200/80">
                    This escrow is under dispute. Waiting for arbitrator resolution.
                </p>
            </div>
        )
    }

    return (
        <div className="glass-card p-6 bg-red-500/10 border-red-500/30 mb-6">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">⚖️</span>
                <h2 className="text-xl font-semibold text-white">Arbitrator Panel</h2>
            </div>

            <div className="space-y-4 mb-6">
                <div className="text-sm">
                    <span className="text-gray-400">Buyer:</span>{' '}
                    <span className="font-mono text-xs text-gray-300 break-all">{buyer}</span>
                </div>
                <div className="text-sm">
                    <span className="text-gray-400">Seller:</span>{' '}
                    <span className="font-mono text-xs text-gray-300 break-all">{seller}</span>
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">Select Winner:</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setSelectedWinner('buyer')}
                        className={`p-4 rounded-xl border-2 transition-all ${selectedWinner === 'buyer'
                                ? 'border-blue-500 bg-blue-500/20'
                                : 'border-white/10 bg-white/5 hover:border-white/20'
                            }`}
                    >
                        <div className="font-semibold text-white">Buyer Wins</div>
                    </button>
                    <button
                        onClick={() => setSelectedWinner('seller')}
                        className={`p-4 rounded-xl border-2 transition-all ${selectedWinner === 'seller'
                                ? 'border-purple-500 bg-purple-500/20'
                                : 'border-white/10 bg-white/5 hover:border-white/20'
                            }`}
                    >
                        <div className="font-semibold text-white">Seller Wins</div>
                    </button>
                </div>
            </div>

            <button
                onClick={() => selectedWinner && resolveDispute(escrowAddress, selectedWinner === 'buyer')}
                disabled={!selectedWinner || isPending || isConfirming}
                className="btn-primary w-full mt-6"
            >
                {isPending || isConfirming ? 'Resolving...' : 'Resolve Dispute'}
            </button>

            <TransactionStatus
                isPending={isPending}
                isConfirming={isConfirming}
                isSuccess={isSuccess}
                hash={hash}
                successMessage="Dispute resolved successfully!"
            />
        </div>
    )
}
