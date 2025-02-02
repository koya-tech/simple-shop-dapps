"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

// Define types for Purchase and PurchaseItem
interface Purchase {
    buyer: string;
    totalPrice: number;
    timestamp: bigint;
}

interface PurchaseItem {
    productId: number;
    amount: number;
}

type PurchasesResponse = [Purchase[], PurchaseItem[][]];

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const CONTRACT_ABI = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI!);

const AdminPage: React.FC = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[][]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                if (!window.ethereum) {
                    setError("Ethereum wallet is not available");
                    return;
                }

                // Connect to Ethereum using ethers.js provider from the browser
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();

                // Create a contract instance using the signer
                const contract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    CONTRACT_ABI,
                    signer
                );

                // Fetch purchases with pagination; here, using start index 0 and count 10 as an example
                const start = 0;
                const count = 10;
                const [purchasesData, itemsData]: PurchasesResponse =
                    await contract.getPurchases(start, count);

                setPurchases(purchasesData);
                setPurchaseItems(itemsData);
            } catch (err) {
                console.error(err);
                setError("Error fetching purchase history");
            }
        };

        fetchPurchases();
    }, []);

    const formatTimestamp = (timestamp: bigint) => {
        // BigInt を Number に変換
        const date = new Date(Number(timestamp) * 1000);
        return date.toLocaleString();
    };

    return (
        <div>
            <h1>Purchase History</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {purchases.length === 0 ? (
                <p>No purchases found.</p>
            ) : (
                <table border={1} cellPadding={8}>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Buyer</th>
                            <th>Total Price (ETH)</th>
                            <th>Timestamp</th>
                            <th>Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase, idx) => (
                            <tr key={idx}>
                                <td>{idx}</td>
                                <td>{purchase.buyer}</td>
                                <td>{purchase.totalPrice}</td>
                                <td>{formatTimestamp(purchase.timestamp)}</td>
                                <td>
                                    <ul>
                                        {purchaseItems[idx].map((item, jdx) => (
                                            <li key={jdx}>
                                                Product ID:{" "}
                                                {item.productId.toString()},
                                                Amount: {item.amount.toString()}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPage;
