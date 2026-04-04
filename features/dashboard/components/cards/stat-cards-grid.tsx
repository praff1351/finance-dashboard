"use client";

import {
    DollarSignIcon,
    TrendingUpIcon,
    UsersIcon,
    WalletIcon,
} from "lucide-react";

import { StatCard } from "./stat-card";
import { useStats } from "@/features/dashboard/hooks/useStats";

const iconMap = {
    balance: WalletIcon,
    income: TrendingUpIcon,
    expenses: DollarSignIcon,
    users: UsersIcon,
};

export function StatCardSkeleton() {
    return (
        <div className="rounded-2xl border border-border p-4 space-y-3 animate-pulse bg-card">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-6 w-32 bg-muted rounded" />
            <div className="h-4 w-16 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded" />
        </div>
    );
}

export function StatCardsGrid() {
    const { data, isLoading, isError } = useStats();

    console.log(data, "data -> ")

    if (isLoading) {
        return (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <StatCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500">Failed to load stats</div>;
    }

    // 👉 transform API response → UI format
    const cards = data.map((item: any) => {
        // Fallback mapping if 'type' is missing in API response
        const type = item.type || item.accent;
        const icon = iconMap[type as keyof typeof iconMap] || WalletIcon;

        return {
            title: item.title,
            value: item.value,
            change: item.change,
            positive: item.positive,
            icon,
            accent: item.accent,
            sparkData: item.sparkData,
        };
    });


    return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card: any) => (
                <StatCard key={card.title} {...card} />
            ))}
        </div>
    );
}