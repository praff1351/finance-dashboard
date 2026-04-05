"use client";

import { Insight, InsightStatus } from "../../types/insight-types";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { useInsights } from "../../hooks/useInsights";

export function InsightsSection() {
    const { data, isLoading, isError } = useInsights();

    if (isLoading) return <InsightsSkeleton />;

    if (isError) {
        return (
            <div className="p-8 text-center border border-red-200 rounded-2xl bg-red-50/50">
                <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-lg">⚠️</span>
                    </div>
                </div>
                <p className="text-sm font-semibold text-red-900">Failed to load insights</p>
                <p className="text-xs text-red-700 mt-1">Please try again or contact support</p>
                <button
                    onClick={() => location.reload()}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="p-8 text-center border border-border rounded-2xl bg-muted/30">
                <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xl">📊</span>
                    </div>
                </div>
                <p className="text-sm font-semibold text-foreground">No insights yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                    Add some transactions to see your insights here.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {data.map((insight, index) => (
                <InsightCard key={insight.id} insight={insight} featured={index === 0} />
            ))}
        </div>
    );
}

function InsightCard({ insight, featured = false }: { insight: Insight; featured?: boolean }) {
    const Icon = (LucideIcons as any)[insight.iconName] || LucideIcons.Info;

    const statusStyles: Record<InsightStatus, string> = {
        success: "bg-emerald-500/10 border-emerald-500/20",
        warning: "bg-amber-500/10 border-amber-500/20",
        info: "bg-primary/10 border-primary/20",
    };

    const iconStyles: Record<InsightStatus, string> = {
        success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
        warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
        info: "bg-primary/15 text-primary",
    };

    return (
        <div
            className={cn(
                "group relative rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden",
                "hover:shadow-md hover:border-opacity-100",
                statusStyles[insight.status],
                featured && "md:col-span-2 border-border bg-card shadow-sm"
            )}
        >
            <div className={cn(
                "absolute top-0 left-0 right-0 h-1 transition-all",
                insight.status === "success" && "bg-emerald-500",
                insight.status === "warning" && "bg-amber-500",
                insight.status === "info" && "bg-primary"
            )} />

            <div className="relative p-5 flex items-start gap-4">
                <div className={cn("p-3 rounded-lg shrink-0 transition group-hover:scale-105", iconStyles[insight.status])}>
                    <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {insight.title}
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-foreground">
                        {insight.value}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {insight.description}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium opacity-0 group-hover:opacity-100 transition pt-1">
                        Click to explore →
                    </p>
                </div>
            </div>
        </div>
    );
}

function InsightsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="p-5 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                    <div className="h-1 bg-muted rounded-full mb-4" />
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted shrink-0" />
                        <div className="space-y-3 flex-1">
                            <div className="h-2 w-16 bg-muted rounded" />
                            <div className="h-6 w-32 bg-muted rounded" />
                            <div className="h-3 w-full bg-muted rounded" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}