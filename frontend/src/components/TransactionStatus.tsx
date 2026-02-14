"use client";

interface TransactionStatusProps {
    isPending?: boolean
    isConfirming?: boolean
    isSuccess?: boolean
    hash?: `0x${string}`
    successMessage?: string
}

export default function TransactionStatus({
    isPending,
    isConfirming,
    isSuccess,
    hash,
    successMessage = 'Transaction successful!',
}: TransactionStatusProps) {
    if (!isPending && !isConfirming && !isSuccess) return null

    return (
        <div className="glass-card p-4 mt-4">
            {isPending && (
                <div className="flex items-center gap-3 text-blue-300">
                    <div className="animate-spin h-5 w-5 border-2 border-blue-400 border-t-transparent rounded-full" />
                    <span>Waiting for wallet confirmation...</span>
                </div>
            )}

            {isConfirming && (
                <div className="flex items-center gap-3 text-yellow-300">
                    <div className="animate-spin h-5 w-5 border-2 border-yellow-400 border-t-transparent rounded-full" />
                    <span>Transaction confirming on blockchain...</span>
                </div>
            )}

            {isSuccess && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-300 font-semibold">
                        <span className="text-xl">✓</span>
                        <span>{successMessage}</span>
                    </div>
                    {hash && (
                        <a
                            href={`https://sepolia.etherscan.io/tx/${hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-400 hover:text-blue-300 hover:underline block transition-colors"
                        >
                            View on Etherscan →
                        </a>
                    )}
                </div>
            )}
        </div>
    )
}
