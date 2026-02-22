"use client";

import { useEscrowDetails } from '../hooks/useEscrowDetails';
import { formatEther } from 'viem';
import EscrowActions from './EscrowActions';
import DisputeResolution from './DisputeResolution';

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
        <div className="space-y-16">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="text-gray-500 hover:text-black font-bold uppercase text-xs tracking-widest">
                    ← Back
                </button>
                <h2 className="text-5xl font-black text-black">Contract Context</h2>
            </div>

            <div className="glass-card p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-1">
                        <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Identifier</div>
                        <div className="font-mono text-sm break-all font-bold opacity-60">{escrowAddress}</div>
                    </div>

                    <div className="space-y-1">
                        <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Status</div>
                        <div className="text-2xl font-black text-black">
                            {state != null ? STATE_LABELS[Number(state)] : 'Initializing...'}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Volume</div>
                        <div className="text-5xl font-black text-black">
                            {amount ? formatEther(amount as bigint) : '0'} <span className="text-xl text-gray-400">ETH</span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Settlement</div>
                        <div className="text-2xl font-black">
                            {Boolean(fundsWithdrawn) ? (
                                <span className="text-green-600 uppercase tracking-tighter italic">Released</span>
                            ) : (
                                <span className="text-black uppercase tracking-tighter italic">In Custody</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 pt-10 border-t border-black/5">
                    <div className="space-y-1">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Buyer</div>
                        <div className="font-mono text-xs break-all">{(buyer as string) || 'N/A'}</div>
                    </div>

                    <div className="space-y-1">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Seller</div>
                        <div className="font-mono text-xs break-all">{(seller as string) || 'N/A'}</div>
                    </div>

                    <div className="space-y-1">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Arbitrator</div>
                        <div className="font-mono text-xs break-all">{(arbitrator as string) || 'N/A'}</div>
                    </div>
                </div>

                {Boolean(disputeWinner) && (disputeWinner as string) !== '0x0000000000000000000000000000000000000000' && (
                    <div className="p-6 bg-black/5 rounded-xl">
                        <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Adjudicated Winner</div>
                        <div className="font-mono text-lg font-black text-black break-all">{disputeWinner as string}</div>
                    </div>
                )}
            </div>

            <DisputeResolution escrowAddress={escrowAddress} />

            <div className="space-y-6 pt-10 border-t border-black/5">
                <h3 className="text-2xl font-black text-black uppercase tracking-tight">Available Operations</h3>
                <div className="max-w-md">
                    <EscrowActions escrowAddress={escrowAddress} />
                </div>
            </div>
        </div>
    );
}
