const categories = [
    { label: "Housing", pct: 38, amount: "$1,565", color: "bg-primary" },
    { label: "Food & Dining", pct: 24, amount: "$989", color: "bg-emerald-400" },
    { label: "Subscriptions", pct: 18, amount: "$742", color: "bg-amber-400" },
    { label: "Transport", pct: 12, amount: "$494", color: "bg-red-400" },
    { label: "Other", pct: 8, amount: "$329", color: "bg-muted-foreground/40" },
];

export function TopCategoriesCard() {
    return (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-5 col-span-3">
            <div className="mb-5">
                <p className="text-sm font-semibold text-foreground">Top Categories</p>
                <p className="text-xs text-muted-foreground mt-0.5">Spending breakdown</p>
            </div>

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
                                    {c.amount}
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
        </div>
    );
}