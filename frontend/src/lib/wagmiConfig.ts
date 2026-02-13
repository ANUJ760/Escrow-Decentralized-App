import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Escrow dApp',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT!,
  chains: [sepolia],
});
