"use client";
import React, { useState } from "react";
import { User, Users, Building2, TrendingUp, Target, Award, BarChart3, AlertCircle } from "lucide-react";

type Role = "student" | "teacher" | "principal";

export default function CommandCenterSwitcher() {
    const [activeRole, setActiveRole] = useState<Role>("student");

    const roles = [
        { id: "student" as Role, label: "Student", icon: User, color: "cyan" },
        { id: "teacher" as Role, label: "Teacher", icon: Users, color: "purple" },
        { id: "principal" as Role, label: "Principal", icon: Building2, color: "orange" }
    ];

    const dashboards = {
        student: {
            title: "Student Dashboard",
            subtitle: "Gamified Learning Experience",
            features: [
                { icon: Target, label: "XP Progress", value: "2,450 XP", color: "cyan" },
                { icon: Award, label: "Rank", value: "#12 in School", color: "yellow" },
                { icon: TrendingUp, label: "Streak", value: "7 days", color: "green" },
                { icon: BarChart3, label: "Accuracy", value: "89%", color: "blue" }
            ],
            visual: (
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-cyan-700">Today&apos;s Revision Queue</span>
                            <span className="text-xs font-bold text-cyan-600">3 topics</span>
                        </div>
                        <div className="space-y-2">
                            {["Photosynthesis", "Quadratic Equations", "Newton&apos;s Laws"].map((topic, i) => (
                                <div key={i} className="p-2 rounded-lg bg-white border border-cyan-200 text-xs text-slate-700 font-medium">
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-center">
                            <div className="text-2xl font-black text-yellow-600">2,450</div>
                            <div className="text-xs text-yellow-700 font-semibold">Total XP</div>
                        </div>
                        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
                            <div className="text-2xl font-black text-green-600">#12</div>
                            <div className="text-xs text-green-700 font-semibold">School Rank</div>
                        </div>
                    </div>
                </div>
            )
        },
        teacher: {
            title: "Teacher Dashboard",
            subtitle: "Student Performance Monitoring",
            features: [
                { icon: Users, label: "Students", value: "45 Active", color: "purple" },
                { icon: AlertCircle, label: "At Risk", value: "3 Students", color: "red" },
                { icon: TrendingUp, label: "Avg Score", value: "87%", color: "green" },
                { icon: Target, label: "Compliance", value: "78%", color: "blue" }
            ],
            visual: (
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                        <div className="text-sm font-semibold text-purple-700 mb-3">Class Performance Heatmap</div>
                        <div className="grid grid-cols-5 gap-2">
                            {[92, 87, 65, 78, 94, 88, 72, 91, 85, 68].map((score, i) => (
                                <div
                                    key={i}
                                    className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${score >= 85 ? "bg-green-500 text-white" :
                                            score >= 70 ? "bg-yellow-500 text-white" :
                                                "bg-red-500 text-white"
                                        }`}
                                >
                                    {score}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                        <div className="text-sm font-semibold text-red-700 mb-2">At-Risk Students</div>
                        <div className="space-y-2">
                            {["Rahul K. - Math", "Priya S. - Physics", "Arjun M. - Chemistry"].map((student, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-red-700 font-medium">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>{student}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        principal: {
            title: "Principal Dashboard",
            subtitle: "Institution-Wide Analytics",
            features: [
                { icon: Building2, label: "Classes", value: "12 Active", color: "orange" },
                { icon: Users, label: "Students", value: "540 Total", color: "blue" },
                { icon: TrendingUp, label: "Avg Performance", value: "85%", color: "green" },
                { icon: BarChart3, label: "Compliance", value: "82%", color: "purple" }
            ],
            visual: (
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
                        <div className="text-sm font-semibold text-orange-700 mb-3">Class-Wise Performance</div>
                        <div className="space-y-2">
                            {[
                                { class: "Class 10-A", score: 92 },
                                { class: "Class 10-B", score: 87 },
                                { class: "Class 9-A", score: 85 },
                                { class: "Class 9-B", score: 78 }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-700">{item.class}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                                                style={{ width: `${item.score}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-orange-600 w-8">{item.score}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
                            <div className="text-2xl font-black text-blue-600">540</div>
                            <div className="text-xs text-blue-700 font-semibold">Total Students</div>
                        </div>
                        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
                            <div className="text-2xl font-black text-green-600">85%</div>
                            <div className="text-xs text-green-700 font-semibold">Avg Score</div>
                        </div>
                    </div>
                </div>
            )
        }
    };

    const active = dashboards[activeRole];
    const activeRoleData = roles.find(r => r.id === activeRole)!;

    return (
        <section className="relative min-h-screen flex items-center py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/5 border border-slate-200 mb-6">
                        <BarChart3 className="w-4 h-4 text-slate-700" />
                        <span className="text-xs font-mono text-slate-700 tracking-widest uppercase">Role-Based Command Centers</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
                        Three Roles. <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600">Three Dashboards</span>.
                    </h2>
                    <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
                        Each stakeholder gets exactly the data they need—nothing more, nothing less
                    </p>
                </div>

                {/* Role Switcher */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-12">
                    {roles.map(role => {
                        const Icon = role.icon;
                        const isActive = activeRole === role.id;
                        return (
                            <button
                                key={role.id}
                                onClick={() => setActiveRole(role.id)}
                                className={`flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 ${isActive
                                        ? `bg-gradient-to-r from-${role.color}-500 to-${role.color}-600 text-white shadow-2xl scale-105`
                                        : "bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-lg"
                                    }`}
                            >
                                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                <span>{role.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Dashboard Display */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 bg-white shadow-2xl">
                        {/* Header */}
                        <div className={`p-6 md:p-8 bg-gradient-to-r from-${activeRoleData.color}-500 to-${activeRoleData.color}-600`}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <activeRoleData.icon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-3xl font-black text-white">{active.title}</h3>
                                    <p className="text-white/80 text-sm md:text-base font-semibold">{active.subtitle}</p>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
                                {active.features.map((feature, i) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div key={i} className="p-3 md:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                                            <Icon className="w-4 h-4 md:w-5 md:h-5 text-white mb-2" />
                                            <div className="text-lg md:text-2xl font-black text-white mb-1">{feature.value}</div>
                                            <div className="text-[10px] md:text-xs text-white/70 font-semibold">{feature.label}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Dashboard Content */}
                        <div className="p-6 md:p-8">
                            {active.visual}
                        </div>
                    </div>
                </div>

                {/* Bottom Statement */}
                <div className="mt-16 text-center">
                    <div className="inline-block p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-900 text-white shadow-2xl">
                        <p className="text-xl md:text-2xl lg:text-3xl font-black">
                            Role-specific intelligence for every stakeholder.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
