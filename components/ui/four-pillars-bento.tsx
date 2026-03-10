"use client";
import React, { useState, useEffect } from "react";
import { Brain, MessageSquare, Building2, BarChart3, TrendingUp, Sparkles, CheckCircle2, Target, Zap } from "lucide-react";

const pillars = [
    {
        title: "Engineering Retention",
        subtitle: "Active Recall + Spaced Repetition",
        description: "We prioritize long-term mastery over mere exposure by using Active Recall and Spaced Repetition to move knowledge into durable understanding.",
        icon: Brain,
        color: "cyan",
        gradient: "from-cyan-500 to-blue-500"
    },
    {
        title: "Institutional Empowerment",
        subtitle: "White-Labeled Control Tower",
        description: "We provide schools with a white-labeled 'Control Tower'—a live view of every class and learner so administrators can act before gaps become failures.",
        icon: Building2,
        color: "purple",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        title: "Contextual AI Mentorship",
        subtitle: "Curriculum-Grounded Intelligence",
        description: "Our AI Doubt Solver isn't generic; it is grounded in your specific curriculum to provide step-by-step logic, not just easy answers.",
        icon: MessageSquare,
        color: "indigo",
        gradient: "from-indigo-500 to-blue-500"
    },
    {
        title: "Measurable Academic Rigor",
        subtitle: "Every Interaction = Data Point",
        description: "We turn every interaction—assessment, revision, and doubt—into a data point to create truly transparent learning outcomes.",
        icon: BarChart3,
        color: "emerald",
        gradient: "from-emerald-500 to-teal-500"
    }
];

