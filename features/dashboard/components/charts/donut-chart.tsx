"use client";

import {
    PieChart, Pie, Cell, Tooltip,
    ResponsiveContainer,
} from "recharts";
import { CategoryDataPoint } from "../../types/spending-breakdown";

interface DonutChartProps {
    data: CategoryDataPoint[];
    activeIndex: number | null;
    onHover: (index: number | null) => void;
}

function CustomTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    const d: CategoryDataPoint = payload[0].payload;
    const pct = ((d.amount / d.budget) * 100).toFixed(0);
    const over = d.amount > d.budget;

    return (
        <div className="bg-popover border border-border rounded-xl shadow-lg p-3 text-xs min-w-[160px] text-popover-foreground">
            <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="font-semibold text-foreground">{d.label}</span>
            </div>
            <div className="flex justify-between gap-6 mb-1">
                <span className="text-muted-foreground">Spent</span>
                <span className="font-bold text-foreground">${d.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-6 mb-1">
                <span className="text-muted-foreground">Budget</span>
                <span className="font-medium text-muted-foreground">${d.budget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-6">
                <span className="text-muted-foreground">Usage</span>
                <span className={`font-bold ${over ? "text-red-500" : "text-emerald-600"}`}>
                    {pct}%{over ? " ⚠" : ""}
                </span>
            </div>
        </div>
    );
}

export function DonutChart({ data, activeIndex, onHover }: DonutChartProps) {
    const total = data.reduce((s, d) => s + d.amount, 0);
    const activeItem = activeIndex !== null ? data[activeIndex] : null;

    return (
        <div className="relative">
            <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={72}
                        outerRadius={110}
                        paddingAngle={2}
                        dataKey="amount"
                        onMouseEnter={(_, index) => onHover(index)}
                        onMouseLeave={() => onHover(null)}
                        strokeWidth={0}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={entry.category}
                                fill={entry.color}
                                opacity={
                                    activeIndex === null || activeIndex === index ? 1 : 0.35
                                }
                                style={{ cursor: "pointer", transition: "opacity 0.15s" }}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>

            {/* Centre label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {activeItem ? (
                    <>
                        <span className="text-[11px] text-muted-foreground font-medium">{activeItem.label}</span>
                        <span className="text-xl font-bold text-foreground tabular-nums">
                            ${activeItem.amount.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                            {((activeItem.amount / total) * 100).toFixed(1)}% of total
                        </span>
                    </>
                ) : (
                    <>
                        <span className="text-[11px] text-muted-foreground font-medium">Total Spent</span>
                        <span className="text-xl font-bold text-foreground tabular-nums">
                            ${total.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-muted-foreground">this month</span>
                    </>
                )}
            </div>
        </div>
    );
}