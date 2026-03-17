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
- **Arbitration Engine**: Node.js, Express, OpenAI (AI-driven verdicts)
- **Frontend**: Next.js 16, TypeScript, Tailwind CSS v4, RainbowKit, Wagmi
- **Storage**: IPFS (via Pinata) for evidence persistence
- **Secrets Management**: Infisical (environment-based secret injection)

## AI Arbitration Workflow

This platform features an automated AI arbitration service to resolve disputes fairly:
1. **Evidence Collection**: Buyers and sellers submit text/image evidence.
2. **IPFS Storage**: Evidence is pinned to IPFS for decentralization.
3. **AI Verdict**: When a dispute is raised, the Arbitrator can request an AI verdict.
4. **Analysis**: The backend fetches evidence from IPFS and uses an OpenAI model to analyze the contract terms vs evidence.
5. **Resolution**: The AI provides a weighted recommendation, allowing the Arbitrator to finalize the resolution on-chain.

## Setup & Installation

### Infisical Prerequisites
```bash
# Install CLI (see official docs for your OS/package manager)
infisical --version

# Authenticate and select project/environment once
infisical login
```

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
infisical run --env=dev --path=/backend -- npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
infisical run --env=dev --path=/frontend -- npm run dev
```

Frontend command template:
```bash
infisical run --env=dev --path=/frontend -- [your frontend start command]
```

## Environment Variables

All local `.env` files have been removed. Runtime environment variables are now injected through Infisical.

Use these Infisical paths:
- `/backend`: Backend secrets
- `/frontend`: Frontend secrets

### Backend (`/backend` path in Infisical)
- `PORT`: Server port (default 3001)
- `OPENAI_API_KEY`: API key for AI processing
- `PINATA_JWT`: For IPFS evidence pinning

### Frontend (`/frontend` path in Infisical)
- `NEXT_PUBLIC_AI_BACKEND_URL`: URL of the arbitration service (e.g., http://localhost:3001)
- Do not store Pinata or OpenAI secrets in frontend env variables.

## API Endpoints (Backend)

- `POST /resolve-dispute`:
  - Body: `{ "cid": "..." }`
  - Response: `{ "buyerWins": true | false }`
- `POST /ipfs/upload`:
  - Body: `{ "filename": "...", "contentBase64": "...", "mimeType": "..." }`
  - Response: `{ "cid": "..." }`

## License

MIT
