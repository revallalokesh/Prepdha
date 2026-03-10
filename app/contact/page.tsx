"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Navigation, Wifi, Zap, Globe } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   CANVAS PARTICLE HERO (the one user liked)
═══════════════════════════════════════════════════════ */
function ParticleCanvas() {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = ref.current!;
        const ctx = canvas.getContext("2d")!;
        let raf: number;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener("resize", resize);
        const COLORS = ["#15acc3", "#6366f1", "#a855f7", "#06b6d4", "#f59e0b"];
        const pts = Array.from({ length: 80 }, () => ({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2 + 0.8,
            col: COLORS[Math.floor(Math.random() * COLORS.length)],
            a: Math.random() * 0.6 + 0.2,
        }));
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pts.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.col; ctx.globalAlpha = p.a; ctx.fill();
            });
            ctx.globalAlpha = 0.07;
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                    if (Math.sqrt(dx * dx + dy * dy) < 130) {
                        ctx.beginPath(); ctx.lineWidth = 0.8;
                        ctx.strokeStyle = pts[i].col;
                        ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1; raf = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, []);
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ═══════════════════════════════════════════════════════
   ANIMATED SIGNAL RINGS (for Phone card)
═══════════════════════════════════════════════════════ */
function SignalRings({ color }: { color: string }) {
    return (
        <div className="relative flex items-center justify-center w-16 h-16">
            {[0, 1, 2].map(i => (
                <div key={i} className="absolute rounded-full border-2 animate-signal-ping"
                    style={{ width: 16 + i * 20, height: 16 + i * 20, borderColor: color, animationDelay: `${i * 0.4}s`, opacity: 0 }} />
            ))}
            <div className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: `${color}25`, border: `1.5px solid ${color}50` }}>
                <Phone className="w-5 h-5" style={{ color }} />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED ENVELOPE (for Email card)
