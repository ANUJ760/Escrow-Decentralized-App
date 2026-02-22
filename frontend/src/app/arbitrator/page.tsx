"use client";

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useResolveDispute } from '../../hooks/useResolveDispute';
import TransactionStatus from '../../components/TransactionStatus';
import { useHydrated } from '../../hooks/useHydrated';
import { useArbitratorAccess } from '../../hooks/useArbitratorAccess';

export default function ArbitratorPage() {
    const { isConnected } = useAccount();
    const mounted = useHydrated();
    const [escrowAddress, setEscrowAddress] = useState("");
    const [selectedWinner, setSelectedWinner] = useState<'buyer' | 'seller' | null>(null);

    const { resolveDispute, isPending, isConfirming, isSuccess, hash } = useResolveDispute();
    const { isArbitrator, ownerAddress, isOwnerLoading } = useArbitratorAccess();

    const handleResolve = async () => {
        if (!selectedWinner || !escrowAddress) return;
        await resolveDispute(escrowAddress as `0x${string}`, selectedWinner === 'buyer');
        setEscrowAddress("");
        setSelectedWinner(null);
    };

    if (!mounted) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading Dashboard...</div>
            </main>
        );
    }

    if (!isConnected) {
        return (
            <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8">
                    <h2 className="text-5xl font-black text-black text-center">Wallet Not Connected</h2>
                    <p className="text-xl text-gray-600">Please connect your authorized arbitrator wallet.</p>
                </div>
            </main>
        );
    }

    if (!isArbitrator) {
        return (
            <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8">
                    <h2 className="text-5xl font-black text-black text-center">Access Restricted</h2>
                    <p className="text-xl text-gray-600 text-center max-w-lg">
                        This dashboard is reserved for the platform&apos;s official arbitrator.
                    </p>
                    <div className="glass-card p-4 font-mono text-xs opacity-50">
                        Required Owner Wallet: {isOwnerLoading ? "Loading..." : ownerAddress ?? "Unavailable"}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-20">
                <div className="space-y-4 border-b border-black/10 pb-10">
                    <h1 className="text-8xl font-black text-black leading-none">
                        Arbitration
                    </h1>
                    <p className="text-2xl text-gray-600">Resolve disputes and maintain network integrity.</p>
                </div>

                {/* Resolve Dispute Form */}
                <div className="space-y-12">
                    <div className="glass-card p-12 space-y-10">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                                Escrow Contract Identifier
                            </label>
                            <input
                                placeholder="Enter address 0x..."
                                value={escrowAddress}
                                onChange={(e) => setEscrowAddress(e.target.value)}
                                className="input-field text-xl py-6"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                                Determination
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <button
                                    onClick={() => setSelectedWinner('buyer')}
                                    className={`p-10 rounded-2xl border-4 transition-all text-left space-y-2 ${selectedWinner === 'buyer'
                                        ? 'border-blue-500 bg-blue-50/50'
                                        : 'border-black/5 bg-white/20 hover:border-black/10'
                                        }`}
                                >
                                    <div className="text-3xl font-black text-black">Buyer Wins</div>
                                    <p className="text-sm text-gray-600">Refund transaction to the buyer.</p>
                                </button>

                                <button
                                    onClick={() => setSelectedWinner('seller')}
                                    className={`p-10 rounded-2xl border-4 transition-all text-left space-y-2 ${selectedWinner === 'seller'
                                        ? 'border-purple-500 bg-purple-50/50'
                                        : 'border-black/5 bg-white/20 hover:border-black/10'
                                        }`}
                                >
                                    <div className="text-3xl font-black text-black">Seller Wins</div>
                                    <p className="text-sm text-gray-600">Release funds to the provider.</p>
                                </button>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                onClick={handleResolve}
                                disabled={!selectedWinner || !escrowAddress || isPending || isConfirming}
                                className="btn-primary w-full py-6 text-2xl font-black"
                            >
                                {isPending || isConfirming ? "Broadcasting Decision..." : "Execute Resolution"}
                            </button>
                        </div>

                        <TransactionStatus
                            isPending={isPending}
                            isConfirming={isConfirming}
                            isSuccess={isSuccess}
                            hash={hash}
                            successMessage="Resolution successfully recorded on-chain."
                        />
                    </div>

                    <div className="space-y-8 pt-10 border-t border-black/5">
                        <h3 className="text-3xl font-black text-black">Protocol Guidelines</h3>
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-2">
                                <h4 className="text-lg font-bold">Impartiality</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Decisions must be based solely on the evidence provided via IPFS and agreement terms.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-bold">Finality</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    On-chain resolutions are permanent. Ensure the transaction details are correct before broadcasting.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
