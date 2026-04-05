"use client";

import { useTransactionsStore } from "@/stores/use-transactions-store";
import { useRouter } from "next/navigation";

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function RecentActivityCard() {
    const { transactions } = useTransactionsStore();
    const router = useRouter();

    // Sort by date descending, take latest 5
    const recent = [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    return (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-5 col-span-4">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <p className="text-sm font-semibold text-foreground">Recent Activity</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Your latest transactions</p>
                </div>
                <button
                    type="button"
                    onClick={() => router.push("/transactions")}
                    className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                    View all →
                </button>
            </div>

            {recent.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <span className="text-2xl mb-2">💳</span>
                    <p className="text-sm font-semibold text-foreground">No transactions yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Add a transaction to see your activity here.
                    </p>
                </div>
            ) : (
                <div className="space-y-1">
                    {recent.map((item) => {
                        const positive = item.type === "income";
                        return (
                            <div
                                key={item.id}
                                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${positive ? "bg-emerald-50" : "bg-red-50"}`}>
                                        <span className={`text-sm font-bold ${positive ? "text-emerald-500" : "text-red-400"}`}>
                                            {positive ? "↑" : "↓"}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{item.description}</p>
                                        <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
                                    </div>
                                </div>
                                <span className={`text-sm font-semibold tabular-nums ${positive ? "text-emerald-600" : "text-red-500"}`}>
                                    {positive ? "+" : "-"}${item.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}