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

    const stateLabel = state !== undefined ? STATE_LABELS[state] : 'Loading...'
    const stateColor =
        state === 6 ? 'bg-green-100 text-green-800' :
            state === 7 ? 'bg-gray-100 text-gray-800' :
                state === 4 ? 'bg-red-100 text-red-800' :
                    state === 5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'

    return (
        <div
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={onSelect}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="text-sm font-mono text-gray-600">
                    {escrowAddress.slice(0, 6)}...{escrowAddress.slice(-4)}
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${stateColor}`}>
                    {stateLabel}
                </span>
            </div>

            <div className="space-y-2 text-sm">
                <div>
                    <span className="text-gray-500">Amount:</span>{' '}
                    <span className="font-semibold">
                        {amount ? formatEther(amount) : '0'} ETH
                    </span>
                </div>

                <div>
                    <span className="text-gray-500">Buyer:</span>{' '}
                    <span className="font-mono text-xs">
                        {buyer ? `${buyer.slice(0, 6)}...${buyer.slice(-4)}` : 'N/A'}
                    </span>
                </div>

                <div>
                    <span className="text-gray-500">Seller:</span>{' '}
                    <span className="font-mono text-xs">
                        {seller ? `${seller.slice(0, 6)}...${seller.slice(-4)}` : 'N/A'}
                    </span>
                </div>

                {fundsWithdrawn && (
                    <div className="text-xs text-green-600 font-semibold">
                        ✓ Funds Withdrawn
                    </div>
                )}
            </div>
        </div>
    )
}
