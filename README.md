# Blockchain Purchase History Dapps

## Overview

This project is a simple dapps that records users' purchase history on the blockchain and allows administrators to view the purchase history. It uses the FakeStore API for product information and stores purchase records on the Ethereum blockchain.

![screenshot](./shop-app/public/Screenshot.png)

## Key Features

-   Product purchase by users and recording of purchase history on blockchain
-   Purchase history list view for administrators
-   Product listing using FakeStore API
-   Wallet connection using MetaMask
-   Permanent storage of purchase data through smart contracts
-   can see Purchase History on admin page (admin/admin)

## Tech Stack

-   **Frontend**
    -   Next.js
    -   React
    -   TypeScript
    -   Tailwind CSS
-   **Blockchain**
    -   Solidity
    -   Hardhat
    -   Ethereum
-   **External API**
    -   FakeStore API

## Prerequisites

-   Node.js 16.0 or higher
-   MetaMask wallet
-   yarn or npm

## Installation

```bash
# Clone the repository
git clone https://github.com/username/blockchain-purchase-history.git

# Navigate to the project directory
cd blockchain-purchase-history

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

## Smart Contract Deployment

```bash
# Start local network
npx hardhat node

# Deploy smart contracts
npx hardhat ignition deploy ignition/modules/PurchaseHistory.ts --network localhost
```

## Development Server

```bash
# Start development server
npm run dev
```

## Environment Variables

Set up the following environment variables in your `.env.local` file:

```
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_CONTRACT_ABI=contruct_abi
```

## License

This project is licensed under the [MIT License](LICENSE).

## Local Development

For local development, ensure you have MetaMask installed and configured to work with your local Hardhat network:

1. Start the local Hardhat network
2. Deploy the smart contracts
3. Configure MetaMask to connect to localhost:8545
4. Import test accounts using private keys provided by Hardhat

## Security

-   Smart contracts have been developed with security best practices
-   Users should always verify transactions in MetaMask
-   Admin functions are protected with appropriate access controls
