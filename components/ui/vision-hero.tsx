"use client";

import { useRef, useEffect } from "react";
import { BookOpen, Brain, Target, Sparkles, Link } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AnimatedBorderButton } from "./button-border";
import { RippleButton } from "./ripple-button";
import { useRouter } from "next/navigation";

/* ── safe rgba from hex ── */
function rgba(hex: string, a: number) {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a))})`;
}

/* ═══════════════════════════════════════════════════════════
   3-D SCENE
═══════════════════════════════════════════════════════════ */
function AiBrain3DScene() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const tiltRef = useRef<HTMLDivElement>(null);
    const cvRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0.5, y: 0.5 });
    const tilt = useRef({ rx: 0, ry: 0 });

    useEffect(() => {
        const el = wrapRef.current; if (!el) return;
        const mv = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            mouse.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
        };
        const ml = () => { mouse.current = { x: 0.5, y: 0.5 }; };
        el.addEventListener("mousemove", mv);
        el.addEventListener("mouseleave", ml);
        return () => { el.removeEventListener("mousemove", mv); el.removeEventListener("mouseleave", ml); };
    }, []);

    useEffect(() => {
        const cv = cvRef.current;
        const inn = tiltRef.current;
        if (!cv || !inn) return;
        const ctx = cv.getContext("2d")!;
        const dpr = window.devicePixelRatio || 1;
        const resize = () => {
            cv.width = cv.offsetWidth * dpr;
            cv.height = cv.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener("resize", resize);

        const PCOLS = ["#22d3ee", "#818cf8", "#c084fc", "#f472b6", "#67e8f9", "#a5f3fc", "#e879f9"];

        const pts = Array.from({ length: 140 }, (_, i) => ({
            angle: (i / 140) * Math.PI * 2 + Math.random() * 0.9,
            orbit: 120 + Math.random() * 170,
            tiltY: 0.16 + Math.random() * 0.30,
            speed: (0.003 + Math.random() * 0.009) * (i % 2 ? 1 : -1),
            size: 0.7 + Math.random() * 2.8,
            col: PCOLS[Math.floor(Math.random() * PCOLS.length)],
            twink: Math.random() * Math.PI * 2,
            trail: [] as { x: number; y: number }[],
        }));

        const pulses: { r: number; born: number; col: string }[] = [];
        const pI = setInterval(() =>
            pulses.push({ r: 100, born: Date.now(), col: PCOLS[Math.floor(Math.random() * 3)] }), 1400);

        const rays = Array.from({ length: 18 }, (_, i) => ({
            a: (i / 18) * Math.PI * 2,
            ph: Math.random() * Math.PI * 2,
            len: 65 + Math.random() * 55,
        }));

        let id: number, t = 0;

        const draw = () => {
            const W = cv.offsetWidth, H = cv.offsetHeight, cx = W / 2, cy = H / 2 + 5;
            t += 0.016;
            ctx.clearRect(0, 0, W, H);

            tilt.current.rx += ((mouse.current.y - 0.5) * 22 - tilt.current.rx) * 0.07;
            tilt.current.ry += ((mouse.current.x - 0.5) * -22 - tilt.current.ry) * 0.07;
            inn.style.transform = `perspective(1000px) rotateX(${tilt.current.rx}deg) rotateY(${tilt.current.ry}deg)`;

            /* atmospheric fog */
            const fog = ctx.createRadialGradient(cx, cy, 50, cx, cy, 310);
            fog.addColorStop(0, "rgba(15,5,40,0)");
            fog.addColorStop(0.65, "rgba(8,2,22,0.40)");
            fog.addColorStop(1, "rgba(3,0,10,0.70)");
            ctx.fillStyle = fog;
            ctx.beginPath(); ctx.ellipse(cx, cy, 310, 290, 0, 0, Math.PI * 2); ctx.fill();

            /* stage spotlight */
            const spot = ctx.createRadialGradient(W * 0.75, H * 0.1, 0, W * 0.75, H * 0.1, W * 0.75);
            spot.addColorStop(0, "rgba(192,132,252,0.16)");
            spot.addColorStop(0.45, "rgba(100,60,200,0.07)");
            spot.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = spot; ctx.fillRect(0, 0, W, H);

            /* perspective floor */
            const gy = cy + 180, vx = cx, vy = gy - 90;
            for (let g = -12; g <= 12; g++) {
                const a = Math.max(0, 0.22 - Math.abs(g) * 0.016);
                ctx.strokeStyle = `rgba(168,85,247,${a})`; ctx.lineWidth = 0.7;
                ctx.beginPath(); ctx.moveTo(cx + g * 42, gy); ctx.lineTo(vx, vy); ctx.stroke();
            }
            for (let row = 0; row < 7; row++) {
                const frac = row / 7, spread = 42 + frac * 290;
                ctx.strokeStyle = `rgba(168,85,247,${0.22 * (1 - frac)})`; ctx.lineWidth = 0.7;
                ctx.beginPath(); ctx.moveTo(cx - spread, gy - frac * 90); ctx.lineTo(cx + spread, gy - frac * 90); ctx.stroke();
            }
            const fg = ctx.createRadialGradient(cx, gy, 0, cx, gy, 160);
            fg.addColorStop(0, "rgba(168,85,247,0.35)"); fg.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = fg; ctx.beginPath(); ctx.ellipse(cx, gy, 160, 28, 0, 0, Math.PI * 2); ctx.fill();

            /* pulse shockwaves */
            for (let i = pulses.length - 1; i >= 0; i--) {
                const age = (Date.now() - pulses[i].born) / 1000;
                pulses[i].r = 100 + age * 110;
                const a = Math.max(0, 0.65 - age * 0.48);
                if (a <= 0) { pulses.splice(i, 1); continue; }
                [0, 16].forEach((off, ri) => {
                    ctx.strokeStyle = rgba(pulses[i].col, a * (ri ? 0.28 : 1));
                    ctx.lineWidth = 1.5 - ri * 0.5;
                    ctx.beginPath();
                    ctx.ellipse(cx, cy, pulses[i].r + off, (pulses[i].r + off) * 0.28, 0, 0, Math.PI * 2);
                    ctx.stroke();
                });
            }

            /* rays */
            rays.forEach(ray => {
                const flick = 0.4 + Math.sin(t * 2.3 + ray.ph) * 0.45;
                const l = ray.len + Math.sin(t * 1.7 + ray.ph) * 30;
                const a = ray.a + t * 0.28;
                const x2 = cx + Math.cos(a) * l, y2 = cy + Math.sin(a) * l * 0.35;
                const rg = ctx.createLinearGradient(cx, cy, x2, y2);
                rg.addColorStop(0, "rgba(192,132,252,0)");
                rg.addColorStop(0.4, rgba("#c084fc", 0.42 * flick));
                rg.addColorStop(1, "rgba(34,211,238,0)");
                ctx.strokeStyle = rg; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x2, y2); ctx.stroke();
            });

            /* orbit rings */
            [
                { a: 220, b: 82, s: 0.18, col: "#c084fc", al: 0.42, d: [14, 20], lw: 1.6 },
                { a: 272, b: 100, s: -0.14, col: "#22d3ee", al: 0.30, d: [6, 24], lw: 1.2 },
                { a: 182, b: 67, s: 0.30, col: "#818cf8", al: 0.24, d: [4, 18], lw: 1.0 },
                { a: 245, b: 90, s: -0.25, col: "#f472b6", al: 0.20, d: [8, 28], lw: 0.9 },
            ].forEach(r => {
                ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * r.s);
                ctx.strokeStyle = rgba(r.col, r.al);
                ctx.lineWidth = r.lw; ctx.setLineDash(r.d);
                ctx.beginPath(); ctx.ellipse(0, 0, r.a, r.b, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.setLineDash([]); ctx.restore();
            });

            /* particles with trail + DOF */
            const sorted = [...pts].sort((a, b) => Math.sin(a.angle) - Math.sin(b.angle));
            sorted.forEach(p => {
                p.angle += p.speed; p.twink += 0.04;
                const x = cx + Math.cos(p.angle) * p.orbit;
                const y = cy + Math.sin(p.angle) * p.orbit * p.tiltY;
                p.trail.push({ x, y });
                if (p.trail.length > 9) p.trail.shift();

                const depth = (Math.sin(p.angle) + 1) / 2;
                if (depth < 0.08) return;
                const twinkAl = Math.max(0, 0.3 + Math.sin(p.twink) * 0.42);
                const sz = p.size * (0.3 + depth * 0.7);
                const al = twinkAl * (0.15 + depth * 0.85);

                if (p.trail.length > 3) {
                    for (let ti = 1; ti < p.trail.length; ti++) {
                        const frac = ti / p.trail.length;
                        ctx.globalAlpha = al * frac * 0.32;
                        ctx.strokeStyle = p.col; ctx.lineWidth = sz * frac;
                        ctx.beginPath();
                        ctx.moveTo(p.trail[ti - 1].x, p.trail[ti - 1].y);
                        ctx.lineTo(p.trail[ti].x, p.trail[ti].y); ctx.stroke();
                    }
                    ctx.globalAlpha = 1;
                }
                if (depth < 0.28) ctx.filter = `blur(${(0.28 - depth) * 5}px)`;
                const g = ctx.createRadialGradient(x, y, 0, x, y, sz * 7);
                g.addColorStop(0, rgba(p.col, al * 0.88));
                g.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, sz * 7, 0, Math.PI * 2); ctx.fill();
                ctx.globalAlpha = al; ctx.fillStyle = p.col;
                ctx.beginPath(); ctx.arc(x, y, sz, 0, Math.PI * 2); ctx.fill();
                ctx.globalAlpha = 1; ctx.filter = "none";
            });

            /* scan line */
            const sY = ((t * 60) % (H + 70)) - 35;
            const sg = ctx.createLinearGradient(0, sY - 30, 0, sY + 30);
            sg.addColorStop(0, "rgba(192,132,252,0)");
            sg.addColorStop(0.5, "rgba(192,132,252,0.08)");
            sg.addColorStop(1, "rgba(192,132,252,0)");
            ctx.fillStyle = sg; ctx.fillRect(0, sY - 30, W, 60);

            /* central bloom */
            const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, 170);
            bloom.addColorStop(0, "rgba(192,132,252,0.14)");
            bloom.addColorStop(0.5, "rgba(34,211,238,0.07)");
            bloom.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = bloom; ctx.beginPath(); ctx.ellipse(cx, cy, 170, 150, 0, 0, Math.PI * 2); ctx.fill();

            id = requestAnimationFrame(draw);
        };

        draw();
        return () => { cancelAnimationFrame(id); clearInterval(pI); window.removeEventListener("resize", resize); };
    }, []);

    return (
        <div ref={wrapRef} className="relative w-full h-full flex items-center justify-center">
            <canvas ref={cvRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />

            <div ref={tiltRef} className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d", willChange: "transform", zIndex: 2 }}>

                {/* pedestal glow */}
                <div style={{
                    position: "absolute", bottom: "13%", left: "50%",
                    transform: "translateX(-50%) translateZ(-45px)",
                    width: 250, height: 30, borderRadius: "50%",
                    background: "radial-gradient(ellipse,rgba(168,85,247,0.65) 0%,rgba(99,60,200,0.3) 40%,transparent 72%)",
                    filter: "blur(12px)",
                }} />

                {/* Lottie */}
                <div style={{
                    width: "88%", height: "88%",
                    transform: "translateZ(48px)",
                    mixBlendMode: "screen",
                    filter: [
                        "drop-shadow(0 0 30px rgba(192,132,252,0.75))",
                        "drop-shadow(0 0 80px rgba(91,33,182,0.50))",
                        "drop-shadow(0 20px 40px rgba(0,0,0,0.9))",
                        "brightness(1.15) saturate(1.3) contrast(1.05)",
                    ].join(" "),
                }}>
                    <DotLottieReact src="/ai-brain.json" loop autoplay speed={0.72}
                        style={{ width: "100%", height: "100%" }} />
                </div>

                {/* rim light */}
                <div style={{
                    position: "absolute", top: "9%", left: "50%",
                    transform: "translateX(-50%) translateZ(58px)",
                    width: 200, height: 3, borderRadius: 4,
                    background: "linear-gradient(90deg,transparent,rgba(192,132,252,0.8),transparent)",
                    filter: "blur(4px)",
                }} />

                {/* floating data badges */}
                {[
                    { icon: "⬡", label: "Neural Engine", sub: "Deep Learning", color: "#22d3ee", top: "5%", left: "0%", z: 95, d: "0s" },
                    { icon: "◈", label: "AI Adaptive", sub: "Smart Syllabus", color: "#c084fc", top: "18%", right: "0%", z: 80, d: "1s" },
                    { icon: "◉", label: "NCERT 100%", sub: "Teacher Verified", color: "#818cf8", bottom: "22%", left: "0%", z: 105, d: "1.8s" },
                    { icon: "◆", label: "Smart Recall", sub: "Spaced Repetition", color: "#f472b6", bottom: "12%", right: "0%", z: 85, d: "2.5s" },
                ].map(c => (
                    <div key={c.label} className="absolute rounded-xl border backdrop-blur-xl transition-all duration-300"
                        style={{
                            top: c.top,
                            left: (c as any).left,
                            right: (c as any).right,
                            bottom: c.bottom,
                            padding: "clamp(6px, 1.5vw, 12px) clamp(8px, 2vw, 16px)",
                            minWidth: "clamp(100px, 25vw, 140px)",
                            borderColor: rgba(c.color, 0.35),
                            background: `linear-gradient(135deg,${rgba(c.color, 0.18)} 0%,rgba(5,2,20,0.75) 100%)`,
                            boxShadow: `0 0 24px ${rgba(c.color, 0.25)},0 4px 20px rgba(0,0,0,0.6),inset 0 1px 0 ${rgba(c.color, 0.3)}`,
                            transform: `translateZ(${c.z}px)`,
                            animation: "badgeFloat 5s ease-in-out infinite",
                            animationDelay: c.d,
                        }}>
                        <div className="flex items-center gap-1.5" style={{ color: c.color, fontSize: "clamp(9px, 1.2vw, 11px)", fontWeight: 700, letterSpacing: "0.05em" }}>
                            <span>{c.icon}</span>
                            <span className="whitespace-nowrap">{c.label}</span>
                        </div>
                        <div style={{ color: "#64748b", fontSize: "clamp(7px, 1vw, 9px)", marginTop: 3 }}>{c.sub}</div>
                        <div style={{
                            position: "absolute", bottom: 0, left: "12%", right: "12%", height: 1,
                            background: `linear-gradient(90deg,transparent,${rgba(c.color, 0.7)},transparent)`
                        }} />
                    </div>
                ))}
            </div>

            {/* HUD corners */}
            {[
                { top: 8, left: 8, bt: "#22d3ee", bl: "#22d3ee", br: "10px 0 0 0" },
                { top: 8, right: 8, bt: "#c084fc", br2: "#c084fc", br: "0 10px 0 0" },
                { bottom: 8, left: 8, bb: "#818cf8", bl: "#818cf8", br: "0 0 0 10px" },
                { bottom: 8, right: 8, bb: "#f472b6", br2: "#f472b6", br: "0 0 10px 0" },
            ].map((s, i) => (
                <div key={i} className="absolute pointer-events-none" style={{
                    top: s.top, left: (s as any).left, right: (s as any).right, bottom: s.bottom,
                    width: 40, height: 40, borderRadius: s.br, zIndex: 10,
                    borderTop: s.bt ? `1.5px solid ${rgba(s.bt, 0.6)}` : undefined,
                    borderLeft: s.bl ? `1.5px solid ${rgba(s.bl, 0.6)}` : undefined,
                    borderBottom: s.bb ? `1.5px solid ${rgba(s.bb, 0.6)}` : undefined,
                    borderRight: (s as any).br2 ? `1.5px solid ${rgba((s as any).br2, 0.6)}` : undefined,
                }} />
            ))}

            <style>{`
        @keyframes badgeFloat { 0%,100%{margin-top:0px} 50%{margin-top:-12px} }
      `}</style>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   HERO  —  single unified dark gradient (no split panel)
═══════════════════════════════════════════════════════════ */
export default function VisionHero() {
    const router = useRouter();

    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #06090f 0%, #0b0520 35%, #07101f 65%, #06090f 100%)",
            }}
        >
            {/* subtle colour pockets */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.14) 0%, transparent 50%)" }} />
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(14,165,233,0.09) 0%, transparent 45%)" }} />

            {/* faint grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(rgba(192,132,252,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(192,132,252,.6) 1px,transparent 1px)`,
                backgroundSize: "64px 64px",
            }} />

            {/* top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{ background: "linear-gradient(90deg,transparent,rgba(192,132,252,0.6) 40%,rgba(34,211,238,0.6) 60%,transparent)" }} />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-20
                      grid lg:grid-cols-[44%_56%] gap-12 lg:gap-8 items-center">

                {/* ── LEFT: content ── */}
                <div className="space-y-7 lg:pr-6">

                    {/* pill */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                        style={{ borderColor: "rgba(192,132,252,0.3)", background: "rgba(124,58,237,0.12)", backdropFilter: "blur(12px)" }}>
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-xs font-semibold text-purple-300 tracking-widest uppercase">
                            AI-Powered Learning Platform
                        </span>
                    </div>

                    {/* headline */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.12]">
                        <span className="block text-white mb-2">Your Students Are Studying.</span>
                        <span className="block bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(90deg,#c084fc 0%,#818cf8 45%,#22d3ee 100%)" }}>
                            But Are They Retaining?
                        </span>
                    </h1>

                    {/* description */}
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                        Prepdha is the AI-powered learning platform built exclusively for{" "}
                        <span className="text-purple-300 font-semibold">CBSE schools</span> with structured,
                        measurable learning{" "}
                        <span className="text-sky-400 font-semibold">aligned to exactly what your teachers are already teaching</span>.
                    </p>

                    {/* stats */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-5 py-2">
                        {[
                            { icon: BookOpen, val: "100%", label: "NCERT Syllabus", col: "#c084fc" },
                            { icon: Brain, val: "3", label: "Stakeholder Dashboards", col: "#22d3ee" },
                            { icon: Target, val: "0", label: "Days Onboard", col: "#818cf8" },
                        ].map(s => (
                            <div key={s.label} className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl flex-grow md:flex-grow-0 min-w-[120px]"
                                style={{ border: `1px solid ${rgba(s.col, 0.2)}`, background: rgba(s.col, 0.08) }}>
                                <s.icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: s.col }} />
                                <div>
                                    <div className="text-base md:text-lg font-black" style={{ color: s.col }}>{s.val}</div>
                                    <div className="text-[10px] text-slate-500 mt-0.5">{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">

                        <AnimatedBorderButton
                            onClick={() => router.push('/book-demo')}
                            className="group relative w-full sm:w-auto px-8 py-6 rounded-2xl text-slate-300 font-bold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/5 cursor-pointer border-transparent"
                            style={{ background: "rgba(124,58,237,0.08)" }}>
                            Book a School Demo
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </AnimatedBorderButton>

                        <RippleButton
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-slate-300 font-bold text-base transition-all duration-300 hover:bg-white/10 cursor-pointer border border-[rgba(192,132,252,0.25)] bg-[rgba(124,58,237,0.08)]"
                            rippleColor="rgba(192, 132, 252, 0.4)"
                        >
                            See How It Works ↓
                        </RippleButton>
                    </div>


                </div>

                {/* ── RIGHT: 3-D scene ── */}
                <div className="relative lg:h-[720px] h-[520px]">
                    <AiBrain3DScene />
                </div>
            </div>

            {/* scroll indicator */}
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={{ animation: "scrollBounce 2s ease-in-out infinite" }}>
                <span className="text-[10px] font-mono text-slate-600 tracking-widest uppercase">Scroll</span>
                <div className="w-5 h-9 rounded-full border border-purple-500/40 flex items-start justify-center pt-1.5">
                    <div className="w-1 h-2.5 rounded-full bg-purple-400"
                        style={{ animation: "scrollDot 1.4s ease-in-out infinite" }} />
                </div>
            </div>

            <style>{`
        @keyframes scrollBounce { 0%,100%{transform:translate(-50%,0)} 50%{transform:translate(-50%,6px)} }
        @keyframes scrollDot    { 0%,100%{opacity:1;transform:translateY(0)} 50%{opacity:.4;transform:translateY(6px)} }
      `}</style>
        </section>
    );
}