export default function FourPillarsBento() {
    const [forgettingCurve, setForgettingCurve] = useState(0);
    const [showCorrection, setShowCorrection] = useState(false);
    const [chatMessages, setChatMessages] = useState<Array<{ role: string; text: string }>>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [activePillar, setActivePillar] = useState(0);

    // Forgetting Curve Animation
    useEffect(() => {
        const interval = setInterval(() => {
            setForgettingCurve((prev) => {
                if (prev >= 100) {
                    setShowCorrection(true);
                    setTimeout(() => {
                        setShowCorrection(false);
                        return 0;
                    }, 2000);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);
        return () => clearInterval(interval);
    }, []);

    // AI Chat Simulation
    useEffect(() => {
        const sequence = [
            { role: "student", text: "Why does photosynthesis require light?", delay: 1000 },
            { role: "ai", text: "Light energy powers the light-dependent reactions in chloroplast thylakoid membranes. This splits water molecules (photolysis) and generates ATP and NADPH for the Calvin cycle. This is covered in Chapter 13, Section 2 of your NCERT Biology curriculum.", delay: 3000 },
        ];

        let timeouts: NodeJS.Timeout[] = [];
        let currentDelay = 0;

        sequence.forEach((msg) => {
            currentDelay += msg.delay;
            const timeout = setTimeout(() => {
                if (msg.role === "ai") setIsTyping(true);
                setTimeout(() => {
                    setChatMessages((prev) => [...prev, msg]);
                    setIsTyping(false);
                }, msg.role === "ai" ? 1500 : 0);
            }, currentDelay);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <section className="relative w-full py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                        <Target className="w-4 h-4 text-cyan-600" />
                        <span className="text-xs font-mono text-cyan-600 tracking-widest uppercase">The Mission</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
                        The Four Pillars of <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Prepdha</span>
                    </h2>
                    <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
                        Our core commitments that transform learning from passive to active
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pillars.map((pillar, index) => {
                        const Icon = pillar.icon;
                        const isActive = activePillar === index;

                        return (
                            <div
                                key={pillar.title}
                                onClick={() => setActivePillar(index)}
                                className={`group relative rounded-3xl overflow-hidden border-2 p-8 cursor-pointer transition-all duration-500 ${isActive
                                        ? `border-${pillar.color}-500 bg-gradient-to-br from-${pillar.color}-50 to-white shadow-2xl scale-[1.02]`
                                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg'
                                    }`}
                            >
                                <div className="relative z-10">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-black text-slate-900 mb-1">{pillar.title}</h3>
                                            <p className={`text-sm font-semibold text-${pillar.color}-600`}>{pillar.subtitle}</p>
                                        </div>
                                    </div>

                                    <p className="text-slate-700 leading-relaxed mb-6">
                                        {pillar.description}
                                    </p>

                                    {/* Interactive Visualization */}
                                    {index === 0 && (
                                        <div className="relative h-48 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                            <div className="absolute top-4 left-4 text-xs text-cyan-600 font-mono font-bold">Retention %</div>
                                            <div className="absolute bottom-4 right-4 text-xs text-cyan-600 font-mono font-bold">Time</div>

                                            <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
                                                <path
                                                    d={`M 10 20 Q 80 ${20 + forgettingCurve * 0.8} 150 ${20 + forgettingCurve}`}
                                                    fill="none"
                                                    stroke="rgba(239, 68, 68, 0.6)"
                                                    strokeWidth="3"
                                                    strokeDasharray="5,5"
                                                />

                                                {showCorrection && (
                                                    <>
                                                        <circle cx="150" cy={20 + forgettingCurve} r="8" fill="#06b6d4" className="animate-ping" />
                                                        <circle cx="150" cy={20 + forgettingCurve} r="5" fill="#06b6d4" />
                                                        <path
                                                            d={`M 150 ${20 + forgettingCurve} Q 200 ${20 + forgettingCurve * 0.3} 250 25`}
                                                            fill="none"
                                                            stroke="#06b6d4"
                                                            strokeWidth="4"
                                                        />
                                                        <text x="160" y={20 + forgettingCurve - 10} fill="#06b6d4" fontSize="12" fontWeight="bold">
                                                            Spaced Repetition
                                                        </text>
                                                    </>
                                                )}
                                            </svg>
                                        </div>
                                    )}

                                    {index === 1 && (
                                        <div className="relative h-48 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                                            <div className="grid grid-cols-2 gap-3 h-full">
                                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                                                    <div className="text-xs text-purple-600 font-semibold mb-2">Section A</div>
                                                    <div className="text-3xl font-black text-slate-900 mb-1">87%</div>
                                                    <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                                                        <TrendingUp className="w-3 h-3" />
                                                        <span>+12%</span>
                                                    </div>
                                                </div>
                                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                                                    <div className="text-xs text-purple-600 font-semibold mb-2">Section B</div>
                                                    <div className="text-3xl font-black text-slate-900 mb-1">92%</div>
                                                    <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                                                        <TrendingUp className="w-3 h-3" />
                                                        <span>+8%</span>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 bg-purple-50 rounded-xl p-4 border border-purple-200">
                                                    <div className="text-xs text-purple-600 font-semibold mb-2">At-Risk Students</div>
                                                    <div className="space-y-1">
                                                        {["Rahul K. - Math", "Priya S. - Physics"].map((name, i) => (
                                                            <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                                                                <Zap className="w-3 h-3 text-orange-500" />
                                                                <span>{name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {index === 2 && (
                                        <div className="relative h-48 bg-slate-50 rounded-2xl p-4 border border-slate-200 overflow-y-auto">
                                            <div className="space-y-3">
                                                {chatMessages.map((msg, i) => (
                                                    <div key={i} className={`flex ${msg.role === "student" ? "justify-end" : "justify-start"}`}>
                                                        <div className={`max-w-[85%] p-3 rounded-2xl text-xs ${msg.role === "student" ? "bg-indigo-100 text-indigo-900 border border-indigo-200" : "bg-cyan-100 text-cyan-900 border border-cyan-200"}`}>
                                                            {msg.text}
                                                        </div>
                                                    </div>
                                                ))}
                                                {isTyping && (
                                                    <div className="flex justify-start">
                                                        <div className="bg-cyan-100 border border-cyan-200 p-3 rounded-2xl">
                                                            <div className="flex gap-1">
                                                                <div className="w-2 h-2 rounded-full bg-cyan-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                                                                <div className="w-2 h-2 rounded-full bg-cyan-600 animate-bounce" style={{ animationDelay: "150ms" }} />
                                                                <div className="w-2 h-2 rounded-full bg-cyan-600 animate-bounce" style={{ animationDelay: "300ms" }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {index === 3 && (
                                        <div className="relative h-48 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-emerald-600 font-semibold">Questions Attempted</span>
                                                    <span className="text-sm font-black text-slate-900">1,247</span>
                                                </div>
                                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: "85%" }} />
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <span className="text-xs text-emerald-600 font-semibold">Accuracy Rate</span>
                                                    <span className="text-sm font-black text-slate-900">89.3%</span>
                                                </div>
                                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: "89%" }} />
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <span className="text-xs text-emerald-600 font-semibold">Retention Score</span>
                                                    <span className="text-sm font-black text-slate-900">94.1%</span>
                                                </div>
                                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 animate-pulse" style={{ width: "94%" }} />
                                                </div>

                                                <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                                                    <div className="text-xs text-emerald-600 font-semibold mb-1">AI Analysis</div>
                                                    <div className="text-xs text-slate-700 font-medium">Strong in Biology, needs focus on Organic Chemistry</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Click indicator */}
                                <div className={`absolute bottom-4 right-4 text-xs font-semibold transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                                    <span className={`text-${pillar.color}-600`}>● Active</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
