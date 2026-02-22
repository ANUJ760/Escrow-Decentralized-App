"use client";

import { useEscrowDetails } from '../hooks/useEscrowDetails'
import { formatEther } from 'viem'

// State enum mapping
const STATE_LABELS = [
    'Created',
    'Funded',
    'In Progress',
    'Submitted',
    'Disputed',
    'Resolved',
    'Completed',
    'Cancelled',
]

interface EscrowCardProps {
    escrowAddress: `0x${string}`
    onSelect?: () => void
}

export default function EscrowCard({ escrowAddress, onSelect }: EscrowCardProps) {
    const {
        buyer,
        seller,
        amount,
        state,
        fundsWithdrawn,
    } = useEscrowDetails(escrowAddress)

    const stateLabel = state != null ? STATE_LABELS[Number(state)] : 'Loading...'
    const stateColor =
        state === 6 ? 'bg-green-500/10 text-green-700' :
            state === 7 ? 'bg-gray-500/10 text-gray-700' :
                state === 4 ? 'bg-red-500/10 text-red-700' :
                    state === 5 ? 'bg-yellow-500/10 text-yellow-700' :
                        'bg-blue-500/10 text-blue-700'

    return (
        <div
            className="glass-card hover:bg-white/50 transition-all p-8 cursor-pointer group"
            onClick={onSelect}
        >
            <div className="flex justify-between items-center mb-6">
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                    {escrowAddress.slice(0, 10)}...{escrowAddress.slice(-6)}
                </div>
                <span className={`status-badge ${stateColor} px-3 py-1 text-[10px]`}>
                    {stateLabel}
                </span>
            </div>

            <div className="space-y-6">
                <div className="flex items-baseline justify-between">
                    <span className="text-6xl font-black text-black">
                        {amount ? formatEther(amount as bigint) : '0'}
                    </span>
                    <span className="text-2xl text-gray-500 font-bold ml-2">ETH</span>
                </div>

                <div className="space-y-1 border-t border-black/5 pt-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Buyer</span>
                        <span className="font-mono text-black">
                            {buyer ? `${(buyer as string).slice(0, 6)}...${(buyer as string).slice(-4)}` : 'N/A'}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Seller</span>
                        <span className="font-mono text-black">
                            {seller ? `${(seller as string).slice(0, 6)}...${(seller as string).slice(-4)}` : 'N/A'}
                        </span>
                    </div>
                </div>

                {Boolean(fundsWithdrawn) && (
                    <div className="text-xs text-green-600 font-bold uppercase tracking-tighter">
                        Funds Successfully Withdrawn
                    </div>
                )}
            </div>
        </div>
    )
}
