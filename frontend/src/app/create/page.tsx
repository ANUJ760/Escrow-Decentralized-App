"use client";

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useCreateEscrow } from '../../hooks/useCreateEscrow';
import { isAddress } from 'viem';
import TransactionStatus from '../../components/TransactionStatus';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const { createEscrow, isPending, isConfirming, isSuccess, hash } = useCreateEscrow();

    const [seller, setSeller] = useState("");
    const [amount, setAmount] = useState("");
    const [deadlineDays, setDeadlineDays] = useState("7");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => router.push('/escrows'), 2000);
        }
    }, [isSuccess, router]);

    const isValidForm =
        mounted &&
        address &&
        seller.length > 0 &&
        isAddress(seller) &&
        parseFloat(amount) > 0 &&
        parseInt(deadlineDays) > 0;

    const handleCreate = async () => {
        if (!address || !isValidForm) return;

        const deadlineSeconds = parseInt(deadlineDays) * 24 * 60 * 60;
        await createEscrow(address, seller as `0x${string}`, amount, deadlineSeconds);
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
                    <p className="text-gray-400">Please connect your wallet to create an escrow</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="gradient-text">Create New Escrow</span>
                    </h1>
                    <p className="text-gray-400">Set up a secure escrow contract on the blockchain</p>
                </div>

                <div className="glass-card p-8 space-y-6">
                    {/* Seller Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Seller Address
                        </label>
                        <input
                            placeholder="0x..."
                            value={seller}
                            onChange={(e) => setSeller(e.target.value)}
                            className="input-field"
                        />
                        {seller && !isAddress(seller) && (
                            <p className="text-xs text-red-400 mt-2">Invalid Ethereum address</p>
                        )}
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Amount (ETH)
                        </label>
                        <input
                            type="number"
                            step="0.001"
                            placeholder="0.1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="input-field"
                        />
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Deadline (Days)
                        </label>
                        <input
                            type="number"
                            placeholder="7"
                            value={deadlineDays}
                            onChange={(e) => setDeadlineDays(e.target.value)}
                            className="input-field"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Seller must accept within this timeframe
                        </p>
                    </div>

                    {/* Summary */}
                    {isValidForm && (
                        <div className="glass-card p-4 bg-indigo-500/10 border-indigo-500/30">
                            <h3 className="text-sm font-semibold text-indigo-300 mb-2">Summary</h3>
                            <div className="space-y-1 text-sm text-gray-300">
                                <div>Amount: <span className="text-white font-semibold">{amount} ETH</span></div>
                                <div>Deadline: <span className="text-white font-semibold">{deadlineDays} days</span></div>
                            </div>
                        </div>
                    )}

                    {/* Create Button */}
                    <button
                        onClick={handleCreate}
                        disabled={!isValidForm || isPending || isConfirming}
                        className="btn-primary w-full text-lg py-4"
                    >
                        {isPending || isConfirming ? "Creating..." : "Create Escrow"}
                    </button>

                    <TransactionStatus
                        isPending={isPending}
                        isConfirming={isConfirming}
                        isSuccess={isSuccess}
                        hash={hash}
                        successMessage="Escrow created successfully! Redirecting..."
                    />
                </div>
            </div>
        </main>
    );
}
