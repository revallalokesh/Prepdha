"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { BookOpen, CheckCircle2, Target, Repeat, BarChart3, ArrowRight } from "lucide-react";
import { ShinyButton } from "./shiny-button";

const steps = [
    {
        number: 1,
        icon: BookOpen,
        title: "NCERT Syllabus",
        description: "Latest chapters loaded, teacher-verified before going live.",
        detail: "100% curriculum aligned",
    },
    {
        number: 2,
        icon: CheckCircle2,
        title: "Chapter Alignment",
        description: "Lesson-by-lesson mapping ensures zero content mismatch.",
        detail: "Perfect synchronization",
    },
    {
        number: 3,
        icon: Target,
        title: "Topic Practice",
        description: "Diverse question types reinforce conceptual clarity, not rote.",
        detail: "Deep understanding",
    },
    {
        number: 4,
        icon: Repeat,
        title: "Smart Revision",
        description: "Spaced repetition flashcards auto-scheduled per student performance.",
        detail: "Proven retention science",
    },
    {
        number: 5,
        icon: BarChart3,
        title: "Measurable Results",
        description: "Live dashboards show academic progress to teachers and administrators.",
        detail: "Real-time insights",
    },
];

export default function HomeHowItWorks() {
    const router = useRouter();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 overflow-hidden bg-slate-50"
        >
            {/* Subtle background */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(to right, rgb(226 232 240) 1px, transparent 1px),
                                     linear-gradient(to bottom, rgb(226 232 240) 1px, transparent 1px)`,
                    backgroundSize: "80px 80px",
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                        <ArrowRight className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700 tracking-wide">
                            How Prepdha Works
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        Built Around Your Syllabus.
                    </h2>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-600 mb-6 tracking-tight">
                        Proven by Learning Science.
                    </h3>
                    <p className="text-lg md:text-xl text-slate-600 mt-6 max-w-3xl mx-auto leading-relaxed">
                        Every step in Prepdha's system is mapped to what your teachers are already teaching,
                        with <span className="text-slate-900 font-semibold">zero additional setup</span> required from your faculty.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 max-w-6xl mx-auto">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isHovered = hoveredStep === index;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                onHoverStart={() => setHoveredStep(index)}
                                onHoverEnd={() => setHoveredStep(null)}
                                className="relative group"
                            >
                                {/* Connection line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-slate-200">
                                        <motion.div
                                            className="h-full bg-slate-900"
                                            initial={{ width: "0%" }}
                                            animate={isInView ? { width: "100%" } : {}}
                                            transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
                                        />
                                    </div>
                                )}

                                {/* Step number */}
                                <div className="flex justify-center mb-6">
                                    <motion.div
                                        className="relative w-16 h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm group-hover:border-slate-900 group-hover:shadow-lg transition-all duration-300"
                                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                                    >
                                        <span className="text-xl font-bold text-slate-900">
                                            {step.number}
                                        </span>
                                    </motion.div>
                                </div>

                                {/* Card */}
                                <div className="p-6 rounded-xl bg-white border border-slate-200 group-hover:border-slate-300 group-hover:shadow-lg transition-all duration-300">
                                    {/* Icon */}
                                    <div className="flex justify-center mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 transition-all duration-300">
                                            <Icon className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-base font-bold text-slate-900 text-center mb-2 leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 text-center mb-3 leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Detail badge */}
                                    <div className="flex justify-center">
                                        <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                                            {step.detail}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <ShinyButton
                        onClick={() => router.push("/product")}
                    >
                        <span className="flex items-center gap-2">
                            See It In Action
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </ShinyButton>
                </motion.div>
            </div>
        </section>
    );
}
