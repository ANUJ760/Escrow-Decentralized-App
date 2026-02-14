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
        <nav className="glass-card border-b border-white/10 sticky top-0 z-50 backdrop-blur-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <span className="text-xl font-bold gradient-text">EscrowDApp</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-2">
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
