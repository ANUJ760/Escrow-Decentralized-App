"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEscrowDetails } from '../../../hooks/useEscrowDetails';
import EscrowActions from '../../../components/EscrowActions';
import DisputeResolution from '../../../components/DisputeResolution';
import { formatEther } from 'viem';
import { useHydrated } from '../../../hooks/useHydrated';

const STATE_LABELS = ['Created', 'Funded', 'In Progress', 'Submitted', 'Disputed', 'Resolved', 'Completed', 'Cancelled'];

const STATE_COLORS: Record<number, string> = {
    0: 'bg-gray-500/10 text-gray-700',
    1: 'bg-blue-500/10 text-blue-700',
    2: 'bg-purple-500/10 text-purple-700',
    3: 'bg-yellow-500/10 text-yellow-700',
    4: 'bg-red-500/10 text-red-700',
    5: 'bg-orange-500/10 text-orange-700',
    6: 'bg-green-500/10 text-green-700',
    7: 'bg-gray-500/10 text-gray-700',
};

export default function EscrowDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const escrowAddress = params.address as `0x${string}`;

    const mounted = useHydrated();

    const {
        buyer,
        seller,
        amount,
        state,
        arbitrator,
        fundsWithdrawn,
        disputeWinner,
    } = useEscrowDetails(escrowAddress);

    if (!mounted) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                <button
                    onClick={() => router.back()}
                    className="text-gray-500 hover:text-black mb-8 flex items-center gap-2 transition-colors font-bold uppercase text-xs tracking-widest"
                >
                    ← Back to Dashboard
                </button>

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-6xl font-black text-black leading-none">
                            Contract Details
                        </h1>
                        {state != null && (
                            <span className={`status-badge ${STATE_COLORS[Number(state)]} px-4 py-1.5 text-[10px]`}>
                                {STATE_LABELS[Number(state)]}
                            </span>
                        )}
                    </div>
                    <p className="text-gray-500 font-mono text-sm tracking-tighter break-all bg-white/30 inline-block px-2 py-1 rounded">{escrowAddress}</p>
                </div>

                {/* Main Info Section - Removing Boxy Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-10 border-y border-black/5">
                    <div className="space-y-2">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Total Amount</h3>
                        <p className="text-7xl font-black text-black">
                            {amount ? formatEther(amount as bigint) : '0'} <span className="text-2xl text-gray-400">ETH</span>
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Funds Status</h3>
                        <div className="text-3xl font-bold">
                            {(fundsWithdrawn as boolean) ? (
                                <span className="text-green-600">Released</span>
                            ) : (
                                <span className="text-black">Locked in Contract</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Participants - Simplified */}
                <div className="grid md:grid-cols-3 gap-12 py-10">
                    <div className="space-y-2">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Buyer</h3>
                        <p className="font-mono text-sm text-black break-all">{(buyer as string) || 'N/A'}</p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Seller</h3>
                        <p className="font-mono text-sm text-black break-all">{(seller as string) || 'N/A'}</p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Arbitrator</h3>
                        <p className="font-mono text-sm text-black break-all">{(arbitrator as string) || 'N/A'}</p>
                    </div>
                </div>

                {/* Dispute Winner - Only shown if applicable */}
                {Boolean(disputeWinner) && (disputeWinner as string) !== '0x0000000000000000000000000000000000000000' && (
                    <div className="p-8 bg-black/5 border border-black/10 rounded-2xl">
                        <h3 className="text-sm uppercase tracking-widest text-gray-600 font-bold mb-4">Resolved Winner</h3>
                        <p className="font-mono text-2xl text-black break-all">{disputeWinner as string}</p>
                    </div>
                )}

                {/* Dispute Resolution (Arbitrator Only) */}
                <DisputeResolution escrowAddress={escrowAddress} />

                {/* Actions - Simplified UI */}
                <div className="space-y-6 pt-10 border-t border-black/5">
                    <h2 className="text-3xl font-black text-black">Control Panel</h2>
                    <div className="max-w-md">
                        <EscrowActions escrowAddress={escrowAddress} />
                    </div>
                </div>
            </div>
        </main>
    );
}
