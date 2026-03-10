"use client";
import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Sparkles } from "lucide-react";

export default function InteractiveLearningDemo() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Calculate progress when section is in view
            if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
                const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight / 2)));
                setScrollProgress(progress);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const textbookText = "Photosynthesis is the process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a by-product.";

    const interactiveElements = [
        { type: "blank", text: "Photosynthesis uses _____ to create energy", answer: "sunlight" },
        { type: "match", pairs: [["CO₂", "Carbon Dioxide"], ["H₂O", "Water"], ["O₂", "Oxygen"]] },
        { type: "check", question: "What pigment is involved?", options: ["Chlorophyll", "Melanin", "Hemoglobin"], correct: 0 }
    ];

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                        <Sparkles className="w-4 h-4 text-cyan-600" />
                        <span className="text-xs font-mono text-cyan-600 tracking-widest uppercase">Topic-Based Learning</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
                        From Static Text to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Live Interaction</span>
                    </h2>
                    <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
                        Watch how traditional textbook content transforms into active learning elements
                    </p>
                </div>

                {/* Split Screen Comparison */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Traditional Textbook */}
                    <div className={`relative rounded-3xl overflow-hidden border-2 border-slate-200 bg-white p-6 md:p-8 transition-all duration-700 ${scrollProgress > 0.3 ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-slate-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">Traditional Textbook</h3>
                                <p className="text-sm text-slate-500">Passive Reading</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                                <p className="text-slate-700 leading-relaxed">
                                    {textbookText}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <div className="w-2 h-2 rounded-full bg-red-400" />
                                <span>No interaction, just reading</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Prepdha Interactive */}
                    <div className={`relative rounded-3xl overflow-hidden border-2 border-cyan-300 bg-gradient-to-br from-white to-cyan-50 p-6 md:p-8 transition-all duration-700 ${scrollProgress > 0.3 ? "opacity-100 scale-100 shadow-2xl" : "opacity-70 scale-95"}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">Prepdha Interactive</h3>
                                <p className="text-sm text-cyan-600 font-semibold">Active Participation</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Fill in the blank */}
                            <div className={`p-6 rounded-2xl bg-white border-2 border-cyan-200 transition-all duration-500 ${scrollProgress > 0.4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                                <p className="text-slate-700 mb-3">
                                    Photosynthesis uses{" "}
                                    <input
                                        type="text"
                                        placeholder="______"
                                        className="inline-block w-24 px-2 py-1 border-b-2 border-cyan-500 bg-cyan-50 text-cyan-700 font-semibold focus:outline-none"
                                    />
                                    {" "}to create energy
                                </p>
                                <div className="text-xs text-cyan-600 font-semibold">✓ Fill in the blank</div>
                            </div>

                            {/* Match the following */}
                            <div className={`p-6 rounded-2xl bg-white border-2 border-blue-200 transition-all duration-500 delay-100 ${scrollProgress > 0.5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                                <p className="text-sm font-semibold text-slate-700 mb-3">Match the chemical symbols:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {[["CO₂", "Carbon Dioxide"], ["H₂O", "Water"], ["O₂", "Oxygen"]].map(([symbol, name], i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-12 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                                                {symbol}
                                            </div>
                                            <div className="text-xs text-slate-600">{name}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs text-blue-600 font-semibold mt-2">✓ Match the following</div>
                            </div>

                            {/* Concept check */}
                            <div className={`p-6 rounded-2xl bg-white border-2 border-purple-200 transition-all duration-500 delay-200 ${scrollProgress > 0.6 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                                <p className="text-sm font-semibold text-slate-700 mb-3">What pigment is involved?</p>
                                <div className="space-y-2">
                                    {["Chlorophyll", "Melanin", "Hemoglobin"].map((option, i) => (
                                        <div key={i} className={`p-2 rounded-lg border-2 cursor-pointer transition-all ${i === 0 ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-purple-300"}`}>
                                            <span className="text-sm text-slate-700">{option}</span>
                                            {i === 0 && <span className="ml-2 text-xs text-green-600 font-bold">✓ Correct</span>}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs text-purple-600 font-semibold mt-2">✓ Concept check</div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span>94% engagement rate</span>
                            </div>
                        </div>

                        {/* Sparkle effect */}
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-yellow-400 animate-ping opacity-20" />
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-yellow-400 opacity-50 flex items-center justify-center">
                            <span className="text-lg">✨</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Statement */}
                <div className={`mt-16 text-center transition-all duration-700 ${scrollProgress > 0.7 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="inline-block p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-2xl">
                        <p className="text-xl md:text-2xl lg:text-3xl font-black">
                            Not passive reading. Active mastery.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
