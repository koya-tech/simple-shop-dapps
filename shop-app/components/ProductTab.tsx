"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import router from "next/navigation";
import { useCartStore } from "@/state/cartStore";
import { ProductType } from "@/types/type";

const ProductList = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const { addToCart } = useCartStore();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "https://fakestoreapi.com/products"
                );
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "https://fakestoreapi.com/products/categories"
                );
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };
        fetchCategories();
        fetchProducts();
    }, []);

    const filteredProducts =
        activeCategory === "all"
            ? products
            : products.filter((product) => product.category === activeCategory);

    const handleClick = (product: ProductType) => {
        if (product) {
            addToCart(product);
            router.redirect("/cart");
        }
    };

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <Image src={"/loading.gif"} alt={"loading"} />
            </div>
        );
    }

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
                        ? "bg-cs-blue text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                        >
                            {category.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col justify-between bg-white rounded-xl p-4 hover:shadow-lg transition-shadow h-full"
                    >
                        {/* Product Image */}
                        <Link key={product.id} href={`/products/${product.id}`}>
                            <div className="relative mb-4">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={300}
                                    height={300}
                                    className="w-full aspect-square object-contain rounded-lg"
                                />
                                <h3 className="font-medium my-2 text-gray-900">
                                    {product.title}
                                </h3>
                            </div>
                        </Link>
                        {/* Product Info */}
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-900">
                                USD {product.price}
                            </span>
                            <button
                                onClick={() => handleClick(product)}
                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <ShoppingCart
                                    size={20}
                                    className="text-gray-600"
                                />
                            </button>
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
