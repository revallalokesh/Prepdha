"use client";
import React from "react";
import { Shield, Zap, Palette, CheckCircle2 } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Privacy First",
        description: "Personalization data, highlights, and notes are private and securely synced across all devices",
        details: [
            "End-to-end encryption for all student data",
            "GDPR compliant data handling",
            "No third-party data sharing",
            "Secure cross-device synchronization"
        ],
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        icon: Zap,
        title: "Built for Scale",
        description: "An architecture designed for high availability, handling massive student volumes and daily revision workflows without lag",
        details: [
            "99.9% uptime SLA guarantee",
            "Handles 100,000+ concurrent users",
            "Sub-second response times",
            "Auto-scaling infrastructure"
        ],
        gradient: "from-purple-500 to-pink-500"
    },
    {
        icon: Palette,
        title: "Institutional Identity",
        description: "Schools maintain their brand with full white-label support, including custom logos, colors, and domains",
        details: [
            "Custom branding and color schemes",
            "Personalized domain names",
            "Branded mobile apps (iOS & Android)",
            "Institution-specific content libraries"
        ],
        gradient: "from-orange-500 to-red-500"
    }
];

export default function TechnicalExcellence() {
    return (
        <section className="relative w-full py-16 md:py-24 bg-slate-950 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(to right, rgba(6,182,212,1) 1px, transparent 1px)",
                    backgroundSize: "50px 50px"
                }}
            />

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">Non-Functional Trust</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                        Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Excellence</span>
                    </h2>
                    <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto">
                        Infrastructure quality that school owners and institutions can trust
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Gradient accent */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-black text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    {feature.description}
                                </p>

                                {/* Details List */}
                                <div className="space-y-3">
                                    {feature.details.map((detail, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-slate-300">{detail}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Hover glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Statement Card */}
                <div className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-2xl"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
                    }}
                >
                    <div className="p-8 md:p-12 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 mb-6 shadow-2xl">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-4xl font-black text-white mb-4">
                            Enterprise-Grade Infrastructure
                        </h3>
                        <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Built from the ground up to handle the demands of modern educational institutions—combining{" "}
                            <span className="text-cyan-400 font-semibold">security</span>,{" "}
                            <span className="text-purple-400 font-semibold">scalability</span>, and{" "}
                            <span className="text-orange-400 font-semibold">customization</span>{" "}
                            into a single, reliable platform.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                            {[
                                { value: "99.9%", label: "Uptime SLA" },
                                { value: "100K+", label: "Concurrent Users" },
                                { value: "<1s", label: "Response Time" },
                                { value: "256-bit", label: "Encryption" }
                            ].map((stat, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="text-3xl font-black text-cyan-400 mb-1">{stat.value}</div>
                                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
