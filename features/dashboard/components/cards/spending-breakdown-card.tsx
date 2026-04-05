"use client";

import { useState } from "react";
import { ChartView } from "../../types/spending-breakdown";
import { ChartViewToggle } from "../charts/chart-view-toggle";
import { DonutChart } from "../charts/donut-chart";
import { BarChartView } from "../charts/bar-chart-view";
import { CategoryLegend } from "../charts/category-legend";
import { SpendingSummary } from "../shared/spending-summary";
import { useSpendingBreakdown } from "../../hooks/useSpendingBreakdown";

export function SpendingBreakdownCard() {
    const [view, setView] = useState<ChartView>("donut");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const data = useSpendingBreakdown();

    const now = new Date();
    const monthLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    return (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                        Spending Breakdown
                    </p>
                    <p className="text-lg font-bold text-foreground">Category Analysis</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Actual spend vs. budget — {monthLabel}
                    </p>
                </div>
                <ChartViewToggle value={view} onChange={setView} />
            </div>

            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <span className="text-3xl mb-3">🍩</span>
                    <p className="text-sm font-semibold text-foreground">No spending data yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Add expense transactions to see your spending breakdown.
                    </p>
                </div>
            ) : (
                <>
                    {/* Summary KPIs */}
                    <div className="mb-5 pb-5 border-b border-border/60">
                        <SpendingSummary data={data} />
                    </div>

                    {/* Chart + Legend side by side */}
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                        <div className="w-full lg:w-[280px] shrink-0">
                            {view === "donut" ? (
                                <DonutChart
                                    data={data}
                                    activeIndex={activeIndex}
                                    onHover={setActiveIndex}
                                />
                            ) : (
                                <BarChartView
                                    data={data}
                                    activeIndex={activeIndex}
                                    onHover={setActiveIndex}
                                />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <CategoryLegend
                                data={data}
                                activeIndex={activeIndex}
                                onHover={setActiveIndex}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}