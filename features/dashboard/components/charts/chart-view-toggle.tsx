"use client";

import { cn } from "@/lib/utils";
import { PieChart, BarChart2 } from "lucide-react";
import { ChartView } from "../../types/spending-breakdown";

interface ChartViewToggleProps {
    value: ChartView;
    onChange: (v: ChartView) => void;
}

export function ChartViewToggle({ value, onChange }: ChartViewToggleProps) {
    return (
        <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
            {(["donut", "bar"] as ChartView[]).map((v) => (
                <button
                    key={v}
                    onClick={() => onChange(v)}
                    className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-150",
                        value === v
                            ? "bg-card text-foreground shadow-sm ring-1 ring-primary/15"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {v === "donut"
                        ? <PieChart className="w-3 h-3" />
                        : <BarChart2 className="w-3 h-3" />
                    }
                    <span className="capitalize">{v}</span>
                </button>
            ))}
        </div>
    );
}