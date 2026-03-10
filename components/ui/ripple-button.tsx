"use client";

import React, { useCallback, useRef, useState, ButtonHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    rippleColor?: string;
    duration?: number;
}

const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
    ({ children, className, rippleColor = "rgba(192, 132, 252, 0.3)", duration = 0.6, ...props }, ref) => {
        const buttonRef = useRef<HTMLButtonElement>(null);
        const [ripple, setRipple] = useState<{ x: number; y: number; size: number; key: number; isLeaving?: boolean } | null>(null);
        const [isHovered, setIsHovered] = useState(false);

        // Combine forwarded ref and local ref
        React.useImperativeHandle(ref, () => buttonRef.current!);

        const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
            if (isHovered || !buttonRef.current) return;
            setIsHovered(true);

            const button = buttonRef.current;
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setRipple({ x, y, size, key: Date.now() });
        }, [isHovered]);

        const removeRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
            if (event.target !== event.currentTarget) return;
            setIsHovered(false);

            const button = buttonRef.current;
            if (!button) return;
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setRipple(prev => prev ? { ...prev, x, y, isLeaving: true } : null);
        }, []);

        const handleMouseMove = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
            if (!buttonRef.current || !isHovered || !ripple) return;

            const button = buttonRef.current;
            const rect = button.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setRipple(prev => prev ? { ...prev, x, y } : null);
        }, [isHovered, ripple]);

        return (
            <button
                ref={buttonRef}
                className={cn(
                    "relative flex items-center justify-center overflow-hidden transition-all duration-[600ms]",
                    className
                )}
                onMouseEnter={(e) => {
                    if (e.target === e.currentTarget) {
                        createRipple(e);
                    }
                }}
                onMouseLeave={(e) => {
                    if (e.target === e.currentTarget) {
                        removeRipple(e);
                    }
                }}
                onMouseMove={handleMouseMove}
                {...props}
            >
                <span className="relative z-[2]">{children}</span>

                <AnimatePresence>
                    {ripple && (
                        <motion.span
                            key={ripple.key}
                            className="absolute rounded-full pointer-events-none z-[1]"
                            style={{
                                width: ripple.size,
                                height: ripple.size,
                                left: ripple.x,
                                top: ripple.y,
                                x: '-50%',
                                y: '-50%',
                                backgroundColor: rippleColor,
                            }}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{
                                scale: ripple.isLeaving ? 0 : 1,
                                x: '-50%',
                                y: '-50%',
                            }}
                            exit={{ scale: 0, opacity: 1 }}
                            transition={{
                                duration: duration,
                                ease: "easeOut",
                            }}
                            onAnimationComplete={() => {
                                if (ripple.isLeaving) {
                                    setRipple(null);
                                }
                            }}
                        />
                    )}
                </AnimatePresence>
            </button>
        );
    }
);

RippleButton.displayName = "RippleButton";

export { RippleButton };

// Demo Component
export function Component() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white">
            <div className="flex flex-col gap-6 items-center">
                <RippleButton
                    className="rounded-sm shadow-sm border border-dashed border-black/50 px-8 py-3 text-lg font-medium text-[#0e352e] hover:text-white"
                    rippleColor="black"
                    onClick={() => alert('Button clicked!')}
                >
                    Click Me
                </RippleButton>
            </div>
        </div>
    );
}
