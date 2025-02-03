"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Purchase, PurchaseItem, PurchasesResponse } from "@/types/type";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const CONTRACT_ABI = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI!);

const AdminPage: React.FC = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[][]>([]);
    const [error, setError] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                if (!window.ethereum) {
                    setError("Ethereum wallet is not available");
                    return;
                }

                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();

                const contract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    CONTRACT_ABI,
                    signer
                );

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
        const date = new Date(Number(timestamp) * 1000);
        return date.toLocaleString();
    };

    useEffect(() => {
        const auth = localStorage.getItem("admin-auth");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        if (id === "admin" && password === "admin") {
            localStorage.setItem("admin-auth", "true");
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Invalid ID or password");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin-auth");
        setIsAuthenticated(false);
    };

    if (isAuthenticated) {
        return (
            <div className="max-w-7xl mx-auto px-4 p-8">
                <div className="py-6">
                    <h1 className="text-2xl font-semibold mb-4">
                        Purchase History
                    </h1>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {purchases.length === 0 ? (
                        <p>No purchases found.</p>
                    ) : (
                        <div className="w-full overflow-x-auto shadow-md rounded-lg">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3">Index</th>
                                        <th className="px-6 py-3">Buyer</th>
                                        <th className="px-6 py-3">
                                            Total Price (ETH)
                                        </th>
                                        <th className="px-6 py-3">Timestamp</th>
                                        <th className="px-6 py-3">Items</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases.map((purchase, idx) => (
                                        <tr
                                            key={idx}
                                            className="bg-white border-b hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">{idx}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {purchase.buyer}
                                            </td>
                                            <td className="px-6 py-4">
                                                {purchase.totalPrice}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatTimestamp(
                                                    purchase.timestamp
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <ul className="list-disc list-inside space-y-1">
                                                    {purchaseItems[idx].map(
                                                        (item, jdx) => (
                                                            <li
                                                                key={jdx}
                                                                className="text-gray-600"
                                                            >
                                                                Product ID:{" "}
                                                                {item.productId.toString()}
                                                                ,
                                                                <span className="ml-2">
                                                                    Amount:{" "}
                                                                    {item.amount.toString()}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-4 p-2 bg-cs-blue text-white rounded"
                >
                    LOGOUT
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-xl font-bold mb-4">LOGIN</h2>
            <input
                type="text"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="border p-2 mb-2"
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 mb-2"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
                onClick={handleLogin}
                className="p-2 bg-cs-blue text-white rounded"
            >
                LOGIN
            </button>
        </div>
    );
};

export default AdminPage;
