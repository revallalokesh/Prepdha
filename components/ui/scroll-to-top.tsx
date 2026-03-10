"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top coordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="flex p-3 rounded-full bg-slate-900 border-2 border-slate-900 text-white shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:bg-white hover:text-slate-900 hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                    <ArrowUp className="w-5 h-5 stroke-2" />
                </button>
            )}
        </div>
    );
}
