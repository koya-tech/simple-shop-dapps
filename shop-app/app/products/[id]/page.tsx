"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/state/cartStore";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types/type";

const ProductDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const tabs = ["Overview", "Other"];
    const { addToCart } = useCartStore();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [activeTab, setActiveTab] = useState("Overview");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const handleClick = () => {
        if (product) {
            addToCart(product);
            router.push("/cart");
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const resolvedParams = await params;
                const response = await fetch(
                    `https://fakestoreapi.com/products/${resolvedParams.id}`
                );
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [params]);

    const renderTabContent = () => {
        switch (activeTab) {
            case "Overview":
                return (
                    <div className="py-4">
                        <p className="text-gray-600 leading-relaxed">
                            {product?.description}
                        </p>
                    </div>
                );
            case "Other":
                return (
                    <div className="py-4">
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="w-2 h-2 mt-2 rounded-full bg-cs-blue flex-shrink-0" />
                                <span className="text-gray-600">
                                    Price : $ {product?.price}
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-2 h-2 mt-2 rounded-full bg-cs-blue flex-shrink-0" />
                                <span className="text-gray-600">
                                    Rating : ★ {product?.rating.rate} /{" "}
                                    {product?.rating.count}
                                </span>
                            </li>
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <Image
                    src={"/loading.gif"}
                    alt={"loading"}
                    width={100}
                    height={100}
                    className="mx-auto"
                    unoptimized
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 max-w-7xl mx-auto">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ShoppingCart size={24} />
                </button>
            </div>

            {/* Product Info */}
            <div className="px-4 py-6 bg-white">
                <div className="space-y-2 mb-6">
                    {product && (
                        <>
                            <h1 className="text-2xl font-bold">
                                {product.title}
                            </h1>
                            <p className="text-lg font-medium">
                                USD ${product.price}
                            </p>
                        </>
                    )}
                </div>

                <div className="lg:flex lg:flex-row-reverse">
                    <div className="lg:basis-2/3 lg:my-8 lg:p-8 lg:rounded-lg">
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
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cs-blue" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Tab Content */}
                        {renderTabContent()}
                    </div>
                    {/* Product Image */}
                    <div className="my-8 bg-gray-100 rounded-xl p-8 lg:rounded-lg lg:w-4xl lg:basis-1/3">
                        {product && (
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={300}
                                height={300}
                                className="w-full object-contain"
                                priority
                            />
                        )}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <div className="mb-16 p-4 bg-white border-t border-gray-100">
                    <button
                        onClick={handleClick}
                        className="w-full bg-cs-blue text-white py-4 rounded-xl font-medium hover:bg-cs-lightblue transition-colors"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
