# Escrow dApp Frontend

A decentralized escrow platform frontend built with Next.js, Wagmi, and RainbowKit.

## Features

- 🔐 Secure wallet connection via RainbowKit
- 📝 Create escrow contracts with custom terms
- 💰 Fund, manage, and complete escrow transactions
- ⚖️ Dispute resolution system with arbitrator
- 📊 Real-time transaction status tracking
- 🎨 Responsive, modern UI with Tailwind CSS

## Prerequisites

- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file:

```env
NEXT_PUBLIC_WALLETCONNECT=your_walletconnect_project_id
```

Get a WalletConnect project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contract Addresses (Sepolia)

- **Arbitrator**: `0xcA68Cb7ae7BcF4Ef34245c446Edf767829d07189`
- **EscrowFactory**: `0xd60052aa286a77871E4D3FC73BA939758080BB8a`

## Usage Guide

### 1. Create Escrow (Buyer)
1. Connect your wallet
2. Enter seller address
3. Specify amount in ETH
4. Set deadline in days
5. Click "Create Escrow"

### 2. Fund Escrow (Buyer)
1. Navigate to your escrow
2. Click "Fund Escrow"
3. Confirm transaction in wallet

### 3. Accept Work (Seller)
1. View the funded escrow
2. Click "Accept Work"
3. Begin working on deliverables

### 4. Submit Work (Seller)
1. Complete the work
2. Click "Submit Work"
3. Wait for buyer verification

### 5. Verify or Dispute (Buyer)
- **Approve**: Click "Approve Work" to release funds
- **Dispute**: Click "Raise Dispute" if work is unsatisfactory

### 6. Resolve Dispute (Arbitrator)
1. View disputed escrow
2. Select winner (buyer or seller)
3. Click "Resolve Dispute"

### 7. Withdraw Funds
- Seller withdraws after approval
- Winner withdraws after dispute resolution
- Buyer withdraws if cancelled

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── hooks/            # Custom Wagmi hooks
├── contracts/        # ABIs and addresses
└── lib/              # Utilities and config
```

## Key Components

- **CreateEscrow**: Form for creating new escrows
- **EscrowActions**: State-based action buttons
- **EscrowDetailsView**: Full escrow information display
- **DisputeResolution**: Arbitrator interface
- **TransactionStatus**: Transaction feedback UI

## Custom Hooks

All contract interactions are abstracted into reusable hooks:

- `useCreateEscrow` - Create new escrow
- `useFundEscrow` - Fund escrow with ETH
- `useSellerAcceptWork` - Accept work
- `useSubmitWork` - Submit completed work
- `useVerifyWork` - Approve work
- `useRaiseDispute` - Dispute work
- `useWithdrawFunds` - Withdraw funds
- `useCancelEscrow` - Cancel escrow
- `useEscrowDetails` - Read escrow state
- `useResolveDispute` - Resolve disputes

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 16
- **Blockchain**: Wagmi v2, Viem v2
- **Wallet**: RainbowKit v2
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript

## Security Notes

- All transactions require wallet confirmation
- Role-based access control enforced
- Address validation on all inputs
- Reentrancy protection in smart contracts

## License

MIT
