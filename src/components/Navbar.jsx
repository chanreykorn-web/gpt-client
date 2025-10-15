import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoPath from '../../public/Artboard 12.png'


export const StickyNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/about-us", label: "About Us" },
        { href: "/service", label: "Service" },
        { href: "/products", label: "Products" },
        { href: "/projects", label: "Project" },
        { href: "/new", label: "New" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md px-6 py-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* <h1 className="text-xl font-bold text-sky-600">Logo</h1> */}
                <img src={logoPath} alt="" className="w-[150px]" />
                {/* Desktop nav */}
                <nav className="hidden md:flex space-x-8 text-sky-600 font-medium">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="relative group transition-colors duration-300 hover:text-red-600"
                        >
                            {item.label}
                            {/* You can't get isActive in <a> without custom logic */}
                        </a>
                    ))}
                </nav>

                {/* Toggle button */}
                <button
                    className="md:hidden text-sky-600"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile full-screen menu */}
            {menuOpen && (
                <nav className="fixed inset-0 w-full h-full z-50 bg-white flex flex-col items-center justify-center text-sky-600 font-medium space-y-6 text-xl">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="hover:text-red-600"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            )}
        </header>
    );
};
