"use client";

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';

export default function EscrowsPage() {
    const { address, isConnected } = useAccount();
    const [mounted, setMounted] = useState(false);
    const [escrowAddress, setEscrowAddress] = useState("");

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

    if (!isConnected) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="glass-card p-12 text-center max-w-md">
                    <div className="text-6xl mb-6">🔒</div>
                    <h2 className="text-2xl font-bold mb-4 text-white">Wallet Not Connected</h2>
                    <p className="text-gray-400">Please connect your wallet to view your escrows</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            <span className="gradient-text">My Escrows</span>
                        </h1>
                        <p className="text-gray-400">Manage and track your escrow contracts</p>
                    </div>
                    <Link href="/create" className="btn-primary">
                        + Create New
                    </Link>
                </div>

                {/* Search/View Escrow */}
                <div className="glass-card p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-white">View Escrow by Address</h2>
                    <div className="flex gap-3">
                        <input
                            placeholder="Enter escrow contract address (0x...)"
                            value={escrowAddress}
                            onChange={(e) => setEscrowAddress(e.target.value)}
                            className="input-field flex-1"
                        />
                        <Link
                            href={escrowAddress.startsWith('0x') && escrowAddress.length === 42
                                ? `/escrow/${escrowAddress}`
                                : '#'}
                            className={`btn-primary ${!(escrowAddress.startsWith('0x') && escrowAddress.length === 42)
                                    ? 'opacity-50 cursor-not-allowed pointer-events-none'
                                    : ''
                                }`}
                        >
                            View
                        </Link>
                    </div>
                </div>

                {/* Escrow List Placeholder */}
                <div className="space-y-4">
                    <div className="glass-card p-8 text-center">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold mb-2 text-white">No Escrows Yet</h3>
                        <p className="text-gray-400 mb-6">
                            You haven't created or participated in any escrows yet.
                        </p>
                        <Link href="/create" className="btn-secondary inline-block">
                            Create Your First Escrow
                        </Link>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="glass-card p-6">
                        <div className="text-3xl mb-3">👤</div>
                        <h3 className="text-lg font-semibold mb-2 text-white">As Buyer</h3>
                        <p className="text-3xl font-bold gradient-text">0</p>
                        <p className="text-sm text-gray-400 mt-1">Active escrows</p>
                    </div>

                    <div className="glass-card p-6">
                        <div className="text-3xl mb-3">🛠️</div>
                        <h3 className="text-lg font-semibold mb-2 text-white">As Seller</h3>
                        <p className="text-3xl font-bold gradient-text">0</p>
                        <p className="text-sm text-gray-400 mt-1">Active escrows</p>
                    </div>

                    <div className="glass-card p-6">
                        <div className="text-3xl mb-3">✅</div>
                        <h3 className="text-lg font-semibold mb-2 text-white">Completed</h3>
                        <p className="text-3xl font-bold gradient-text">0</p>
                        <p className="text-sm text-gray-400 mt-1">Total completed</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
