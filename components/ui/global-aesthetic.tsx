'use client';

import React, { useEffect, useState } from 'react';

export default function GlobalAesthetic() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-white">
            {/* --- Minimalist Light Mesh Gradient Layer --- */}
            <div className="absolute inset-0 opacity-[0.08] overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(21,172,195,0.15),transparent_50%)] animate-mesh-float" />
                <div className="absolute top-[20%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)] animate-mesh-float-slow" />
            </div>

            {/* --- Soft Cyan Auroras for Light Mode --- */}
            <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-cyan-100/50 blur-[160px] rounded-full animate-aurora-1" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-indigo-50/50 blur-[160px] rounded-full animate-aurora-2" />

            {/* --- Subtle Mouse Spotlight Effect --- */}
            <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                    background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(21, 172, 195, 0.05), transparent 80%)`,
                }}
            />

            {/* --- Global CSS Overrides --- */}
            <style jsx global>{`
                @keyframes aurora-1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(8%, 5%) scale(1.1); }
                    66% { transform: translate(-5%, 10%) scale(0.95); }
                }
                @keyframes aurora-2 {
                    0%, 100% { transform: translate(0, 0) scale(1.1); }
                    33% { transform: translate(-10%, -8%) scale(1); }
                    66% { transform: translate(5%, -5%) scale(1.2); }
                }
                @keyframes mesh-float {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-2%, 2%); }
                }
                @keyframes mesh-float-slow {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(2%, -2%); }
                }

                .animate-aurora-1 { animation: aurora-1 25s ease-in-out infinite; }
                .animate-aurora-2 { animation: aurora-2 30s ease-in-out infinite; }
                .animate-mesh-float { animation: mesh-float 15s ease-in-out infinite; }
                .animate-mesh-float-slow { animation: mesh-float-slow 20s ease-in-out infinite; }

                /* Modern Light Scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #f8fafc;
                }
                ::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }

                html {
                    scroll-behavior: smooth;
                    background: white;
                }

                ::selection {
                    background: rgba(21, 172, 195, 0.2);
                    color: #0f172a;
                }
            `}</style>
        </div>
    );
}
