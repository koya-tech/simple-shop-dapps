import ProductTab from "@/components/ProductTab";
import React from "react";

const ProductPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <main className="pb-24 lg:pb-12">
                {/* Page Title Section */}
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                Our Products
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Discover our collection of premium products
                            </p>
                        </div>
                    </div>
                </div>
                {/* Products Section */}
                <ProductTab />
            </main>
        </div>
    );
};

export default ProductPage;