═══════════════════════════════════════════════════════ */
function EnvelopeAnim({ color }: { color: string }) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const t = setInterval(() => setOpen(v => !v), 1800);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500"
                style={{ background: `${color}20`, border: `1.5px solid ${color}40`, transform: open ? "scale(1.15)" : "scale(1)" }}>
                <Mail className="w-5 h-5 transition-all duration-500" style={{ color, transform: open ? "translateY(-2px)" : "translateY(0)" }} />
            </div>
            {open && <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 animate-bounce" style={{ boxShadow: `0 0 8px #4ade80` }} />}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED PIN (for Office card)
═══════════════════════════════════════════════════════ */
function PinAnim({ color }: { color: string }) {
    return (
        <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute bottom-1 w-10 h-3 rounded-full blur-sm opacity-40 animate-pulse" style={{ background: color }} />
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pin-bounce"
                style={{ background: `${color}20`, border: `1.5px solid ${color}40` }}>
                <MapPin className="w-5 h-5" style={{ color }} />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   BENTO CONTACT CARD
═══════════════════════════════════════════════════════ */
interface BentoCard {
    eyebrow: string; headline: string; sub: string; value: string;
    href?: string; icon: React.ReactNode; color: string; accentBg: string;
    delay: string;
}

function BentoContactCard({ eyebrow, headline, sub, value, href, icon, color, accentBg, delay }: BentoCard) {
    const [hovered, setHovered] = useState(false);
    const [pos, setPos] = useState({ x: 50, y: 50 });
    const ref = useRef<HTMLDivElement>(null);
    const onMove = useCallback((e: React.MouseEvent) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    }, []);

    const inner = (
        <div ref={ref}
            className="relative overflow-hidden rounded-[2rem] p-8 cursor-pointer transition-all duration-500 group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={onMove}
            style={{
                background: hovered
                    ? `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${accentBg}, #ffffff 70%)`
                    : "#ffffff",
                boxShadow: hovered
                    ? `0 30px 80px -10px ${color}40, 0 0 0 1.5px ${color}30`
                    : "0 4px 30px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
                transform: hovered ? "translateY(-8px)" : "translateY(0)",
                animationDelay: delay,
            }}
        >
            {/* Top shimmer on hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500 rounded-t-[2rem]"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: hovered ? 1 : 0 }} />

            {/* Spotlight glow */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-[2rem]"
                style={{
                    background: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, ${color}12, transparent 60%)`,
                    opacity: hovered ? 1 : 0,
                }} />

            <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6">{icon}</div>

                {/* Labels */}
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-1 transition-colors duration-300"
                    style={{ color: hovered ? color : "#94a3b8" }}>{eyebrow}</p>
                <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight">{headline}</h3>
                <p className="text-sm text-slate-400 mb-5 leading-relaxed">{sub}</p>

                {/* Value chip */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300"
                    style={{
                        background: hovered ? color : `${color}12`,
                        color: hovered ? "#fff" : color,
                        boxShadow: hovered ? `0 8px 20px ${color}50` : "none",
                    }}>
                    {value}
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
            </div>
        </div>
    );

    return href ? <a href={href} className="block">{inner}</a> : inner;
}

/* ═══════════════════════════════════════════════════════
   MAP — MISSION CONTROL HUD
═══════════════════════════════════════════════════════ */
function MissionControlMap() {
    const [scanY, setScanY] = useState(0);
    const [blip, setBlip] = useState(false);

    useEffect(() => {
        let y = 0;
        const id = setInterval(() => { y = (y + 0.8) % 100; setScanY(y); }, 30);
        const b = setInterval(() => setBlip(v => !v), 1200);
        return () => { clearInterval(id); clearInterval(b); };
    }, []);

    return (
        <section className="relative py-24 overflow-hidden"
            style={{ background: "linear-gradient(160deg, #06090f 0%, #0a0f1e 40%, #080d1a 100%)" }}>

            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(21,172,195,1) 1px,transparent 1px),linear-gradient(to right, rgba(21,172,195,1) 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                }} />

            {/* Corner blobs */}
            <div className="absolute top-0 left-0 w-72 md:w-96 h-72 md:h-96 rounded-full blur-[80px] md:blur-[120px] opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, #15acc3, transparent 70%)" }} />
            <div className="absolute bottom-0 right-0 w-72 md:w-96 h-72 md:h-96 rounded-full blur-[80px] md:blur-[120px] opacity-15 pointer-events-none"
                style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />

            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#15acc3", boxShadow: "0 0 10px #15acc3" }} />
                            <span className="text-xs font-mono text-[#15acc3]/70 tracking-[0.35em] uppercase">Live Location</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                            Find <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: "linear-gradient(90deg, #15acc3, #6366f1)" }}>
                                HQ
                            </span>
                        </h2>
                    </div>
                </div>

                {/* Main HUD container */}
                <div className="relative rounded-[2.5rem] overflow-hidden"
                    style={{
                        border: "1.5px solid rgba(21,172,195,0.2)",
                        boxShadow: "0 0 80px rgba(21,172,195,0.1), 0 0 0 1px rgba(21,172,195,0.08) inset",
                    }}
                >
                    {/* HUD top bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 border-b gap-3"
                        style={{ background: "rgba(21,172,195,0.06)", borderColor: "rgba(21,172,195,0.15)" }}>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444", boxShadow: "0 0 6px #ef4444" }} />
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b", boxShadow: "0 0 6px #f59e0b" }} />
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                        </div>
                        <span className="text-[10px] md:text-xs font-mono text-[#15acc3]/60 tracking-widest text-center sm:text-left">
                            PREPDHA_HQ — 17.4410° N, 78.3839° E
                        </span>
                        <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${blip ? "opacity-100" : "opacity-30"}`}
                                style={{ background: "#15acc3", boxShadow: blip ? "0 0 8px #15acc3" : "none" }} />
                            <span className="text-[10px] font-mono text-[#15acc3]/50">LIVE</span>
                        </div>
                    </div>

                    {/* Grid: map + info */}
                    <div className="grid grid-cols-1 lg:grid-cols-3">

                        {/* Map — takes 2/3 */}
                        <div className="lg:col-span-2 relative h-[400px] md:h-auto" style={{ minHeight: 400 }}>
                            {/* Scan line */}
                            <div className="absolute left-0 right-0 z-20 pointer-events-none h-[2px] transition-none"
                                style={{
                                    top: `${scanY}%`,
                                    background: "linear-gradient(90deg, transparent, rgba(21,172,195,0.6), transparent)",
                                    boxShadow: "0 0 10px rgba(21,172,195,0.4)",
                                }} />

                            {/* Corner bracket decorations */}
                            {[
                                "top-3 left-3 border-t-2 border-l-2 rounded-tl-lg",
                                "top-3 right-3 border-t-2 border-r-2 rounded-tr-lg",
                                "bottom-3 left-3 border-b-2 border-l-2 rounded-bl-lg",
                                "bottom-3 right-3 border-b-2 border-r-2 rounded-br-lg",
                            ].map((cls, i) => (
                                <div key={i} className={`absolute z-20 w-6 h-6 pointer-events-none ${cls}`}
                                    style={{ borderColor: "rgba(21,172,195,0.6)" }} />
                            ))}

                            {/* Crosshair center */}
                            <div className="absolute z-20 pointer-events-none"
                                style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full border-2 animate-ping absolute -inset-4"
                                        style={{ borderColor: "rgba(21,172,195,0.4)" }} />
                                    <div className="w-3 h-3 rounded-full border-2"
                                        style={{ borderColor: "#15acc3", background: "rgba(21,172,195,0.3)" }} />
                                </div>
                            </div>

                            {/* Gradient color overlays for unique look */}
                            <div className="absolute inset-0 z-10 pointer-events-none">
                                <div className="absolute top-0 left-0 w-40 h-40 blur-[60px] opacity-30"
                                    style={{ background: "radial-gradient(circle, #15acc3, transparent)" }} />
                                <div className="absolute bottom-0 right-0 w-32 h-32 blur-[50px] opacity-20"
                                    style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
                            </div>

                            {/* Rainbow top border */}
                            <div className="absolute top-0 left-0 right-0 h-1 z-20 pointer-events-none"
                                style={{ background: "linear-gradient(90deg, #15acc3, #6366f1, #a855f7, #f59e0b, #ef4444)" }} />

                            <iframe
                                src="https://maps.google.com/maps?q=Abhi's%20Ganga,%20C9RM+9HJ,%20Vittal%20Rao%20Nagar%20Rd,%20Jaihind%20Enclave,%20Madhapur,%20Hyderabad,%20Telangana%20500081&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                width="100%" height="100%"
                                style={{ border: 0, display: "block", minHeight: 400, filter: "saturate(1.3) contrast(1.1) hue-rotate(5deg)" }}
                                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                className="relative z-0"
                            />
                        </div>

                        {/* Info panel — 1/3 */}
                        <div className="border-t lg:border-t-0 lg:border-l flex flex-col"
                            style={{ borderColor: "rgba(21,172,195,0.15)", background: "rgba(10,15,30,0.7)" }}>

                            {/* Coordinate display */}
                            <div className="p-6 border-b" style={{ borderColor: "rgba(21,172,195,0.1)" }}>
                                <p className="text-[10px] font-mono text-[#15acc3]/50 tracking-[0.3em] uppercase mb-2">Coordinates</p>
                                <div className="font-mono text-lg font-bold" style={{ color: "#15acc3" }}>17.4410° N</div>
                                <div className="font-mono text-lg font-bold" style={{ color: "#6366f1" }}>78.3839° E</div>
                            </div>

                            {/* Location details */}
                            <div className="p-6 flex-1 space-y-6 border-b" style={{ borderColor: "rgba(21,172,195,0.1)" }}>
                                <div>
                                    <p className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase mb-2">Location</p>
                                    <p className="text-white font-bold text-lg leading-snug">Abhi&apos;s Ganga</p>
                                    <p className="text-slate-400 text-sm mt-1">C9RM+9HJ, Vittal Rao Nagar Rd, Jaihind Enclave</p>
                                    <p className="text-slate-500 text-xs mt-0.5">Madhapur, Hyderabad, Telangana 500081</p>
                                </div>

                                <div />
                            </div>

                            {/* CTA */}
                            <div className="p-6">
                                <a href="https://maps.google.com/?q=Abhi's+Ganga,+C9RM+9HJ,+Vittal+Rao+Nagar+Rd,+Jaihind+Enclave,+Madhapur,+Hyderabad,+Telangana+500081"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-[1.03] active:scale-95"
                                    style={{
                                        background: "linear-gradient(90deg, #15acc3, #6366f1)",
                                        boxShadow: "0 8px 25px rgba(21,172,195,0.3)",
                                    }}>
                                    <Navigation className="w-4 h-4" />
                                    Launch Navigation
                                </a>
                                <p className="text-center text-[10px] text-slate-600 mt-3 font-mono">Opens in Google Maps</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════ */
export default function ContactPage() {
    const cards: BentoCard[] = [
        {
            eyebrow: "Call us directly",
            headline: "Real support,\nreal people.",
            sub: "Direct line for institutional inquiries, partnerships, and onboarding.",
            value: "+91 98765 43210",
            href: "tel:+919876543210",
            icon: <SignalRings color="#15acc3" />,
            color: "#15acc3",
            accentBg: "rgba(21,172,195,0.07)",
            delay: "0ms",
        },
        {
            eyebrow: "Send a message",
            headline: "We reply\nwithin 24 h.",
            sub: "Technical specs, proposals, or partnership ideas — all welcome.",
            value: "info@prepdha.com",
            href: "mailto:info@prepdha.com",
            icon: <EnvelopeAnim color="#6366f1" />,
            color: "#6366f1",
            accentBg: "rgba(99,102,241,0.07)",
            delay: "80ms",
        },
        {
            eyebrow: "Come see us",
            headline: "Madhapur,\nHyderabad.",
            sub: "Visit our headquarters at Abhi's Ganga, C9RM+9HJ, Vittal Rao Nagar Rd, Jaihind Enclave, 500081.",
            value: "Get directions →",
            icon: <PinAnim color="#f59e0b" />,
            color: "#f59e0b",
            accentBg: "rgba(245,158,11,0.06)",
            delay: "160ms",
        },
    ];

    return (
        <main className="min-h-screen overflow-hidden" style={{ background: "#f8fafc" }}>
            {/* ── DARK PARTICLE HERO ──────────────────────── */}
            <section className="relative min-h-[60vh] flex items-end pb-24 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #07090f 0%, #0c1220 50%, #0a0e1a 100%)" }}>
                <ParticleCanvas />

                {/* Radial glows */}
                <div className="absolute top-[-5%] left-[8%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-25 pointer-events-none"
                    style={{ background: "radial-gradient(circle, #15acc3, transparent 70%)" }} />
                <div className="absolute top-[10%] right-[5%] w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none"
                    style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
                <div className="absolute bottom-[-5%] right-[30%] w-[300px] h-[300px] rounded-full blur-[90px] opacity-12 pointer-events-none"
                    style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }} />

                {/* White wave clipping into the light section below */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
                    style={{ height: 80 }}>
                    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,80 C360,20 1080,20 1440,80 L1440,80 L0,80 Z" fill="#f8fafc" />
                    </svg>
                </div>

                {/* Hero text */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
                    <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 rounded-full mb-7"
                        style={{ background: "rgba(21,172,195,0.12)", border: "1px solid rgba(21,172,195,0.25)" }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#15acc3] animate-pulse" />
                        <span className="text-[10px] md:text-xs font-mono text-[#15acc3] tracking-[0.35em] uppercase">Get in Touch</span>
                    </div>

                    <h1 className="font-black tracking-tight leading-none"
                        style={{ fontSize: "clamp(4rem,11vw,10rem)" }}>
                        <span className="text-white">Contact </span>
                        <span className="bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(90deg, #15acc3, #6366f1, #a855f7)" }}>
                            Us.
                        </span>
                    </h1>
                    <p className="text-slate-400 mt-5 text-lg max-w-xl leading-relaxed">
                        Whether you&apos;re a school, coaching centre, or enterprise — we&apos;re
                        ready to architect your institution&apos;s cognitive future.
                    </p>
                </div>
            </section>

            {/* ── BENTO CARDS ─────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map(c => <BentoContactCard key={c.eyebrow} {...c} />)}
                </div>
            </section>

            {/* ── MISSION CONTROL MAP ─────────────────────── */}
            <MissionControlMap />

            {/* ── Global keyframes ─────────────────────────── */}
            <style>{`
                @keyframes signal-ping {
                    0%   { transform: scale(0.8); opacity: 0.8; }
                    100% { transform: scale(2);   opacity: 0; }
                }
                .animate-signal-ping { animation: signal-ping 1.5s ease-out infinite; }

                @keyframes pin-bounce {
                    0%,100% { transform: translateY(0); }
                    50%     { transform: translateY(-8px); }
                }
                .animate-pin-bounce { animation: pin-bounce 1.6s ease-in-out infinite; }
            `}</style>
        </main>
    );
}
