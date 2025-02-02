"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <div className="mb-10 w-full max-w-7xl mx-auto p-4 lg:p-6 bg-cs-white">
            <div className="">
                {/* First Hero Section */}
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* Text Content - Left side on desktop */}
                        <div className="w-full lg:w-1/3 text-center lg:text-left">
                            <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                                ChainShop
                            </h2>
                            <p className="text-lg lg:text-xl text-cs-darkgrey">
                                Enjoy the safety shopping experience.
                                <br />
                                We offer products from various categories.
                            </p>
                        </div>

                        {/* Image - Right side on desktop */}
                        <div className="w-full lg:w-2/3">
                            <Image
                                src="/cs-main.png"
                                alt="Hero Image"
                                className="w-full h-auto lg:p-4"
                                width={800}
                                height={600}
                            />
                        </div>
                    </div>
                </div>

                {/* Second Hero Section */}
                <div className="container mx-auto px-4">
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
                        {/* Image - Left side on desktop */}
                        <div className="w-full lg:w-1/2">
                            <Image
                                src="/safety.png"
                                alt="Safety Image"
                                className="lg:max-w-md h-auto p-10"
                                width={500}
                                height={500}
                            />
                        </div>

                        {/* Text Content - Right side on desktop */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left pt-5">
                            <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                                Protect Your Experience
                            </h2>
                            <p className="text-lg lg:text-xl text-cs-darkgrey">
                                Our service use blockchain technology
                                <br />
                                to ensure the safety of your transaction
                                history.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ProductTab /> */}
            <div className="flex justify-center mt-10">
                <Button
                    onClick={() => {
                        router.push("/products");
                    }}
                    className="bg-cs-blue text-cs-white"
                >
                    Go to Shopping
                </Button>
            </div>
        </div>
    );
}
