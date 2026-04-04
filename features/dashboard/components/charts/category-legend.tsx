"use client";

import { cn } from "@/lib/utils";
import { CategoryDataPoint } from "../../types/spending-breakdown";
import { CategoryIcon } from "../shared/category-icon";

interface CategoryLegendProps {
    data: CategoryDataPoint[];
    activeIndex: number | null;
    onHover: (index: number | null) => void;
}

export function CategoryLegend({ data, activeIndex, onHover }: CategoryLegendProps) {
    const total = data.reduce((s, d) => s + d.amount, 0);

    return (
        <div className="grid grid-cols-2 gap-1.5">
            {data.map((item, index) => {
                const pct = ((item.amount / total) * 100).toFixed(1);
                const over = item.amount > item.budget;
                const isActive = activeIndex === index;
                const isFaded = activeIndex !== null && !isActive;

                return (
                    <button
                        key={item.category}
                        onMouseEnter={() => onHover(index)}
                        onMouseLeave={() => onHover(null)}
                        className={cn(
                            "flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-all duration-150",
                            isActive ? "bg-muted ring-1 ring-border" : "hover:bg-muted/80",
                            isFaded ? "opacity-40" : "opacity-100"
                        )}
                    >
                        <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `${item.color}18` }}
                        >
                            <CategoryIcon
                                iconKey={item.iconKey}
                                className="w-3.5 h-3.5"
                            // style={{ color: item.color }}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-[11px] font-semibold text-foreground truncate">
                                    {item.label}
                                </span>
                                {over && (
                                    <span className="text-[9px] font-bold text-destructive bg-destructive/10 px-1 rounded">
                                        OVER
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-between mt-0.5">
                                <span className="text-[10px] text-muted-foreground tabular-nums">
                                    ${item.amount.toLocaleString()}
                                </span>
                                <span className="text-[10px] font-medium tabular-nums" style={{ color: item.color }}>
                                    {pct}%
                                </span>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}