"use client";

import { useState } from "react";
import { TimeRange, BalanceDataPoint } from "../../types/balance-types";
import { TimeRangeTabs } from "../charts/time-range-tabs";
import { TrendSummary } from "../shared/trend-summary";
import { BalanceChart } from "../charts/balance-chart";
import { ChartLegend } from "../charts/chart-legend";
import { Skeleton } from "@/components/ui/skeleton";
import { useBalanceTrend } from "../../hooks/useBalanceTrend";

export function BalanceTrendCard() {
    const [range, setRange] = useState<TimeRange>("1M");
    const { data, isLoading, isError } = useBalanceTrend(range);

    if (isLoading) return <BalanceTrendSkeleton />;

    if (isError) {
        return (
            <div className="bg-card rounded-2xl border border-destructive/30 p-8 flex flex-col items-center justify-center text-center">
                <h3 className="text-lg font-bold text-foreground">Failed to load data</h3>
                <p className="text-sm text-muted-foreground mt-1">Something went wrong.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const latest = data?.[data.length - 1]?.balance ?? 0;

    return (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 animate-in fade-in duration-500">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                        Balance Trend
                    </p>
                    <p className="text-3xl font-bold text-foreground tracking-tight tabular-nums">
                        ${latest.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">Current balance</p>
                </div>

                <div className="flex flex-col items-end gap-3">
                    <TimeRangeTabs value={range} onChange={setRange} />
                    {data && data.length > 0 && <TrendSummary data={data} />}
                </div>
            </div>

            {/* Empty state */}
            {(!data || data.every(d => d.income === 0 && d.expenses === 0)) ? (
                <div className="h-[180px] flex flex-col items-center justify-center text-center rounded-xl bg-muted/30">
                    <p className="text-sm font-semibold text-foreground">No data yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Add transactions to see your balance trend.
                    </p>
                </div>
            ) : (
                <BalanceChart data={data} range={range} />
            )}

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-border/60">
                <ChartLegend />
            </div>
        </div>
    );
}

function BalanceTrendSkeleton() {
    return (
        <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex flex-col sm:items-start justify-between gap-4 mb-8">
                <div className="space-y-3">
                    <Skeleton className="h-3 w-24 bg-muted" />
                    <Skeleton className="h-10 w-48 bg-muted" />
                    <Skeleton className="h-3 w-32 bg-muted" />
                </div>
                <div className="flex flex-col items-end gap-4 w-full sm:w-auto">
                    <Skeleton className="h-9 w-64 bg-muted" />
                    <Skeleton className="h-5 w-32 bg-muted ml-auto" />
                </div>
            </div>
            <Skeleton className="h-[180px] w-full bg-muted/50 rounded-xl" />
            <div className="mt-6 pt-4 border-t border-border/60 flex gap-4">
                <Skeleton className="h-4 w-20 bg-muted" />
                <Skeleton className="h-4 w-20 bg-muted" />
            </div>
        </div>
    );
}