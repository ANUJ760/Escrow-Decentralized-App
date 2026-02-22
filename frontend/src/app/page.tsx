"use client";

import { useAccount } from 'wagmi';
import Link from 'next/link';
import { useHydrated } from '../hooks/useHydrated';

export default function Home() {
  const { isConnected } = useAccount();
  const mounted = useHydrated();

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-10 mb-32">
          <div className="text-7xl mb-12"></div>

          <h1 className="text-7xl md:text-8xl font-bold text-black leading-tight">
            Secure Escrow.
            <br />
            Trustless Trade.
          </h1>

          <p className="text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Simplified decentralized escrow platform powered by Ethereum smart contracts.
            Simple. Transparent. Secure.
          </p>

          {!isConnected ? (
            <div className="glass-card p-10 max-w-md mx-auto mt-16">
              <p className="text-xl text-black mb-4">Connect your wallet to begin</p>
              <div className="text-sm text-gray-600">
                Use the connect button in the navigation above
              </div>
            </div>
          ) : (
            <div className="flex gap-6 justify-center mt-16">
              <Link href="/create" className="btn-primary text-xl px-10 py-5">
                Create Escrow
              </Link>
              <Link href="/escrows" className="btn-secondary text-xl px-10 py-5">
                View My Escrows
              </Link>
            </div>
          )}
        </div>

        {/* Simplified Features Section */}
        <div className="space-y-32">
          <section className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-4">
              <h2 className="text-5xl font-bold">Fast & Secure</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Instant on-chain transactions with military-grade security.
                Everything is documented on the blockchain for permanent record.
              </p>
            </div>
            <div className="text-8xl p-12 glass-card"></div>
          </section>

          <section className="flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-4">
              <h2 className="text-5xl font-bold">Trustless Flow</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                No intermediaries. Smart contracts ensure that funds are only released
                when both parties are satisfied with the outcome.
              </p>
            </div>
            <div className="text-8xl p-12 glass-card"></div>
          </section>

          <section className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-4">
              <h2 className="text-5xl font-bold">AI Arbitration</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Integrated AI processing helps resolve disputes fairly by analyzing
                evidence submitted through the platform.
              </p>
            </div>
            <div className="text-8xl p-12 glass-card"></div>
          </section>
        </div>

        {/* Footer Link */}
        <div className="mt-48 text-center border-t border-black/10 pt-10">
          <p className="text-gray-500 font-mono text-xs italic">Decentralized Escrow © 2026</p>
        </div>
      </div>
    </main>
  );
}
