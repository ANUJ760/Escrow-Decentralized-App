"use client";

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';

export default function Home() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

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
    <main className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-pink-900/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-20">
          <div className="inline-block">
            <div className="text-6xl mb-6 animate-bounce">🔒</div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Secure Escrow</span>
            <br />
            <span className="text-white">On The Blockchain</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trustless, decentralized escrow platform powered by Ethereum smart contracts.
            Secure your transactions with blockchain technology.
          </p>

          {!isConnected ? (
            <div className="glass-card p-8 max-w-md mx-auto mt-12">
              <p className="text-gray-300 mb-4">Connect your wallet to get started</p>
              <div className="text-sm text-gray-500">
                Use the connect button in the navigation above
              </div>
            </div>
          ) : (
            <div className="flex gap-4 justify-center mt-12">
              <Link href="/create" className="btn-primary">
                Create Escrow
              </Link>
              <Link href="/escrows" className="btn-secondary">
                View My Escrows
              </Link>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="glass-card-hover p-8">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Fast & Secure</h3>
            <p className="text-gray-400">
              Instant on-chain transactions with military-grade security powered by Ethereum
            </p>
          </div>

          <div className="glass-card-hover p-8">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Trustless</h3>
            <p className="text-gray-400">
              No intermediaries needed. Smart contracts ensure fair execution for all parties
            </p>
          </div>

          <div className="glass-card-hover p-8">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Dispute Resolution</h3>
            <p className="text-gray-400">
              Built-in arbitration system to resolve conflicts fairly and transparently
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-32">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="gradient-text">How It Works</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create', desc: 'Set up escrow with seller, amount, and deadline' },
              { step: '02', title: 'Fund', desc: 'Buyer deposits funds into smart contract' },
              { step: '03', title: 'Deliver', desc: 'Seller completes work and submits for review' },
              { step: '04', title: 'Release', desc: 'Buyer approves and funds are released' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="glass-card p-6 text-center">
                  <div className="text-5xl font-bold gradient-text mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
