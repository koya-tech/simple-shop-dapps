import React from "react";
import {
    Home,
    Search,
    ShoppingCart,
    Heart,
    User,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
} from "lucide-react";

const Footer = () => {
    const navItems = [
        { icon: Home, label: "Home", active: true },
        { icon: Search, label: "Search", active: false },
        { icon: ShoppingCart, label: "Cart", active: false },
        { icon: Heart, label: "Wishlist", active: false },
        { icon: User, label: "Profile", active: false },
    ];

    const footerLinks = {
        company: [
            { label: "About Us", href: "#" },
            { label: "Careers", href: "#" },
            { label: "News", href: "#" },
            { label: "Contact", href: "#" },
        ],
        support: [
            { label: "Help Center", href: "#" },
            { label: "Safety Center", href: "#" },
            { label: "Community Guidelines", href: "#" },
        ],
        legal: [
            { label: "Cookies Policy", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Law Enforcement", href: "#" },
        ],
    };

    const socialIcons = [
        { icon: Facebook, label: "Facebook" },
        { icon: Twitter, label: "Twitter" },
        { icon: Instagram, label: "Instagram" },
        { icon: Youtube, label: "Youtube" },
    ];

    return (
        <>
            {/* Mobile Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-cs-white border-t text-cs-lightgrey lg:hidden">
                <nav className="flex justify-between items-center px-4 py-2">
                    {navItems.map(({ icon: Icon, label, active }) => (
                        <button
                            key={label}
                            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-cs-lightgrey"
                        >
                            <Icon
                                size={24}
                                className={
                                    active
                                        ? "text-cs-green"
                                        : "text-cs-darkgrey"
                                }
                            />
                            <span
                                className={`text-xs ${
                                    active
                                        ? "text-cs-green font-medium"
                                        : "text-cs-darkgrey"
                                }`}
                            >
                                {label}
                            </span>
                        </button>
                    ))}
                </nav>
            </footer>

            {/* Desktop Footer */}
            <footer className="hidden lg:block bg-cs-white border-t text-cs-lightgrey">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-4 gap-8 mb-12">
                        {/* Brand Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-cs-green rounded-full"></div>
                                <span className="text-xl font-semibold">
                                    ChainShop
                                </span>
                            </div>
                            <p className="text-cs-darkgrey mb-6">
                                Experience premium audio quality with our
                                carefully curated selection of audio equipment.
                            </p>
                            <div className="flex gap-4">
                                {socialIcons.map(({ icon: Icon, label }) => (
                                    <button
                                        key={label}
                                        className="p-2 text-cs-darkgrey hover:text-cs-green transition-colors"
                                        aria-label={label}
                                    >
                                        <Icon size={20} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Links Sections */}
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title}>
                                <h3 className="font-semibold text-cs-black mb-4 capitalize">
                                    {title}
                                </h3>
                                <ul className="space-y-3">
                                    {links.map(({ label, href }) => (
                                        <li key={label}>
                                            <a
                                                href={href}
                                                className="text-cs-darkgrey hover:text-cs-green transition-colors"
                                            >
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Section */}
                    <div className="pt-8 border-t text-cs-lightgrey">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-cs-darkgrey">
                                © 2025 Audio. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
