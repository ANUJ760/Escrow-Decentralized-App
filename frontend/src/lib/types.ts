// Escrow state enum
export enum EscrowState {
    CREATED = 0,
    FUNDED = 1,
    IN_PROGRESS = 2,
    SUBMITTED = 3,
    DISPUTED = 4,
    RESOLVED = 5,
    COMPLETED = 6,
    CANCELLED = 7,
}

export const STATE_LABELS: Record<EscrowState, string> = {
    [EscrowState.CREATED]: 'Created',
    [EscrowState.FUNDED]: 'Funded',
    [EscrowState.IN_PROGRESS]: 'In Progress',
    [EscrowState.SUBMITTED]: 'Submitted',
    [EscrowState.DISPUTED]: 'Disputed',
    [EscrowState.RESOLVED]: 'Resolved',
    [EscrowState.COMPLETED]: 'Completed',
    [EscrowState.CANCELLED]: 'Cancelled',
}

export const STATE_COLORS: Record<EscrowState, string> = {
    [EscrowState.CREATED]: 'bg-gray-100 text-gray-800',
    [EscrowState.FUNDED]: 'bg-blue-100 text-blue-800',
    [EscrowState.IN_PROGRESS]: 'bg-purple-100 text-purple-800',
    [EscrowState.SUBMITTED]: 'bg-yellow-100 text-yellow-800',
    [EscrowState.DISPUTED]: 'bg-red-100 text-red-800',
    [EscrowState.RESOLVED]: 'bg-orange-100 text-orange-800',
    [EscrowState.COMPLETED]: 'bg-green-100 text-green-800',
    [EscrowState.CANCELLED]: 'bg-gray-100 text-gray-800',
}
