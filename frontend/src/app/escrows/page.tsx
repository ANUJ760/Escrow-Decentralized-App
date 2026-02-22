"use client";

import { useState } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { useHydrated } from '../../hooks/useHydrated';

export default function EscrowsPage() {
    const { isConnected } = useAccount();
    const mounted = useHydrated();
    const [escrowAddress, setEscrowAddress] = useState("");

    if (!mounted) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading...</div>
            </main>
        );
    }

    if (!isConnected) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center space-y-8">
                <h2 className="text-5xl font-black text-black text-center">Wallet Not Connected</h2>
                <p className="text-xl text-gray-600">Please connect your wallet to view your escrows.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-20">
                <div className="flex justify-between items-end border-b border-black/10 pb-10">
                    <div className="space-y-4">
                        <h1 className="text-7xl font-black text-black leading-none">
                            My Escrows
                        </h1>
                        <p className="text-2xl text-gray-600">Overview of your active and past contracts.</p>
                    </div>
                    <Link href="/create" className="btn-primary text-xl px-8 py-4">
                        + New Escrow
                    </Link>
                </div>

                {/* Simplified Search/View Escrow */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-black">Fast Access</h2>
                    <div className="flex gap-4">
                        <input
                            placeholder="Enter contract address (0x...)"
                            value={escrowAddress}
                            onChange={(e) => setEscrowAddress(e.target.value)}
                            className="input-field flex-1 text-xl py-5"
                        />
                        <Link
                            href={escrowAddress.startsWith('0x') && escrowAddress.length === 42
                                ? `/escrow/${escrowAddress}`
                                : '#'}
                            className={`btn-primary px-10 text-xl ${!(escrowAddress.startsWith('0x') && escrowAddress.length === 42)
                                ? 'opacity-20 pointer-events-none'
                                : ''
                                }`}
                        >
                            Open
                        </Link>
                    </div>
                </div>

                {/* Simplified List Placeholder */}
                <div className="py-20 text-center space-y-6 bg-white/20 rounded-3xl border border-black/5">
                    <h3 className="text-3xl font-black text-black">Empty Dashboard</h3>
                    <p className="text-xl text-gray-600">
                        You haven&apos;t participated in any escrows yet.
                    </p>
                    <Link href="/create" className="btn-secondary inline-block mt-4">
                        Start Your First Trade
                    </Link>
                </div>

                {/* Minimalist Stats Row - Replaces boxy info cards */}
                <div className="flex flex-wrap justify-between gap-10 pt-10 border-t border-black/5">
                    <div className="space-y-1">
                        <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Total Active</div>
                        <div className="text-5xl font-black text-black tracking-tighter">0</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Pending Approval</div>
                        <div className="text-5xl font-black text-black tracking-tighter">0</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Resolved</div>
                        <div className="text-5xl font-black text-black tracking-tighter">0</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
