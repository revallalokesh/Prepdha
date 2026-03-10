"use client";

import InteractiveLearningDemo from "@/components/ui/interactive-learning-demo";
import FlashcardAnimatedFlow from "@/components/ui/flashcard-animated-flow";
import AIDoubtSolverDemo from "@/components/ui/ai-doubt-solver-demo";
import CommandCenterSwitcher from "@/components/ui/command-center-switcher";
import B2BB2CToggle from "@/components/ui/b2b-b2c-toggle";

export default function ProductsPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-white">
            {/* 2. Interactive Learning: Static Text to Live Interaction */}
            <InteractiveLearningDemo />

            {/* 3. Flashcard System: Cinematic Auto-Playing Demo */}
            <FlashcardAnimatedFlow />

            {/* 4. AI Doubt Solver: Curriculum-Aware Intelligence */}
            <AIDoubtSolverDemo />

            {/* 5. Command Center Switcher: Role-Based Dashboards */}
            <CommandCenterSwitcher />

            {/* 6. B2B/B2C Toggle: Hybrid Deployment Model */}
            <B2BB2CToggle />
        </main>
    );
}
