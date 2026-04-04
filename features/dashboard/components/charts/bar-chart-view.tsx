"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Cell, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { CategoryDataPoint } from "../../types/spending-breakdown";

interface BarChartViewProps {
    data: CategoryDataPoint[];
    activeIndex: number | null;
    onHover: (index: number | null) => void;
}

function CustomTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    const d: CategoryDataPoint = payload[0].payload;
    const over = d.amount > d.budget;
    const diff = Math.abs(d.amount - d.budget);

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
                <span className="text-muted-foreground">${d.budget.toLocaleString()}</span>
            </div>
            <div className={`text-[11px] font-semibold mt-1 ${over ? "text-red-500" : "text-emerald-600"}`}>
                {over ? `$${diff} over budget ⚠` : `$${diff} under budget ✓`}
            </div>
        </div>
    );
}

export function BarChartView({ data, activeIndex, onHover }: BarChartViewProps) {
    return (
        <ResponsiveContainer width="100%" height={260}>
            <BarChart
                data={data}
                margin={{ top: 10, right: 4, bottom: 0, left: 0 }}
                barCategoryGap="28%"
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

                <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    interval={0}
                    tickFormatter={(v) => v.split(" ")[0]} // shorten labels
                />
                <YAxis
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={4}
                    width={44}
                />

                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />

                {/* Budget reference bars rendered as thin lines via ReferenceLine per entry */}
                {data.map((d, i) => (
                    <ReferenceLine
                        key={`budget-${i}`}
                        // This doesn't work per-bar natively; we use a second Bar below instead
                        y={d.budget}
                        stroke="transparent"
                    />
                ))}

                {/* Budget bars (faint) */}
                <Bar dataKey="budget" radius={[4, 4, 0, 0]} maxBarSize={40}>
                    {data.map((entry, index) => (
                        <Cell
                            key={`budget-${index}`}
                            fill={entry.color}
                            fillOpacity={0.15}
                        />
                    ))}
                </Bar>

                {/* Actual spend bars */}
                <Bar
                    dataKey="amount"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                    onMouseEnter={(_, index) => onHover(index)}
                    onMouseLeave={() => onHover(null)}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`amount-${index}`}
                            fill={entry.amount > entry.budget ? "#f87171" : entry.color}
                            fillOpacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                            style={{ cursor: "pointer", transition: "opacity 0.15s" }}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}