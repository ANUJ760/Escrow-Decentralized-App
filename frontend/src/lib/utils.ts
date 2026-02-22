import { formatEther, parseEther } from 'viem'

const BACKEND_URL =
    process.env.NEXT_PUBLIC_AI_BACKEND_URL || "http://localhost:3001";

// Format ETH with proper decimals
export function formatEthAmount(wei: bigint | undefined, decimals: number = 4): string {
    if (!wei) return '0'
    const eth = formatEther(wei)
    return parseFloat(eth).toFixed(decimals)
}

// Shorten address for display
export function shortenAddress(address: string | undefined, chars: number = 4): string {
    if (!address) return 'N/A'
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

// Convert days to seconds
export function daysToSeconds(days: number): number {
    return days * 24 * 60 * 60
}

// Convert seconds to days
export function secondsToDays(seconds: number): number {
    return Math.floor(seconds / (24 * 60 * 60))
}

// Format timestamp to readable date
export function formatTimestamp(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString()
}

export async function uploadToIPFS(file: File) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
    }
    const contentBase64 = btoa(binary);

    const response = await fetch(`${BACKEND_URL}/ipfs/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filename: file.name,
            contentBase64,
            mimeType: file.type,
        }),
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to upload to IPFS');
    }

    const data = await response.json();
    return data.cid as string;
}
