"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEscrowDetails } from '../../../hooks/useEscrowDetails';
import EscrowActions from '../../../components/EscrowActions';
import DisputeResolution from '../../../components/DisputeResolution';
import { formatEther } from 'viem';

const STATE_LABELS = ['Created', 'Funded', 'In Progress', 'Submitted', 'Disputed', 'Resolved', 'Completed', 'Cancelled'];

const STATE_COLORS: Record<number, string> = {
    0: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    1: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    2: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    3: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    4: 'bg-red-500/20 text-red-300 border-red-500/30',
    5: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    6: 'bg-green-500/20 text-green-300 border-green-500/30',
    7: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

export default function EscrowDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const escrowAddress = params.address as `0x${string}`;

    const [mounted, setMounted] = useState(false);

    const {
        buyer,
        seller,
        amount,
        state,
        arbitrator,
        fundsWithdrawn,
        disputeWinner,
    } = useEscrowDetails(escrowAddress);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition-colors"
                >
                    ← Back
                </button>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="gradient-text">Escrow Details</span>
                    </h1>
                    <p className="text-gray-400 font-mono text-sm break-all">{escrowAddress}</p>
                </div>

                {/* Status Badge */}
                {state !== undefined && (
                    <div className="mb-6">
                        <span className={`status-badge border ${STATE_COLORS[state]}`}>
                            {STATE_LABELS[state]}
                        </span>
                    </div>
                )}

                {/* Main Info Card */}
                <div className="glass-card p-8 mb-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm text-gray-400 mb-2">Amount</h3>
                            <p className="text-4xl font-bold gradient-text">
                                {amount ? formatEther(amount) : '0'} ETH
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm text-gray-400 mb-2">Funds Status</h3>
                            <p className="text-2xl font-semibold text-white">
                                {fundsWithdrawn ? (
                                    <span className="text-green-400">✓ Withdrawn</span>
                                ) : (
                                    <span className="text-yellow-400">⏳ In Contract</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Participants */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="glass-card p-6">
                        <h3 className="text-sm text-gray-400 mb-3">Buyer</h3>
                        <p className="font-mono text-sm text-white break-all">{buyer || 'N/A'}</p>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="text-sm text-gray-400 mb-3">Seller</h3>
                        <p className="font-mono text-sm text-white break-all">{seller || 'N/A'}</p>
                    </div>
                </div>

                {/* Arbitrator */}
                <div className="glass-card p-6 mb-6">
                    <h3 className="text-sm text-gray-400 mb-3">Arbitrator</h3>
                    <p className="font-mono text-sm text-white break-all">{arbitrator || 'N/A'}</p>
                </div>

                {/* Dispute Winner */}
                {disputeWinner && disputeWinner !== '0x0000000000000000000000000000000000000000' && (
                    <div className="glass-card p-6 mb-6 bg-orange-500/10 border-orange-500/30">
                        <h3 className="text-sm text-orange-300 mb-3">Dispute Winner</h3>
                        <p className="font-mono text-sm text-white break-all">{disputeWinner}</p>
                    </div>
                )}

                {/* Dispute Resolution (Arbitrator Only) */}
                <DisputeResolution escrowAddress={escrowAddress} />

                {/* Actions */}
                <div className="glass-card p-8 mt-6">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Available Actions</h2>
                    <EscrowActions escrowAddress={escrowAddress} />
                </div>
            </div>
        </main>
    );
}
