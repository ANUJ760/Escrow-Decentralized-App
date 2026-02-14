"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import CreateEscrow from '../components/CreateEscrow';

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-6 mt-20">
      <div className="text-3xl font-bold">Welcome to the Escrow App</div>
      <ConnectButton />
      <CreateEscrow />
    </main>
  );
}
