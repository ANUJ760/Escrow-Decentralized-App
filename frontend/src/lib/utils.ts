import { formatEther, parseEther } from 'viem'

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
