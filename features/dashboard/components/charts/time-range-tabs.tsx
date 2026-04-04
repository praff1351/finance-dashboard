"use client";

import { cn } from "@/lib/utils";
import { TimeRange } from "../../types/balance-types";

const RANGES: TimeRange[] = ["7D", "1M", "3M", "6M", "1Y"];

interface TimeRangeTabsProps {
    value: TimeRange;
    onChange: (range: TimeRange) => void;
}

export function TimeRangeTabs({ value, onChange }: TimeRangeTabsProps) {
    return (
        <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
            {RANGES.map((range) => (
                <button
                    key={range}
                    onClick={() => onChange(range)}
                    className={cn(
                        "px-3 py-1 text-xs font-semibold rounded-md transition-all duration-150",
                        value === range
                            ? "bg-card text-foreground shadow-sm ring-1 ring-primary/15"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {range}
                </button>
            ))}
        </div>
    );
}