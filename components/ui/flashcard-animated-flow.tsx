"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Plus, Check, ArrowLeft, ArrowRight, Edit2, Trash2, X } from "lucide-react";

export default function FlashcardAnimatedFlow() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Auto-advance through steps every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prev) => {
                const next = (prev + 1) % 6;
                if (next === 4) setIsFlipped(false); // Reset flip when entering review
                return next;
            });
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Auto-flip card in review step
    useEffect(() => {
        if (currentStep === 4) {
            const flipTimer = setTimeout(() => {
                setIsFlipped(true);
            }, 2000);
            return () => clearTimeout(flipTimer);
        }
    }, [currentStep]);

    const steps = [
        { id: 0, name: "Choose Method" },
        { id: 1, name: "Manual Entry" },
        { id: 2, name: "AI Generation" },
        { id: 3, name: "Generated Cards" },
        { id: 4, name: "Review" },
        { id: 5, name: "Spaced Repetition" },
    ];

    return (
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Flashcard System: Complete Workflow
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                        Auto-generated from mistakes • Manual creation • AI-powered • Spaced repetition
                    </p>
                </motion.div>

                {/* Progress Indicator */}
                <div className="flex justify-center gap-2 mb-10">
                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center gap-2">
                            <div
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${currentStep === step.id
                                        ? "bg-blue-600 scale-150 shadow-lg shadow-blue-400"
                                        : currentStep > step.id
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                    }`}
                            />
                            <span className={`text-xs transition-all duration-500 hidden md:block ${currentStep === step.id ? "text-blue-600 font-bold" : "text-gray-400"
                                }`}>
                                {step.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Main Demo Container - Mimics actual app interface */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Phone/App Frame */}
                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 md:border-8 border-gray-800">
                        {/* App Header Bar */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white font-bold text-lg">Flashcards</span>
                            </div>
                            <button className="text-white/80 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="min-h-[600px] bg-gray-50">
                            <AnimatePresence mode="wait">
                                {/* STEP 0: Initial Choice Screen */}
                                {currentStep === 0 && (
                                    <motion.div
                                        key="step0"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.6 }}
                                        className="p-8 md:p-12"
                                    >
                                        <h3 className="text-2xl md:text-3xl font-bold text-center mb-3 text-gray-800">
                                            Create Flashcards
                                        </h3>
                                        <p className="text-center text-gray-500 mb-10">Choose your preferred method</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                                            <motion.div
                                                initial={{ x: -50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 text-white cursor-pointer shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                                            >
                                                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                    <Sparkles className="w-8 h-8" />
                                                </div>
                                                <h4 className="text-xl font-bold mb-2">Generate via AI</h4>
                                                <p className="text-purple-100 text-sm leading-relaxed">
                                                    Let AI create flashcards from any topic with customizable difficulty levels
                                                </p>
                                            </motion.div>

                                            <motion.div
                                                initial={{ x: 50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="group p-8 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 text-white cursor-pointer shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                                            >
                                                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                    <Plus className="w-8 h-8" />
                                                </div>
                                                <h4 className="text-xl font-bold mb-2">Generate Yourself</h4>
                                                <p className="text-blue-100 text-sm leading-relaxed">
                                                    Manually create custom flashcards from your study material
                                                </p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 1: Manual Creation Interface */}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.5 }}
                                        className="p-8 md:p-12"
                                    >
                                        <div className="flex items-center gap-3 mb-8">
                                            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                                            </button>
                                            <h3 className="text-2xl font-bold text-gray-800">Create Flashcard</h3>
                                        </div>

                                        <div className="max-w-2xl mx-auto space-y-6">
                                            {/* Card Preview */}
                                            <div className="p-6 rounded-xl bg-white border-2 border-blue-200 shadow-lg">
                                                <div className="mb-6">
                                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                                        Question
                                                    </label>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ delay: 0.3, duration: 1 }}
                                                        className="text-lg text-gray-800 font-medium"
                                                    >
                                                        What is photosynthesis?
                                                    </motion.div>
                                                </div>

                                                <div className="border-t-2 border-gray-100 pt-6">
                                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                                        Answer
                                                    </label>
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.8, duration: 0.8 }}
                                                        className="text-gray-700 leading-relaxed"
                                                    >
                                                        The process by which green plants convert light energy into chemical energy, producing glucose and oxygen from carbon dioxide and water.
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 1.5 }}
                                                className="flex flex-col sm:flex-row gap-4"
                                            >
                                                <button className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                                                    <Plus className="w-5 h-5" />
                                                    Add Another Card
                                                </button>
                                                <button className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                                                    <Check className="w-5 h-5" />
                                                    Finish
                                                </button>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2: AI Generation Modal */}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        className="p-8 md:p-12"
                                    >
                                        <div className="flex items-center gap-3 mb-8">
                                            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                                            </button>
                                            <h3 className="text-2xl font-bold text-gray-800">AI Flashcard Generator</h3>
                                        </div>

                                        <div className="max-w-2xl mx-auto space-y-6">
                                            {/* Topic Input */}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                                    Topic
                                                </label>
                                                <motion.input
                                                    initial={{ scale: 0.95 }}
                                                    animate={{ scale: 1 }}
                                                    type="text"
                                                    value="Photosynthesis - Light Reactions"
                                                    className="w-full p-4 rounded-xl border-2 border-purple-200 bg-white focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all font-medium text-gray-800"
                                                    readOnly
                                                />
                                            </div>

                                            {/* Difficulty Level */}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                                    Difficulty Level
                                                </label>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    {["Easy", "Medium", "Hard", "Tricky"].map((level, idx) => (
                                                        <motion.button
                                                            key={level}
                                                            initial={{ y: 20, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            transition={{ delay: 0.1 * idx }}
                                                            className={`py-3 px-4 rounded-xl font-bold transition-all ${level === "Medium"
                                                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                                                                    : "bg-white border-2 border-gray-200 text-gray-600 hover:border-purple-300"
                                                                }`}
                                                        >
                                                            {level}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Instructions */}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                                    Additional Instructions (Optional)
                                                </label>
                                                <textarea
                                                    value="Focus on the light-dependent reactions and electron transport chain"
                                                    className="w-full p-4 rounded-xl border-2 border-purple-200 bg-white focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all h-24 resize-none text-gray-700"
                                                    readOnly
                                                />
                                            </div>

                                            {/* Generate Button */}
                                            <motion.button
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                                            >
                                                <Sparkles className="w-5 h-5" />
                                                Generate Flashcards with AI
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3: Generated Cards Display */}
                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        transition={{ duration: 0.5 }}
                                        className="p-8 md:p-12"
                                    >
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-2xl font-bold text-gray-800">Generated Flashcards</h3>
                                            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                                                5 Cards Created
                                            </span>
                                        </div>

                                        <div className="max-w-3xl mx-auto space-y-4">
                                            {[
                                                {
                                                    q: "What happens during the light-dependent reactions of photosynthesis?",
                                                    a: "Light energy is captured by chlorophyll and converted into chemical energy (ATP and NADPH)"
                                                },
                                                {
                                                    q: "Where do the light-dependent reactions occur?",
                                                    a: "In the thylakoid membranes of the chloroplasts"
                                                },
                                                {
                                                    q: "What are the main products of the light reactions?",
                                                    a: "ATP, NADPH, and oxygen (O₂)"
                                                }
                                            ].map((card, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ x: -50, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.2 * idx }}
                                                    className="p-6 rounded-xl bg-white border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                                                            {idx + 1}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-bold text-gray-800 mb-2">Q: {card.q}</div>
                                                            <div className="text-gray-600 text-sm">A: {card.a}</div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.button
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.8 }}
                                            className="w-full max-w-3xl mx-auto mt-6 py-4 px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                                        >
                                            <Check className="w-5 h-5" />
                                            Save All Flashcards
                                        </motion.button>
                                    </motion.div>
                                )}

                                {/* STEP 4: Review Interface with Flip */}
                                {currentStep === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="p-8 md:p-12"
                                    >
                                        <div className="flex justify-between items-center mb-8">
                                            <button className="p-3 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all">
                                                <ArrowLeft className="w-6 h-6 text-gray-600" />
                                            </button>
                                            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold">
                                                Card 1 of 10
                                            </span>
                                            <button className="p-3 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all">
                                                <ArrowRight className="w-6 h-6 text-gray-600" />
                                            </button>
                                        </div>

                                        {/* Flip Card */}
                                        <div className="max-w-2xl mx-auto perspective-1000">
                                            <motion.div
                                                className="relative h-96 cursor-pointer"
                                                style={{ transformStyle: "preserve-3d" }}
                                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                {/* Front Side - Question */}
                                                <div
                                                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white p-6 md:p-10 flex flex-col items-center justify-center text-center shadow-2xl"
                                                    style={{ backfaceVisibility: "hidden" }}
                                                >
                                                    <div className="text-sm font-bold mb-4 opacity-80 uppercase tracking-wider">
                                                        Question
                                                    </div>
                                                    <div className="text-2xl md:text-3xl font-bold leading-relaxed">
                                                        What is the primary function of chlorophyll in photosynthesis?
                                                    </div>
                                                    <div className="mt-8 text-sm opacity-70">
                                                        Tap to reveal answer
                                                    </div>
                                                </div>

                                                {/* Back Side - Answer */}
                                                <div
                                                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 text-white p-6 md:p-10 flex flex-col items-center justify-center text-center shadow-2xl"
                                                    style={{
                                                        backfaceVisibility: "hidden",
                                                        transform: "rotateY(180deg)"
                                                    }}
                                                >
                                                    <div className="text-sm font-bold mb-4 opacity-80 uppercase tracking-wider">
                                                        Answer
                                                    </div>
                                                    <div className="text-xl md:text-2xl font-bold leading-relaxed">
                                                        To absorb light energy (primarily blue and red wavelengths) and convert it into chemical energy during the light-dependent reactions.
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Edit/Delete Actions */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="flex justify-center gap-4 mt-8"
                                        >
                                            <button className="p-4 rounded-xl bg-blue-100 hover:bg-blue-200 transition-all group">
                                                <Edit2 className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                                            </button>
                                            <button className="p-4 rounded-xl bg-red-100 hover:bg-red-200 transition-all group">
                                                <Trash2 className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                                            </button>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* STEP 5: Spaced Repetition Buttons */}
                                {currentStep === 5 && (
                                    <motion.div
                                        key="step5"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5 }}
                                        className="p-8 md:p-12"
                                    >
                                        <div className="text-center mb-10">
                                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                                                How well did you know this?
                                            </h3>
                                            <p className="text-gray-600">
                                                Based on <span className="font-semibold text-purple-600">Ebbinghaus Forgetting Curve</span>
                                            </p>
                                        </div>

                                        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {[
                                                { emoji: "😰", label: "Hard", time: "1 min", color: "from-red-500 to-orange-500", delay: 0 },
                                                { emoji: "🤔", label: "Good", time: "1 min", color: "from-yellow-500 to-amber-500", delay: 0.1 },
                                                { emoji: "😊", label: "Easy", time: "Next Time", color: "from-green-500 to-emerald-500", delay: 0.2 },
                                                { emoji: "🎯", label: "I Know This", time: "Complete", color: "from-blue-500 to-purple-500", delay: 0.3 }
                                            ].map((btn) => (
                                                <motion.button
                                                    key={btn.label}
                                                    initial={{ y: 50, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: btn.delay }}
                                                    className={`p-6 rounded-2xl bg-gradient-to-br ${btn.color} text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all`}
                                                >
                                                    <div className="text-4xl mb-3">{btn.emoji}</div>
                                                    <div className="text-lg font-bold mb-1">{btn.label}</div>
                                                    <div className="text-sm opacity-90">{btn.time}</div>
                                                </motion.button>
                                            ))}
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                            className="mt-10 text-center text-sm text-gray-500"
                                        >
                                            Your response determines when you'll see this card again
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Auto-play indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 text-center text-sm text-gray-500"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            Auto-playing demonstration • Cycles every 5 seconds
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
