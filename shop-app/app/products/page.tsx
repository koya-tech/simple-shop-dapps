import ProductTab from "@/components/ProductTab";
import React from "react";

const ProductPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <main className="pb-24 lg:pb-12">
                {" "}
                {/* Added padding to account for mobile footer */}
                {/* Featured Banner */}
                {/* <div className="bg-emerald-400 text-white py-3 px-4 lg:px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="text-sm lg:text-base">
                            Free shipping on orders over $50 | 30-day return
                            policy
                        </p>
                    </div>
                </div> */}
                {/* Page Title Section */}
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                Our Products
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Discover our collection of premium audio gear
                            </p>
                        </div>
                        {/* <div className="hidden lg:flex gap-4">
                            <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600">
                                <option value="newest">Newest</option>
                                <option value="price-low">
                                    Price: Low to High
                                </option>
                                <option value="price-high">
                                    Price: High to Low
                                </option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div> */}
                    </div>
                </div>
                {/* Products Section */}
                <ProductTab />
            </main>
        </div>
    );
};

export default ProductPage;
