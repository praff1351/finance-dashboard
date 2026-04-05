"use client";

import { useTransactionsStore } from "@/stores/use-transactions-store";

const CATEGORY_COLORS: Record<string, string> = {
    Housing: "bg-primary",
    "Food & Dining": "bg-emerald-400",
    Food: "bg-emerald-400",
    Subscriptions: "bg-amber-400",
    Transport: "bg-red-400",
    Health: "bg-blue-400",
    Entertainment: "bg-purple-400",
    Shopping: "bg-pink-400",
    Salary: "bg-teal-400",
    Rent: "bg-orange-400",
    Leisure: "bg-indigo-400",
    Other: "bg-muted-foreground/40",
};

function getColor(category: string): string {
    return CATEGORY_COLORS[category] ?? "bg-muted-foreground/40";
}

export function TopCategoriesCard() {
    const { transactions } = useTransactionsStore();

    // Sum expenses by category
    const expenses = transactions.filter(t => t.type === "expense");
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

    const byCategory = expenses.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {} as Record<string, number>);

    // Sort by amount descending, take top 4, group rest as "Other"
    const sorted = Object.entries(byCategory)
        .sort((a, b) => b[1] - a[1]);

    const top4 = sorted.slice(0, 4);
    const otherAmount = sorted.slice(4).reduce((sum, [, v]) => sum + v, 0);

    const categories = [
        ...top4.map(([label, amount]) => ({
            label,
            amount,
            pct: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0,
            color: getColor(label),
        })),
        ...(otherAmount > 0 ? [{
            label: "Other",
            amount: otherAmount,
            pct: totalExpenses > 0 ? Math.round((otherAmount / totalExpenses) * 100) : 0,
            color: "bg-muted-foreground/40",
        }] : []),
    ];

    return (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-5 col-span-3">
            <div className="mb-5">
                <p className="text-sm font-semibold text-foreground">Top Categories</p>
                <p className="text-xs text-muted-foreground mt-0.5">Spending breakdown</p>
            </div>

            {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <span className="text-2xl mb-2">📊</span>
                    <p className="text-sm font-semibold text-foreground">No spending yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Add expense transactions to see your top categories.
                    </p>
                </div>
            ) : (
                <>
                    {/* Stacked bar */}
                    <div className="flex rounded-full overflow-hidden h-2 mb-5 gap-0.5">
                        {categories.map((c) => (
                            <div
                                key={c.label}
                                className={`${c.color} rounded-full`}
                                style={{ width: `${c.pct}%` }}
                            />
                        ))}
                    </div>

                    <div className="space-y-2.5">
                        {categories.map((c) => (
                            <div key={c.label} className="flex items-center gap-3">
                                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${c.color}`} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-muted-foreground">{c.label}</span>
                                        <span className="text-xs font-semibold text-foreground tabular-nums">
                                            ${c.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    <div className="h-1 rounded-full bg-muted overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${c.color}`}
                                            style={{ width: `${c.pct}%` }}
                                        />
                                    </div>
                                </div>
                                <span className="text-[11px] text-muted-foreground w-8 text-right tabular-nums">
                                    {c.pct}%
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}