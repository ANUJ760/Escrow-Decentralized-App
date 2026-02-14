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
    <div className="border rounded-lg p-6 bg-white shadow-sm">

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seller Address
          </label>
          <input
            placeholder="0x..."
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {seller && !isAddress(seller) && (
            <p className="text-xs text-red-600 mt-1">Invalid address</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (ETH)
          </label>
          <input
            type="number"
            step="0.001"
            placeholder="0.1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deadline (Days)
          </label>
          <input
            type="number"
            placeholder="7"
            value={deadlineDays}
            onChange={(e) => setDeadlineDays(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={!isValidForm || isPending || isConfirming}
          className="btn-primary"
        >
          {isPending || isConfirming ? "Creating..." : "Create Escrow"}
        </button>

        <TransactionStatus
          isPending={isPending}
          isConfirming={isConfirming}
          isSuccess={isSuccess}
          hash={hash}
          successMessage="Escrow created successfully!"
        />
      </div>
    </div>
  );
}
