"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

const ProductList = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    // Sample product data
    const products = [
        {
            id: 1,
            name: "TMA-2 Modular Headphone",
            price: 350,
            category: "Headphone",
            image: "/api/placeholder/200/200",
            isNew: true,
        },
        {
            id: 2,
            name: "CO2 - Cable",
            price: 25,
            category: "Cable",
            image: "/api/placeholder/200/200",
        },
        {
            id: 3,
            name: "TMA-2 HD Wireless",
            price: 350,
            category: "Headphone",
            image: "/api/placeholder/200/200",
        },
        {
            id: 4,
            name: "Premium Headband",
            price: 75,
            category: "Headband",
            image: "/api/placeholder/200/200",
            isNew: true,
        },
        {
            id: 5,
            name: "Comfort Earpads",
            price: 45,
            category: "Earpads",
            image: "/api/placeholder/200/200",
        },
    ];

    const categories = ["All", "Headphone", "Headband", "Earpads", "Cable"];

    const filteredProducts =
        activeCategory === "All"
            ? products
            : products.filter((product) => product.category === activeCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
            {/* Category Tabs */}
            <div className="mb-8">
                <div className="flex gap-3 overflow-x-auto pb-4 lg:flex-wrap">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm lg:text-base transition-colors
                ${
                    activeCategory === category
                        ? "bg-emerald-400 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow"
                    >
                        {/* Product Image */}
                        <div className="relative mb-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full aspect-square object-cover rounded-lg"
                            />
                            {/* {product.isNew && (
                                <span className="absolute top-2 left-2 bg-emerald-400 text-white text-xs px-2 py-1 rounded-full">
                                    New
                                </span>
                            )} */}
                            {/* <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                                <Heart size={20} className="text-gray-600" />
                            </button> */}
                        </div>

                        {/* Product Info */}
                        <div>
                            <h3 className="font-medium mb-2 text-gray-900">
                                {product.name}
                            </h3>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-900">
                                    USD {product.price}
                                </span>
                                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                    <ShoppingCart
                                        size={20}
                                        className="text-gray-600"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-600">
                        No products found in this category.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProductList;
