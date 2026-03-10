"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { AlertCircle, TrendingDown, Brain, Calendar, Layers } from "lucide-react";

const problems = [
    {
        number: "01",
        icon: Layers,
        title: "Foundational Gaps Carry Forward",
        description: "When core NCERT concepts aren't retained in earlier chapters, students build on shaky foundations — compounding confusion as the syllabus progresses.Teachers only discover this at exam time.",
    },
    {
        number: "02",
        icon: Brain,
        title: "Rote Learning Masking Weak Conceptual Recall",
        description: "Students pass unit tests through memorisation but can't apply concepts in board-style questions. Schools have no visibility into whether conceptual understanding is actually forming.",
    },
    {
        number: "03",
        icon: Calendar,
        title: "Revision Is Unplanned and Untracked",
        description: "Without structured revision scheduling, students revisit topics randomly — often too late.  Teachers have no data on revision compliance and administrators can't identify at-risk students early.",
    },
    {
        number: "04",
        icon: TrendingDown,
        title: "Content Overload Creates Academic Anxiety",
        description: "Too many platforms, too many videos, not enough direction. Students feel overwhelmed rather than prepared.  The chaos signals to parents that the school lacks academic structure. ",
    },
];

export default function HomeProblemSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <section
            ref={sectionRef}
            className="relative py-16 md:py-24 overflow-hidden bg-white"
        >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(15 23 42) 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
                        <AlertCircle className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700 tracking-wide">
                            The Real Problem
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        Your Students Have Content.
                    </h2>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-600 mb-6 tracking-tight">
                        They're Missing a System.
                    </h3>
                    <p className="text-lg md:text-xl text-slate-600 mt-6 max-w-3xl mx-auto leading-relaxed">
                        YouTube, PDFs, and traditional EdTech platforms are flooding students with more content,
                        increasing stress. CBSE schools need a{" "}
                        <span className="text-slate-900 font-semibold">structured alternative</span>, not more material.
                    </p>
                </motion.div>

                {/* Problem Cards - Clean Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {problems.map((problem, index) => {
                        const Icon = problem.icon;
                        const isHovered = hoveredCard === index;

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
                                onHoverStart={() => setHoveredCard(index)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className="group"
                            >
                                <div className="relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50">
                                    {/* Number badge */}
                                    <div className="absolute top-6 right-6">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-sm group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                                            {problem.number}
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className="mb-6">
                                        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 transition-all duration-300">
                                            <Icon className="w-7 h-7 text-slate-600 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 pr-12 leading-tight">
                                        {problem.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {problem.description}
                                    </p>

                                    {/* Subtle indicator */}
                                    <motion.div
                                        className="mt-6 h-0.5 bg-slate-200 rounded-full overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <motion.div
                                            className="h-full bg-slate-900"
                                            initial={{ width: "0%" }}
                                            animate={isHovered ? { width: "100%" } : { width: "0%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
