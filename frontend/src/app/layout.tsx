import type { Metadata } from "next";
import { Providers } from './providers';
import Navigation from '../components/Navigation';
import './globals.css';

export const metadata: Metadata = {
  title: "Escrow dApp, a secure decentralized escrow!",
  description: "A secure, decentralized escrow platform built on Ethereum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
