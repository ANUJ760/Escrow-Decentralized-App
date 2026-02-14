# Decentralized Escrow Platform

A secure, full-stack escrow application built on Ethereum. This platform enables trustless transactions between buyers and sellers, secured by Solidity smart contracts and a modern, high-performance frontend interface.

## Project Structure

```bash
escrow/
├── Backend-Contracts/      # Smart Contracts (Foundry)
│   ├── src/               # Solidity source files
│   ├── script/            # Deployment scripts
│   ├── test/              # Foundry tests
│   └── foundry.toml       # Configuration
│
└── frontend/               # Frontend Application
    ├── src/
    │   ├── app/           # Next.js App Router pages
    │   ├── components/    # UI Components (Glassmorphism)
    │   ├── hooks/         # Custom Wagmi hooks
    │   └── contracts/     # ABIs and Addresses
    └── ...
```

## Tech Stack

- **Smart Contracts**: Solidity, Foundry (Development & Testing)
- **Frontend**: Next.js 16, TypeScript, Tailwind CSS v4, RainbowKit, Wagmi
- **Development**: The frontend architecture was accelerated using **AI assistance** to ensure a robust, modern, and aesthetic user experience.

## Smart Contracts

The backend relies on three core contracts:

1.  **Escrow.sol**: Manages individual transactions, funds, and state lifecycles.
2.  **EscrowFactory.sol**: Factory pattern to deploy and track escrow instances.
3.  **Arbitrator.sol**: Handles dispute resolution and fair fund distribution.

**Key Features:**
-   Reentrancy protection (OpenZeppelin)
-   Strict state machine (Created -> Funded -> In Progress -> Completed)
-   Role-based access control (Buyer, Seller, Arbitrator)

## Setup & Installation

### 1. Smart Contracts

```bash
cd Backend-Contracts

# Build & Test
forge build
forge test

# Deploy
forge script script/DeployEscrow.s.sol:DeployEscrow --rpc-url <RPC_URL> --private-key <KEY> --broadcast
```

### 2. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Setup env
cp .env.example .env

# Run dev server
npm run dev
```

## Usage

1.  **Create**: Buyer initializes escrow with Seller address, amount, and deadline.
2.  **Fund**: Buyer deposits ETH.
3.  **Work**: Seller accepts and completes the task.
4.  **Complete**: Buyer approves work; funds are released.
5.  **Dispute**: Arbitrator resolves conflicts if they arise.

## License

MIT
