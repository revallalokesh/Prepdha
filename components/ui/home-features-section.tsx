"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CircularTestimonials } from "./circular-testimonials";

/* ─────────────────────────────────────────────────────────────────
   Feature data — bullets now live here and are passed straight
   into CircularTestimonials, which renders them below the quote.
───────────────────────────────────────────────────────────────── */
const featuresData = [
    {
        name: "Smart Flashcards & Spaced Revision",
        designation: "Learn Once, Remember Forever",
        quote: "When a student answers incorrectly, a flashcard is automatically created and scheduled using spaced repetition, the most evidence-backed method for long-term retention.",
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bullets: [
            "Incorrect answers auto-generate flashcards",
            "Revision scheduling adapts to each student's recall pattern",
            "Students can create personal revision cards",
            "Compliance reports available for teachers",
        ],
    },
    {
        name: "Engagement Without Distraction",
        designation: "Motivation Meets Mastery",
        quote: "Structured gamification keeps students motivated while maintaining academic rigour. Every XP point, streak, and leaderboard position is tied directly to NCERT outcomes.",
        src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bullets: [
            "XP earned for completing NCERT topics",
            "Accuracy-based point system rewards understanding",
            "Class and school leaderboards drive healthy competition",
            "Streaks build consistent study habits",
        ],
    },
    {
        name: "Academic Visibility for Every Stakeholder",
        designation: "Complete Transparency, Real-Time Insights",
        quote: "For the first time, your school gets a complete, real-time view of academic performance — from individual student gaps to class-level trends to subject-wide weaknesses — all in one place. Give your management board the data they need. Give teachers the insights to intervene early.",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bullets: [
            "Students see their own subject-wise progress and weak areas",
            "Teachers get individual student analytics and learning gap identification",
            "Principals see class comparisons, section performance, and revision compliance",
        ],
    },
];

export default function HomeFeaturesSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section
            ref={sectionRef}
            className="relative py-16 md:py-24 overflow-hidden bg-[#f7f7fa]"
        >
            {/* Subtle background dot grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(15 23 42) 1px, transparent 0)`,
                        backgroundSize: "64px 64px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 mb-6 shadow-sm">
                        <Sparkles className="w-4 h-4 text-violet-600" />
                        <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
                            Platform Features
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tight">
                        Everything Your School Needs.
                    </h2>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-600 tracking-tight">
                        ALL IN ONE APP!
                    </h3>
                </motion.div>

                {/* ── Carousel — bullets now embedded inside it ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="w-full flex justify-center"
                >
                    <CircularTestimonials
                        testimonials={featuresData}
                        autoplay={true}
                        colors={{
                            name: "#0f172a",
                            designation: "#6366f1",
                            testimony: "#475569",
                            arrowBackground: "#0f172a",
                            arrowForeground: "#f8fafc",
                            arrowHoverBackground: "#6366f1",
                        }}
                        fontSizes={{
                            name: "clamp(1.5rem, 4vw, 2.5rem)",
                            designation: "clamp(0.875rem, 2vw, 1.125rem)",
                            quote: "clamp(0.9rem, 2vw, 1.125rem)",
                        }}
                    />
                </motion.div>

            </div>
        </section>
    );
}
