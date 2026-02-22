# Decentralized Escrow Platform

A secure, full-stack escrow application built on Ethereum. This platform enables trustless transactions between buyers and sellers, secured by Solidity smart contracts and a modern, high-performance frontend interface.

## Project Structure

```bash
escrow/
├── Backend-Contracts/      # Smart Contracts (Foundry)
├── backend-app/            # Arbitration & IPFS API (Node.js/Express)
└── frontend/               # Frontend Application
```

## Tech Stack

- **Smart Contracts**: Solidity, Foundry
- **Arbitration Engine**: Node.js, Express, OpenAI/OpenRouter (AI-driven verdicts)
- **Frontend**: Next.js 16, TypeScript, Tailwind CSS v4, RainbowKit, Wagmi
- **Storage**: IPFS (via Pinata) for evidence persistence

## AI Arbitration Workflow

This platform features an automated AI arbitration service to resolve disputes fairly:
1. **Evidence Collection**: Buyers and sellers submit text/image evidence.
2. **IPFS Storage**: Evidence is pinned to IPFS for decentralization.
3. **AI Verdict**: When a dispute is raised, the Arbitrator can request an AI verdict.
4. **Analysis**: The backend fetches evidence from IPFS and uses GPT-4/AI models to analyze the contract terms vs evidence.
5. **Resolution**: The AI provides a weighted recommendation, allowing the Arbitrator to finalize the resolution on-chain.

## Setup & Installation

### 1. Smart Contracts
```bash
cd Backend-Contracts
forge build
forge test
```

### 2. Arbitration Backend
```bash
cd backend-app
npm install
# Setup .env with OPENAI_API_KEY, PINATA_API_KEY, etc.
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
# Ensure NEXT_PUBLIC_AI_BACKEND_URL points to the backend
npm run dev
```

## Environment Variables

### Backend (`backend-app/.env`)
- `PORT`: Server port (default 3001)
- `OPENAI_API_KEY`: API key for AI processing
- `PINATA_JWT`: For IPFS evidence pinning

### Frontend (`frontend/.env`)
- `NEXT_PUBLIC_AI_BACKEND_URL`: URL of the arbitration service (e.g., http://localhost:3001)

## License

MIT
