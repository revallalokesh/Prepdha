"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type AnimatedBorderButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    children?: React.ReactNode;
};

export function AnimatedBorderButton({ children, className, ...props }: AnimatedBorderButtonProps) {
    return (
        <button
            className={cn(
                "relative border border-input bg-background overflow-hidden rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent border-inset [mask-clip:padding-box,border-box]",
                    "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
                )}
            >
                <motion.div
                    className={cn(
                        "absolute aspect-square bg-gradient-to-r from-transparent via-purple-500 to-cyan-400"
                    )}
                    animate={{
                        offsetDistance: ["0%", "100%"],
                    }}
                    style={{
                        width: 40,
                        offsetPath: `rect(0 auto auto 0 round 20px)`,
                    }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 5,
                        ease: "linear",
                    }}
                />
            </div>
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </button>
    );
}
