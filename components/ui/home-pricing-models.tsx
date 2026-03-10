"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Building2, Users, CheckCircle2, ArrowRight,
    Sparkles, Globe, Zap, BarChart3, BookOpen, Trophy
} from "lucide-react";

export default function HomePricingModels() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    /* ── Card data — both cards share 100 % identical JSX structure ── */
    const cards = [
        {
            badge: "Recommended for Schools",
            icon: Building2,
            title: "School Branded Platform",
            description: "Make it your school's own — branded with your logo, colours, and domain.",
            features: [
                { icon: Sparkles, text: "Your school's brand identity" },
                { icon: Globe, text: "Custom domain and colour scheme" },
                { icon: Users, text: "School-controlled user management" },
                { icon: BarChart3, text: "School-level analytics and reporting" },
                { icon: Zap, text: "Dedicated onboarding support" },
                { icon: CheckCircle2, text: "Priority support channel" },
            ],
            cta: "Book a School Demo",
            delay: 0.2,
        },
        {
            badge: null,
            icon: Users,
            title: "Subscribe & Use",
            description: "For school strength 1000-4k. Individual students or small groups can subscribe directly.",
            features: [
                { icon: CheckCircle2, text: "Self-registration, instant access" },
                { icon: CheckCircle2, text: "Subscription-based pricing" },
                { icon: Trophy, text: "Access to global leaderboards" },
                { icon: BookOpen, text: "Full NCERT flashcard library" },
                { icon: Zap, text: "AI-powered adaptive revision" },
                { icon: BarChart3, text: "Personal performance dashboard" },
            ],
            cta: "Get Started",
            delay: 0.3,
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-16 md:py-24 overflow-hidden bg-white"
        >
            {/* Subtle background */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(15 23 42) 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
                        <Sparkles className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700 tracking-wide">
                            Flexible Models
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        Choose How Your School
                    </h2>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-600 tracking-tight">
                        Wants to Use Prepdha.
                    </h3>
                </motion.div>

                {/* ── Cards — rendered from the same template, guaranteed identical ── */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
                    {cards.map((card) => {
                        const CardIcon = card.icon;
                        return (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
                                className="relative flex flex-col"
                            >
                                {/* Badge placeholder — occupies same space on both cards */}
                                <div className="h-8 flex items-center justify-center mb-0">
                                    {card.badge && (
                                        <div className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-semibold shadow-lg whitespace-nowrap">
                                            {card.badge}
                                        </div>
                                    )}
                                </div>

                                {/* ── Card shell — 100 % identical classes on both ── */}
                                <div className="flex flex-col flex-1 p-8 rounded-2xl bg-white border-2 border-slate-900 shadow-xl hover:shadow-2xl transition-all duration-300">

                                    {/* Icon */}
                                    <div className="flex justify-center mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center">
                                            <CardIcon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Title & description */}
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                            {card.title}
                                        </h3>
                                        <p className="text-slate-600">
                                            {card.description}
                                        </p>
                                    </div>

                                    {/* Features — always 6 rows, same row style */}
                                    <div className="space-y-3 mb-8 flex-1">
                                        {card.features.map((feature, i) => {
                                            const FeatIcon = feature.icon;
                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                    transition={{ delay: card.delay + 0.2 + i * 0.08 }}
                                                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200"
                                                >
                                                    <FeatIcon className="w-5 h-5 text-slate-900 flex-shrink-0" />
                                                    <span className="text-slate-700">{feature.text}</span>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* CTA button — same style on both */}
                                    <button className="group/btn w-full px-8 py-4 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-700 transition-all duration-300 hover:shadow-lg cursor-pointer">
                                        <span className="flex items-center justify-center gap-2">
                                            {card.cta}
                                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                        </span>
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <p className="text-slate-600">
                        Need a custom solution?{" "}
                        <a href="/contact" className="text-slate-900 font-semibold hover:underline">
                            Contact us
                        </a>{" "}
                        for enterprise pricing
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
