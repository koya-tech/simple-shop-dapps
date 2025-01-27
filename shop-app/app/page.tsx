import ProductTab from "@/components/ProductTab";
import Image from "next/image";

export default function Home() {
    return (
        <div className="w-full max-w-7xl mx-auto p-4 lg:p-6 bg-cs-white">
            <div className="lg:flex relative">
                <div className="hidden lg:block flex-col lg:absolute top-1/4 left-0">
                    <h2 className="text-6xl">ChainShop</h2>
                    <p className="lg:mt-7 text-xl text-cs-darkgrey">
                        Enjoy the safety shopping experience.
                        <br />
                        We offer products from various categories.
                    </p>
                </div>
                <div className="flex flex-row-reverse w-full">
                    <Image
                        src="/cs-main.png"
                        alt="Hero Image"
                        width={800}
                        height={600}
                    />
                </div>
            </div>
            <ProductTab />
        </div>
    );
}
