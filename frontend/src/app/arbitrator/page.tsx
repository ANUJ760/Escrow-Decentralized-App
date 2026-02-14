"use client";

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useResolveDispute } from '../../hooks/useResolveDispute';
import { ARBITRATOR_ADDRESS } from '../../contracts/addresses';

export default function ArbitratorPage() {
    const { address, isConnected } = useAccount();
    const [mounted, setMounted] = useState(false);
    const [escrowAddress, setEscrowAddress] = useState("");
    const [selectedWinner, setSelectedWinner] = useState<'buyer' | 'seller' | null>(null);

    const { resolveDispute, isPending, isConfirming, isSuccess, hash } = useResolveDispute();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isArbitrator = address?.toLowerCase() === ARBITRATOR_ADDRESS.toLowerCase();

    const handleResolve = async () => {
        if (!selectedWinner || !escrowAddress) return;
        await resolveDispute(escrowAddress as `0x${string}`, selectedWinner === 'buyer');
        setEscrowAddress("");
        setSelectedWinner(null);
    };

    if (!mounted) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading...</div>
            </main>
        );
    }

    if (!isConnected) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="glass-card p-12 text-center max-w-md">
                    <div className="text-6xl mb-6">🔒</div>
                    <h2 className="text-2xl font-bold mb-4 text-white">Wallet Not Connected</h2>
                    <p className="text-gray-400">Please connect your wallet</p>
                </div>
            </main>
        );
    }

    if (!isArbitrator) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="glass-card p-12 text-center max-w-md">
                    <div className="text-6xl mb-6">⚖️</div>
                    <h2 className="text-2xl font-bold mb-4 text-white">Access Denied</h2>
                    <p className="text-gray-400 mb-4">
                        You are not authorized to access the arbitrator dashboard
                    </p>
                    <p className="text-xs text-gray-500 font-mono break-all">
                        Arbitrator: {ARBITRATOR_ADDRESS}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="gradient-text">Arbitrator Dashboard</span>
                    </h1>
                    <p className="text-gray-400">Resolve disputes and manage escrow conflicts</p>
                </div>

                {/* Arbitrator Info */}
                <div className="glass-card p-6 mb-8 bg-indigo-500/10 border-indigo-500/30">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="text-3xl">⚖️</div>
                        <h2 className="text-xl font-semibold text-white">Arbitrator Status</h2>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">You are authorized as the arbitrator</p>
                    <p className="text-xs text-gray-400 font-mono break-all">{address}</p>
                </div>

                {/* Resolve Dispute Form */}
                <div className="glass-card p-8">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Resolve Dispute</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Escrow Contract Address
                            </label>
                            <input
                                placeholder="0x..."
                                value={escrowAddress}
                                onChange={(e) => setEscrowAddress(e.target.value)}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Select Winner
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setSelectedWinner('buyer')}
                                    className={`p-6 rounded-xl border-2 transition-all ${selectedWinner === 'buyer'
                                            ? 'border-indigo-500 bg-indigo-500/20'
                                            : 'border-white/10 bg-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">👤</div>
                                    <div className="font-semibold text-white">Buyer Wins</div>
                                    <div className="text-xs text-gray-400 mt-1">Refund to buyer</div>
                                </button>

                                <button
                                    onClick={() => setSelectedWinner('seller')}
                                    className={`p-6 rounded-xl border-2 transition-all ${selectedWinner === 'seller'
                                            ? 'border-purple-500 bg-purple-500/20'
                                            : 'border-white/10 bg-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">🛠️</div>
                                    <div className="font-semibold text-white">Seller Wins</div>
                                    <div className="text-xs text-gray-400 mt-1">Release to seller</div>
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleResolve}
                            disabled={!selectedWinner || !escrowAddress || isPending || isConfirming}
                            className="btn-primary w-full text-lg py-4"
                        >
                            {isPending || isConfirming ? 'Resolving...' : 'Resolve Dispute'}
                        </button>

                        {isSuccess && (
                            <div className="glass-card p-4 bg-green-500/10 border-green-500/30">
                                <div className="flex items-center gap-2 text-green-300">
                                    <span>✓</span>
                                    <span className="font-semibold">Dispute resolved successfully!</span>
                                </div>
                                {hash && (
                                    <a
                                        href={`https://sepolia.etherscan.io/tx/${hash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-400 hover:underline block mt-2"
                                    >
                                        View on Etherscan →
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Section */}
                <div className="glass-card p-6 mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-white">Arbitrator Guidelines</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-start gap-2">
                            <span className="text-indigo-400 mt-0.5">•</span>
                            <span>Review all evidence and communications from both parties</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-indigo-400 mt-0.5">•</span>
                            <span>Make fair and impartial decisions based on the facts</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-indigo-400 mt-0.5">•</span>
                            <span>Ensure the escrow contract is in DISPUTED state before resolving</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-indigo-400 mt-0.5">•</span>
                            <span>The winner will be able to withdraw the funds after resolution</span>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
