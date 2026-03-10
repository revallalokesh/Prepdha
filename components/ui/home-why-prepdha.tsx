"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Zap, BookOpen, TrendingUp, Shield, CheckCircle2 } from "lucide-react";

const reasons = [
    {
        number: "01",
        icon: Users,
        title: "Zero Additional Load on Teachers",
        description: "Prepdha automates revision scheduling, flashcard creation, and performance tracking. Teachers get insights without doing any extra data entry or content creation.",
    },
    {
        number: "02",
        icon: BookOpen,
        title: "Aligned to What You're Already Teaching",
        description: "Every lesson is mapped to the latest NCERT syllabus and verified by subject teachers before going live. No content mismatch. No confusion for students.",
    },
    {
        number: "03",
        icon: Zap,
        title: "Ready to Go From Day One",
        description: "Preloaded with NCERT lessons and pre-configured for CBSE schools. No lengthy implementation. No complex setup. Your school can go live within days.",
    },
    {
        number: "04",
        icon: TrendingUp,
        title: "Learning Science That Actually Works",
        description: "Spaced repetition and active recall are the most evidence-backed methods for long-term retention. Prepdha isn't another content platform — it's a retention system.",
    },
    {
        number: "05",
        icon: Award,
        title: "Results You Can Show Parents and Boards",
        description: "Prepdha gives school leadership the academic performance data they need to demonstrate outcomes — to parents, to trustees, and to inspection bodies.",
    },
    {
        number: "06",
        icon: Shield,
        title: "Secure, Scalable Infrastructure",
        description: "Built to handle an entire school — or an entire chain of schools. Enterprise-grade security and uptime your school can depend on year-round.",
    },
];

export default function HomeWhyPrepdha() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section
            ref={sectionRef}
            className="relative py-16 md:py-24 overflow-hidden bg-slate-50"
        >
            {/* Subtle background */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(to right, rgb(226 232 240) 1px, transparent 1px),
                                     linear-gradient(to bottom, rgb(226 232 240) 1px, transparent 1px)`,
                    backgroundSize: "80px 80px",
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                        <CheckCircle2 className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700 tracking-wide">
                            Why Schools Choose Prepdha
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        Built for Schools That Want Results,
                    </h2>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-600 tracking-tight">
                        Not More Work.
                    </h3>
                </motion.div>

                {/* Reasons Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="group"
                            >
                                <div className="relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 h-full">
                                    {/* Number badge */}
                                    <div className="absolute top-6 right-6">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-sm group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                                            {reason.number}
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
                                        {reason.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {reason.description}
                                    </p>

                                    {/* Subtle indicator */}
                                    <div className="mt-6 h-0.5 bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-slate-900"
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: "100%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
