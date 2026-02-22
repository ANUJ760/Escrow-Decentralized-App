"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navigation() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'My Escrows', path: '/escrows' },
        { name: 'Arbitrator', path: '/arbitrator' },
    ];

    return (
        <nav className="border-b border-white/20 sticky top-0 z-50 bg-white/30 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-10">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-black tracking-tight">EscrowDApp</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={pathname === item.path ? 'nav-link-active' : 'nav-link'}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
}
