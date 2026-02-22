"use client";

interface TransactionStatusProps {
    isPending: boolean;
    isConfirming?: boolean;
    isSuccess?: boolean;
    hash?: string;
    successMessage?: string;
}

export default function TransactionStatus({
    isPending,
    isConfirming,
    isSuccess,
    hash,
    successMessage = "Transaction successful!"
}: TransactionStatusProps) {
    if (!isPending && !isConfirming && !isSuccess) return null;

    return (
        <div className={`mt-6 p-6 rounded-2xl border ${isSuccess
            ? "bg-green-500/5 border-green-500/20 text-green-800"
            : "bg-black/5 border-black/10 text-black"
            }`}>
            <div className="flex items-center gap-4">
                {(isPending || isConfirming) && (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                )}
                {isSuccess && <span className="text-2xl font-black">DONE</span>}

                <div>
                    <p className="font-black uppercase text-xs tracking-widest">
                        {isPending ? "Pending Wallet Approval" : isConfirming ? "Confirming on Blockchain" : "Finalized"}
                    </p>
                    <p className="text-sm mt-1">
                        {isSuccess ? successMessage : (isPending || isConfirming) ? "Please wait while the transaction is processed." : ""}
                    </p>
                    {hash && (
                        <a
                            href={`https://sepolia.etherscan.io/tx/${hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block text-[10px] font-mono underline opacity-50 hover:opacity-100"
                        >
                            View on Etherscan: {hash.slice(0, 10)}...{hash.slice(-8)}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
