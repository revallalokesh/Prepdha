"use client";

import React from "react";
import FourPillarsBento from "@/components/ui/four-pillars-bento";
import CompetitiveEdge from "@/components/ui/competitive-edge";
import TechnicalExcellence from "@/components/ui/technical-excellence";

export default function AboutPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-white">
            {/* 1. Vision Hero: From Content to Mastery */}


            {/* 2. Mission: The Four Pillars of Prepdha */}
            <FourPillarsBento />

            {/* 3. Why We Are Better: The Competitive Edge */}
            <CompetitiveEdge />

            {/* 4. Technical Excellence: Non-Functional Trust */}
            <TechnicalExcellence />
        </main>
    );
}
