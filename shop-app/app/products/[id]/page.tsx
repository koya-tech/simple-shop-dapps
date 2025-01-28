"use client";

import React, { useState } from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
// import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
    const [activeTab, setActiveTab] = useState("Overview");
    // const navigate = useNavigate();

    const tabs = ["Overview", "Features", "Specification"];

    // Sample product data
    const product = {
        name: "TMA-2 HD WIRELESS",
        price: 350,
        overview:
            "The TMA-2 HD Wireless delivers premium audio with exceptional clarity and detailed sound reproduction.",
        features: [
            "40mm dynamic drivers",
            "Bluetooth 5.0 with aptX HD",
            "Up to 20 hours battery life",
            "Comfort fit with memory foam ear cushions",
        ],
        specifications: {
            "Driver Type": "40mm Dynamic",
            "Frequency Response": "20Hz - 20kHz",
            Impedance: "32 Ohm",
            "Battery Life": "20 Hours",
            "Wireless Range": "10m",
            Weight: "250g",
        },
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "Overview":
                return (
                    <div className="py-4">
                        <p className="text-gray-600 leading-relaxed">
                            {product.overview}
                        </p>
                    </div>
                );
            case "Features":
                return (
                    <div className="py-4">
                        <ul className="space-y-3">
                            {product.features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-2"
                                >
                                    <span className="w-2 h-2 mt-2 rounded-full bg-emerald-400 flex-shrink-0" />
                                    <span className="text-gray-600">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case "Specification":
                return (
                    <div className="py-4">
                        <div className="space-y-3">
                            {Object.entries(product.specifications).map(
                                ([key, value]) => (
                                    <div
                                        key={key}
                                        className="flex justify-between"
                                    >
                                        <span className="text-gray-600">
                                            {key}
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            {value}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100">
                <button
                    // onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ShoppingCart size={24} />
                </button>
            </header>

            {/* Product Info */}
            <div className="px-4 py-6">
                <div className="space-y-2 mb-6">
                    <p className="text-lg font-medium">USD {product.price}</p>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex gap-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 relative ${
                                    activeTab === tab
                                        ? "text-gray-900"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                {renderTabContent()}

                {/* Product Image */}
                <div className="my-8 bg-gray-100 rounded-xl p-8">
                    <img
                        src="/api/placeholder/400/400"
                        alt={product.name}
                        className="w-full object-contain"
                    />
                </div>

                {/* Add to Cart Button */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <button className="w-full bg-emerald-400 text-white py-4 rounded-xl font-medium hover:bg-emerald-500 transition-colors">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
