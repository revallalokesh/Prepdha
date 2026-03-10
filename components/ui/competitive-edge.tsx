"use client";
import React, { useState } from "react";
import { Check, X, Zap, Target, Users, BarChart3 } from "lucide-react";

const comparisons = [
    {
        title: "Interactive Learning vs Passive Reading",
        traditional: "Static PDFs and long video lectures",
        prepdha: "Active participation with Match the Following, Concept-checks, and embedded quizzes",
        icon: Zap
    },
    {
        title: "Self-Correcting Ecosystem",
        traditional: "Students repeat same mistakes without intervention",
        prepdha: "System automatically generates flashcards from mistakes, turning failure into scheduled revision",
        icon: Target
    },
    {
        title: "Dual-World Architecture",
        traditional: "Separate platforms for schools and individuals",
        prepdha: "Single engine that scales for both B2C learners and B2B institutional deployments",
        icon: Users
    },
    {
        title: "Role-Specific Intelligence",
        traditional: "One-size-fits-all dashboard for everyone",
        prepdha: "Distinct, high-value dashboards for Students, Teachers, and Principals—each with relevant data",
        icon: BarChart3
    }
];

export default function CompetitiveEdge() {
    const [activeComparison, setActiveComparison] = useState(0);

    return (
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                        <Zap className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-mono text-orange-600 tracking-widest uppercase">Why We Are Better</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
                        The <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">Competitive Edge</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Direct comparison: Traditional Way vs The Prepdha Way
                    </p>
                </div>

                {/* Comparison Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {comparisons.map((comp, index) => {
                        const Icon = comp.icon;
                        return (
                            <button
                                key={index}
                                onClick={() => setActiveComparison(index)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeComparison === index
                                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105"
                                        : "bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:shadow-md"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{comp.title.split(" ")[0]}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Active Comparison */}
                <div className="relative">
                    {comparisons.map((comp, index) => {
                        const Icon = comp.icon;
                        return (
                            <div
                                key={index}
                                className={`transition-all duration-500 ${activeComparison === index
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-95 absolute inset-0 pointer-events-none"
                                    }`}
                            >
                                {/* Title */}
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 text-center sm:text-left">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg transform shrink-0">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">{comp.title}</h3>
                                </div>

                                {/* Comparison Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Traditional Way */}
                                    <div className="relative rounded-3xl overflow-hidden border-2 border-red-200 bg-white p-8 shadow-lg">
                                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-orange-500" />

                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                                                <X className="w-6 h-6 text-red-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black text-slate-900">Traditional Way</h4>
                                                <p className="text-sm text-red-600 font-semibold">Most EdTech Platforms</p>
                                            </div>
                                        </div>

                                        <p className="text-slate-700 leading-relaxed text-lg">
                                            {comp.traditional}
                                        </p>

                                        <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
                                            <p className="text-sm font-semibold text-red-700">
                                                Result: Low retention, passive engagement, no actionable insights
                                            </p>
                                        </div>
                                    </div>

                                    {/* Prepdha Way */}
                                    <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-300 bg-gradient-to-br from-white to-cyan-50 p-8 shadow-2xl">
                                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 to-blue-500" />

                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                                                <Check className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black text-slate-900">The Prepdha Way</h4>
                                                <p className="text-sm text-cyan-600 font-semibold">Cognitive Infrastructure</p>
                                            </div>
                                        </div>

                                        <p className="text-slate-900 leading-relaxed text-lg font-medium">
                                            {comp.prepdha}
                                        </p>

                                        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-300">
                                            <p className="text-sm font-semibold text-cyan-700">
                                                Result: 94% retention, active mastery, measurable outcomes
                                            </p>
                                        </div>

                                        {/* Sparkle effect */}
                                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-yellow-400 animate-ping opacity-20" />
                                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-yellow-400 opacity-50 flex items-center justify-center">
                                            <span className="text-lg">✨</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Statement */}
                <div className="mt-16 text-center">
                    <div className="inline-block p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl">
                        <p className="text-xl md:text-2xl lg:text-3xl font-black mb-2">
                            We don&apos;t just deliver content.
                        </p>
                        <p className="text-xl md:text-2xl lg:text-3xl font-black">
                            We engineer cognitive mastery.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
