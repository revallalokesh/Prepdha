"use client";
import React, { useState, useEffect, useRef } from "react";
import { Brain, MessageSquare, CheckCircle2 } from "lucide-react";

export default function AIDoubtSolverDemo() {
    const [messages, setMessages] = useState<Array<{ role: string; text: string; highlights?: string[] }>>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    // Start conversation
                    setTimeout(() => {
                        setMessages([{ role: "student", text: "Why does the equation x² + 5x + 6 = 0 factor into (x+2)(x+3)?" }]);
                    }, 500);

                    setTimeout(() => {
                        setIsTyping(true);
                    }, 1500);

                    setTimeout(() => {
                        setIsTyping(false);
                        setMessages(prev => [...prev, {
                            role: "ai",
                            text: "Great question! Let me break this down step-by-step using the factoring method from Chapter 4, Section 2 of your NCERT Mathematics textbook.",
                            highlights: ["Chapter 4, Section 2", "NCERT Mathematics"]
                        }]);
                    }, 3500);

                    setTimeout(() => {
                        setMessages(prev => [...prev, {
                            role: "ai",
                            text: "Step 1: We need two numbers that multiply to give 6 (the constant term) and add to give 5 (the coefficient of x).\n\nStep 2: Those numbers are 2 and 3 because:\n• 2 × 3 = 6 ✓\n• 2 + 3 = 5 ✓\n\nStep 3: Therefore, x² + 5x + 6 = (x + 2)(x + 3)\n\nYou can verify by expanding: (x+2)(x+3) = x² + 3x + 2x + 6 = x² + 5x + 6 ✓",
                            highlights: []
                        }]);
                    }, 5000);
                }
            },
            { threshold: 0.4 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center py-16 md:py-24 bg-white overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                        <Brain className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-mono text-indigo-600 tracking-widest uppercase">Contextual AI Doubt Solver</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
                        Not Generic AI. <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600">Curriculum-Aware Intelligence</span>
                    </h2>
                    <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
                        Watch how our AI provides step-by-step solutions grounded in your specific curriculum
                    </p>
                </div>

                {/* Chat Interface */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden border-2 border-indigo-200 bg-gradient-to-br from-white to-indigo-50 shadow-2xl">
                        {/* Header */}
                        <div className="p-4 md:p-6 border-b border-indigo-200 bg-white/80 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900">AI Doubt Solver</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-sm text-slate-600">Curriculum-grounded • NCERT aligned</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="p-4 md:p-6 space-y-4 min-h-[350px] md:min-h-[400px]">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === "student" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] ${msg.role === "student" ? "order-2" : "order-1"}`}>
                                        {msg.role === "ai" && (
                                            <div className="flex items-center gap-2 mb-2">
                                                <MessageSquare className="w-4 h-4 text-indigo-600" />
                                                <span className="text-xs font-semibold text-indigo-600">Prepdha AI</span>
                                            </div>
                                        )}
                                        <div className={`p-4 rounded-2xl ${msg.role === "student"
                                                ? "bg-indigo-500 text-white"
                                                : "bg-white border-2 border-indigo-200 text-slate-900"
                                            }`}>
                                            <p className="text-sm leading-relaxed whitespace-pre-line">
                                                {msg.text.split(/(Chapter \d+, Section \d+|NCERT Mathematics)/).map((part, idx) => {
                                                    if (msg.highlights?.includes(part)) {
                                                        return (
                                                            <span key={idx} className="bg-yellow-200 text-yellow-900 px-1 rounded font-semibold">
                                                                {part}
                                                            </span>
                                                        );
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        </div>
                                        {msg.role === "student" && (
                                            <div className="flex items-center justify-end gap-2 mt-1">
                                                <span className="text-xs text-slate-500">Just now</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MessageSquare className="w-4 h-4 text-indigo-600" />
                                            <span className="text-xs font-semibold text-indigo-600">Prepdha AI</span>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white border-2 border-indigo-200">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                                                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                                                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Features Footer */}
                        <div className="p-4 md:p-6 border-t border-indigo-200 bg-white/80 backdrop-blur-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { icon: CheckCircle2, text: "Curriculum-specific", color: "text-green-600" },
                                    { icon: CheckCircle2, text: "Step-by-step logic", color: "text-blue-600" },
                                    { icon: CheckCircle2, text: "Chapter references", color: "text-purple-600" }
                                ].map((feature, i) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div key={i} className="flex items-center gap-2">
                                            <Icon className={`w-4 h-4 ${feature.color}`} />
                                            <span className="text-xs font-semibold text-slate-700">{feature.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Statement */}
                <div className="mt-16 text-center">
                    <div className="inline-block p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-2xl">
                        <p className="text-xl md:text-2xl lg:text-3xl font-black mb-2">
                            Answers grounded in your curriculum.
                        </p>
                        <p className="text-base opacity-90">
                            Not just generic AI responses
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
