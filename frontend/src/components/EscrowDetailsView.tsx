"use client";

import { useState } from 'react';
import EscrowCard from './EscrowCard';
import EscrowActions from './EscrowActions';
import DisputeResolution from './DisputeResolution';
import { useEscrowDetails } from '../hooks/useEscrowDetails';
import { formatEther } from 'viem';

const STATE_LABELS = [
    'Created',
    'Funded',
    'In Progress',
    'Submitted',
    'Disputed',
    'Resolved',
    'Completed',
    'Cancelled',
];

interface EscrowDetailsViewProps {
    escrowAddress: `0x${string}`
    onBack: () => void
}

export default function EscrowDetailsView({ escrowAddress, onBack }: EscrowDetailsViewProps) {
    const {
        buyer,
        seller,
        amount,
        state,
        arbitrator,
        fundsWithdrawn,
        disputeWinner,
    } = useEscrowDetails(escrowAddress);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="text-blue-600 hover:underline">
                    ← Back
                </button>
                <h2 className="text-2xl font-bold">Escrow Details</h2>
            </div>

            <div className="border rounded-lg p-6 bg-white shadow-sm space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm text-gray-500">Contract Address</div>
                        <div className="font-mono text-sm break-all">{escrowAddress}</div>
                    </div>

                    <div>
                        <div className="text-sm text-gray-500">Status</div>
                        <div className="font-semibold">
                            {state !== undefined ? STATE_LABELS[state] : 'Loading...'}
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-gray-500">Amount</div>
                        <div className="font-semibold text-lg">
                            {amount ? formatEther(amount) : '0'} ETH
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-gray-500">Funds Withdrawn</div>
                        <div className="font-semibold">
                            {fundsWithdrawn ? 'Yes ✓' : 'No'}
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-gray-500">Buyer</div>
                        <div className="font-mono text-xs break-all">{buyer || 'N/A'}</div>
                    </div>

                    <div>
                        <div className="text-sm text-gray-500">Seller</div>
                        <div className="font-mono text-xs break-all">{seller || 'N/A'}</div>
                    </div>

                    <div>
                        <div className="text-sm text-gray-500">Arbitrator</div>
                        <div className="font-mono text-xs break-all">{arbitrator || 'N/A'}</div>
                    </div>

                    {disputeWinner && disputeWinner !== '0x0000000000000000000000000000000000000000' && (
                        <div>
                            <div className="text-sm text-gray-500">Dispute Winner</div>
                            <div className="font-mono text-xs break-all">{disputeWinner}</div>
                        </div>
                    )}
                </div>
            </div>

            <DisputeResolution escrowAddress={escrowAddress} />

            <div className="border rounded-lg p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                <EscrowActions escrowAddress={escrowAddress} />
            </div>
        </div>
    );
}
