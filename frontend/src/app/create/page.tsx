"use client";

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import CreateEscrow from '../../components/CreateEscrow';
import { useHydrated } from '../../hooks/useHydrated';

export default function CreatePage() {
    const router = useRouter();
    const { isConnected } = useAccount();
    const mounted = useHydrated();

    if (!mounted) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading...</div>
            </main>
        );
    }

    if (!isConnected) {
        return (
            <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8">
                    <h2 className="text-5xl font-black text-black text-center">Wallet Not Connected</h2>
                    <p className="text-xl text-gray-600">Please connect your wallet to create an escrow contract.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-20">
                <div className="space-y-4 border-b border-black/10 pb-10">
                    <h1 className="text-8xl font-black text-black leading-none">
                        Initiate Trade
                    </h1>
                    <p className="text-2xl text-gray-600">Create a secure, trustless contract between parties.</p>
                </div>

                <CreateEscrow />

                <div className="text-center pt-20">
                    <button
                        onClick={() => router.back()}
                        className="text-gray-400 hover:text-black font-bold uppercase text-xs tracking-[0.3em] transition-all"
                    >
                        Cancel and return
                    </button>
                </div>
            </div>
        </main>
    );
}
