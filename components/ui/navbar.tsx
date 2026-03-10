"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Product", href: "/product" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isHomePage = pathname === "/";
    const forceSolid = !isHomePage;
    const isScrolled = scrolled || forceSolid || mobileMenuOpen;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? "bg-white shadow-xl py-3 border-b border-slate-200"
                : "bg-transparent py-5 border-b border-white/5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
                {/* Brand Logo */}
                <Link href="/" className="group flex items-center gap-3">
                    <div className="relative">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isScrolled ? "bg-black shadow-lg" : "bg-white shadow-lg shadow-white/20"} group-hover:scale-110`}>
                            <span className={`font-black text-xl ${isScrolled ? "text-white" : "text-black"}`}>P</span>
                        </div>
                        <div className={`absolute inset-0 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${isScrolled ? "bg-black" : "bg-white"}`} />
                    </div>
                    <span className={`text-2xl font-black tracking-tight transition-colors duration-300 ${isScrolled ? "text-slate-900" : "text-white"}`}>
                        Prepdha
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Desktop Navigation */}
                    <nav className="hidden md:block relative">
                        <ul className="flex items-center gap-2 relative">
                            {/* THE GLIDING UNDERLINE */}
                            <div
                                className={`absolute bottom-[-16px] h-[2px] rounded-full transition-all duration-300 ease-out opacity-0 pointer-events-none ${isScrolled ? "bg-blue-600" : "bg-white"}`}
                                style={{
                                    width: hoveredIndex !== null ? "var(--width)" : "0px",
                                    left: hoveredIndex !== null ? "var(--left)" : "0px",
                                    opacity: hoveredIndex !== null ? 1 : 0,
                                }}
                            />

                            {NAV_LINKS.map((link, index) => (
                                <li
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={(e) => {
                                        setHoveredIndex(index);
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();
                                        if (parentRect) {
                                            e.currentTarget.parentElement?.style.setProperty(
                                                "--left",
                                                `${rect.left - parentRect.left}px`
                                            );
                                            e.currentTarget.parentElement?.style.setProperty(
                                                "--width",
                                                `${rect.width}px`
                                            );
                                        }
                                    }}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className={`px-5 py-2 text-sm font-bold transition-all duration-300 flex items-center gap-2 ${isScrolled
                                            ? (hoveredIndex === index ? "text-blue-600 scale-105" : "text-slate-600 hover:text-slate-950")
                                            : (hoveredIndex === index ? "text-white scale-105" : "text-white/70 hover:text-white")
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${isScrolled ? "text-slate-900 bg-slate-100" : "text-white bg-white/10"
                            } ${mobileMenuOpen ? 'z-[60]' : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-current transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
                            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                            <span className={`w-full h-0.5 bg-current transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-white transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) md:hidden ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <nav className="h-full flex flex-col p-8 pt-24 overflow-y-auto">
                    <ul className="space-y-4">
                        {NAV_LINKS.map((link, index) => (
                            <li key={link.name} className={`transform transition-all duration-500 delay-${index * 100} ${mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
                                <Link
                                    href={link.href}
                                    className="text-4xl font-black text-slate-900 flex items-center justify-between border-b border-slate-100 py-4 group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span>{link.name}</span>
                                    <span className="text-slate-300 group-hover:text-blue-600 transition-colors">→</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto pt-10 pb-6 space-y-6">
                        <button className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-xl shadow-2xl shadow-slate-900/20 active:scale-95 transition-all">
                            Book a Demo
                        </button>
                        <div className="flex items-center justify-center gap-6 text-slate-400">
                            <Link href="#" className="hover:text-slate-900 transition-colors">Twitter</Link>
                            <Link href="#" className="hover:text-slate-900 transition-colors">LinkedIn</Link>
                            <Link href="#" className="hover:text-slate-900 transition-colors">Instagram</Link>
                        </div>
                        <p className="text-center text-slate-400 text-sm font-medium">
                            © 2024 Prepdha. Mastery made simple.
                        </p>
                    </div>
                </nav>
            </div>
        </header>
    );
}
