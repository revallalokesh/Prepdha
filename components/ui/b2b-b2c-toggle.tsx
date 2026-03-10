"use client";
import React, { useState } from "react";
import { Building2, Globe, Shield, Users, Award, Palette, BarChart3, Zap } from "lucide-react";

export default function B2BB2CToggle() {
    const [mode, setMode] = useState<"b2b" | "b2c">("b2b");

    const isB2B = mode === "b2b";

    return (
        <section className="relative min-h-screen flex items-center py-16 md:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">Hybrid Deployment</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                        One Platform. <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Two Worlds</span>.
                    </h2>
                    <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto">
                        Toggle between B2B institutional and B2C individual modes to see how we serve both markets
                    </p>
                </div>

                {/* Toggle Switch */}
                <div className="flex justify-center mb-12">
                    <div className="relative inline-flex flex-col sm:flex-row items-center p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm w-full sm:w-auto">
                        <button
                            onClick={() => setMode("b2b")}
                            className={`relative z-10 flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 w-full sm:w-auto ${isB2B ? "text-white" : "text-slate-400 hover:text-slate-300"
                                }`}
                        >
                            <Building2 className="w-5 h-5 md:w-6 md:h-6" />
                            <span>B2B Mode</span>
                        </button>
                        <button
                            onClick={() => setMode("b2c")}
                            className={`relative z-10 flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 w-full sm:w-auto ${!isB2B ? "text-white" : "text-slate-400 hover:text-slate-300"
                                }`}
                        >
                            <Globe className="w-5 h-5 md:w-6 md:h-6" />
                            <span>B2C Mode</span>
                        </button>
                        <div
                            className={`absolute transition-all duration-500 rounded-xl bg-gradient-to-r ${isB2B
                                ? "sm:left-2 top-2 sm:top-2 h-[calc(50%-8px)] sm:h-[calc(100%-16px)] w-[calc(100%-16px)] sm:w-[calc(50%-8px)] from-cyan-500 to-blue-500"
                                : "sm:left-[calc(50%+4px)] top-[calc(50%+4px)] sm:top-2 h-[calc(50%-8px)] sm:h-[calc(100%-16px)] w-[calc(100%-16px)] sm:w-[calc(50%-8px)] from-purple-500 to-pink-500"
                                }`}
                            style={{ boxShadow: isB2B ? "0 8px 30px rgba(6,182,212,0.4)" : "0 8px 30px rgba(168,85,247,0.4)" }}
                        />
                    </div>
                </div>

                {/* Dashboard Mockup */}
                <div className="max-w-6xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-700">
                        {/* Top Bar */}
                        <div className={`p-4 md:p-6 border-b border-white/10 transition-all duration-700 ${isB2B ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20" : "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                            }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {isB2B ? (
                                        <>
                                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                                                <span className="text-2xl">🏫</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-white">Delhi Public School</h3>
                                                <p className="text-sm text-cyan-400 font-semibold">White-Label Branded</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                                                <Globe className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-white">Prepdha.ai</h3>
                                                <p className="text-sm text-purple-400 font-semibold">Direct Student Access</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className={`px-4 py-2 rounded-xl font-bold text-sm ${isB2B ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                    }`}>
                                    {isB2B ? "Institutional" : "Individual"}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8">
                            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                                {isB2B ? (
                                    <>
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                                    <Palette className="w-5 h-5 text-cyan-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">Custom Branding</h4>
                                                    <p className="text-xs text-slate-400">Logo, colors, domain</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                                    <div className="w-4 h-4 rounded bg-blue-500" />
                                                    <span>Primary: #0066CC</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                                    <div className="w-4 h-4 rounded bg-orange-500" />
                                                    <span>Secondary: #FF6600</span>
                                                </div>
                                                <div className="text-xs text-cyan-400 font-semibold mt-3">
                                                    ✓ learn.dpsdelhi.edu.in
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                                    <BarChart3 className="w-5 h-5 text-blue-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">Principal Dashboard</h4>
                                                    <p className="text-xs text-slate-400">Institution-wide analytics</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-400">Total Students</span>
                                                    <span className="text-white font-bold">540</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-400">Avg Performance</span>
                                                    <span className="text-green-400 font-bold">85%</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-400">Active Classes</span>
                                                    <span className="text-white font-bold">12</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                                    <Shield className="w-5 h-5 text-purple-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">Access Control</h4>
                                                    <p className="text-xs text-slate-400">School-managed users</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm text-slate-300">
                                                <div>✓ Admin-controlled enrollment</div>
                                                <div>✓ Role-based permissions</div>
                                                <div>✓ Bulk user management</div>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                                    <Users className="w-5 h-5 text-green-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">School Leaderboard</h4>
                                                    <p className="text-xs text-slate-400">Internal competition</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                {["Rahul K. - 2,450 XP", "Priya S. - 2,380 XP", "Arjun M. - 2,310 XP"].map((student, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                                        <span className="text-yellow-400 font-bold">#{i + 1}</span>
                                                        <span>{student}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                                    <Globe className="w-5 h-5 text-purple-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">Self-Registration</h4>
                                                    <p className="text-xs text-slate-400">No school required</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm text-slate-300">
                                                <div>✓ Sign up with email/phone</div>
                                                <div>✓ Choose your curriculum</div>
                                                <div>✓ Start learning immediately</div>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                                                    <Award className="w-5 h-5 text-pink-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">Global Leaderboard</h4>
                                                    <p className="text-xs text-slate-400">Compete worldwide</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                {["Alex M. - India - 5,450 XP", "Sarah K. - USA - 5,380 XP", "Yuki T. - Japan - 5,310 XP"].map((student, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                                        <span className="text-yellow-400 font-bold">#{i + 1}</span>
                                                        <span>{student}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                                    <Zap className="w-5 h-5 text-cyan-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">AI Personalization</h4>
                                                    <p className="text-xs text-slate-400">Adaptive learning</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm text-slate-300">
                                                <div>✓ Custom revision schedules</div>
                                                <div>✓ Weakness identification</div>
                                                <div>✓ Performance predictions</div>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                                    <Globe className="w-5 h-5 text-blue-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">Cross-Device Sync</h4>
                                                    <p className="text-xs text-slate-400">Learn anywhere</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm text-slate-300">
                                                <div>✓ Mobile, tablet, desktop</div>
                                                <div>✓ Real-time synchronization</div>
                                                <div>✓ Offline mode available</div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Statement */}
                <div className="mt-16 text-center">
                    <div className={`inline-block p-6 md:p-8 rounded-2xl md:rounded-3xl text-white shadow-2xl transition-all duration-700 ${isB2B ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gradient-to-r from-purple-500 to-pink-500"
                        }`}>
                        <p className="text-xl md:text-2xl lg:text-3xl font-black">
                            {isB2B ? "White-label for institutions." : "Direct access for individuals."}
                        </p>
                        <p className="text-base md:text-lg opacity-90 mt-2">
                            Same powerful engine, different deployment models
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
