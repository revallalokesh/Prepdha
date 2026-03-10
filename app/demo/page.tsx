import { Component as RippleDemo } from "@/components/ui/ripple-button";
import { ShinyButton } from "@/components/ui/shiny-button";

export default function DemoOne() {
    return (
        <div className="flex flex-col gap-12 items-center justify-center min-h-screen bg-slate-50 py-20">
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-xl font-bold text-slate-900">Ripple Button</h2>
                <RippleDemo />
            </div>

            <div className="flex flex-col items-center gap-4">
                <h2 className="text-xl font-bold text-slate-900">Shiny Button</h2>
                <ShinyButton onClick={() => alert("Button clicked!")}>
                    Get unlimited access
                </ShinyButton>
            </div>
        </div>
    );
}
