"use client";

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useCreateEscrow } from '../hooks/useCreateEscrow';

export default function CreateEscrow() {

  const { address } = useAccount();
  const { createEscrow, isPending } = useCreateEscrow();

  const [seller, setSeller] = useState("");

  return (
    <div className="flex flex-col gap-2">

      <input
        placeholder="Seller address"
        value={seller}
        onChange={(e) => setSeller(e.target.value)}
        className="border p-2"
      />

      <button
        onClick={() => createEscrow(address!, seller)}
        disabled={isPending}
        className="bg-black text-white p-2"
      >
        {isPending ? "Creating..." : "Create Escrow"}
      </button>

    </div>
  );
}
