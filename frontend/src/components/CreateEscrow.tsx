"use client";

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useCreateEscrow } from '../hooks/useCreateEscrow';
import { isAddress } from 'viem';
import TransactionStatus from './TransactionStatus';

export default function CreateEscrow() {
  const { address } = useAccount();
  const { createEscrow, isPending, isConfirming, isSuccess, hash } = useCreateEscrow();

  const [seller, setSeller] = useState("");
  const [amount, setAmount] = useState("");
  const [deadlineDays, setDeadlineDays] = useState("7");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <div className="glass-card p-12 space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-black text-black">Terms of Trade</h2>
        <p className="text-gray-600">Define the conditions for this decentralized contract.</p>
      </div>

      <div className="space-y-10">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
            Counterparty (Seller Address)
          </label>
          <input
            placeholder="0x..."
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            className="input-field text-xl py-6"
          />
          {seller && !isAddress(seller) && (
            <p className="text-xs text-red-600 font-bold uppercase mt-2">! Invalid Ethereum Address</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
              Amount to Lock (ETH)
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="0.1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field text-4xl font-black py-6"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
              Contract Deadline (Days)
            </label>
            <input
              type="number"
              placeholder="7"
              value={deadlineDays}
              onChange={(e) => setDeadlineDays(e.target.value)}
              className="input-field text-4xl font-black py-6"
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={handleCreate}
            disabled={!isValidForm || isPending || isConfirming}
            className="btn-primary w-full py-6 text-2xl font-black"
          >
            {isPending || isConfirming ? "Broadcasting..." : "Initiate Escrow Contract"}
          </button>
        </div>

        <TransactionStatus
          isPending={isPending}
          isConfirming={isConfirming}
          isSuccess={isSuccess}
          hash={hash}
          successMessage="Escrow contract has been initialized."
        />
      </div>
    </div>
  );
}
