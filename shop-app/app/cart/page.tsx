"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Trash2, ChevronRight, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/state/cartStore";
import { ethers } from "ethers";
import { toast } from "@/hooks/use-toast";
import { CartItemType } from "@/types/type";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const CONTRACT_ABI = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI!);

const ShoppingCart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCartStore();
    const [isProcessing, setIsProcessing] = useState(false);

    const totalItems = cartItems.reduce(
        (sum: number, item: CartItemType) => sum + item.quantity,
        0
    );
    const totalPrice = cartItems.reduce(
        (sum: number, item: CartItemType) =>
            sum + item.product.price * item.quantity,
        0
    );

    const handleCheckout = async () => {
        if (!window.ethereum) {
            toast({
                title: "Need to install MetaMask",
                description:
                    "If you want to do transaction, you need to install MetaMask",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsProcessing(true);

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer
            );

            // const productIds = cartItems.map((item) => item.product.id);
            // const quantities = cartItems.map((item) => item.quantity);

            const purchaseItems = cartItems.map((item) => ({
                productId: item.product.id,
                amount: item.quantity,
            }));

            const tx = await contract.addPurchase(purchaseItems, totalPrice);

            await tx.wait();

            toast({
                title: "Completed",
                description: "register your purchase history on blockchain",
            });
        } catch (error) {
            console.error("Checkout error:", error);
            toast({
                title: "Error occurred",
                description: "Failed to register your purchase history",
                variant: "destructive",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-cs-white max-w-7xl mx-auto">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center border-b border-gray-100">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="flex-1 text-center text-lg font-semibold">
                    Shopping Cart
                </h1>
                <div className="w-10" /> {/* Spacer for alignment */}
            </div>

            {/* Cart Items */}
            <div className="px-4 py-6">
                {cartItems.map((item) => (
                    <div
                        key={item.product.id}
                        className="mb-6 bg-cs-lightgray p-4 rounded-xl"
                    >
                        <div className="flex gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Image
                                    src={item.product.image}
                                    alt={item.product.title}
                                    width={300}
                                    height={300}
                                    className="w-16 h-16 object-contain"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium mb-1">
                                    {item.product.title}
                                </h3>
                                <p className="text-gray-900 mb-2">
                                    USD {item.product.price}
                                </p>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-600">
                                        Qty {item.quantity}
                                    </p>
                                    <div className="flex gap-2">
                                        <Plus
                                            onClick={() =>
                                                updateQuantity(
                                                    item.product.id,
                                                    item.quantity + 1
                                                )
                                            }
                                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                        />
                                        <Minus
                                            onClick={() =>
                                                updateQuantity(
                                                    item.product.id,
                                                    item.quantity - 1
                                                )
                                            }
                                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row-reverse mt-4">
                                    <button
                                        onClick={() =>
                                            removeFromCart(item.product.id)
                                        }
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="bg-white border-t border-gray-100 px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600">
                        Total {totalItems} items
                    </span>
                    <span className="text-xl font-bold">USD {totalPrice}</span>
                </div>
                <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-cs-green text-white py-4 rounded-xl font-medium hover:bg-emerald-500 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isProcessing ? (
                        "処理中..."
                    ) : (
                        <>
                            Proceed to Checkout
                            <ChevronRight size={20} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;

// import { useCartStore } from "@/state/cartStore";
// import { CartItem } from "@/type";

// export default function CartPage() {
//     const { cartItems, removeFromCart } = useCartStore();

//     return (
//         <div>
//             <h1>Your Cart</h1>
//             {cartItems.map((item: CartItem) => (
//                 <div key={item.id}>
//                     <h2>{item.name}</h2>
//                     <p>${item.price}</p>
//                     <p>Quantity: {item.quantity}</p>
//                     <button onClick={() => removeFromCart(item.id)}>
//                         Remove
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// }
