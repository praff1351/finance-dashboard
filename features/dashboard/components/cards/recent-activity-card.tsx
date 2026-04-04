const activities = [
    { label: "Salary Deposit", date: "Today, 9:00 AM", amount: "+$5,400.00", positive: true },
    { label: "Netflix Subscription", date: "Today, 8:30 AM", amount: "-$15.99", positive: false },
    { label: "AWS Invoice", date: "Yesterday", amount: "-$238.00", positive: false },
    { label: "Freelance Payment", date: "Jun 28", amount: "+$1,200.00", positive: true },
    { label: "Spotify", date: "Jun 27", amount: "-$9.99", positive: false },
];

export function RecentActivityCard() {
    return (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-5 col-span-4">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <p className="text-sm font-semibold text-foreground">Recent Activity</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Your latest transactions</p>
                </div>
                <button type="button" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                    View all →
                </button>
            </div>

            <div className="space-y-1">
                {activities.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${item.positive ? "bg-emerald-50" : "bg-red-50"
                                    }`}
                            >
                                <span
                                    className={`text-sm font-bold ${item.positive ? "text-emerald-500" : "text-red-400"
                                        }`}
                                >
                                    {item.positive ? "↑" : "↓"}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                        </div>
                        <span
                            className={`text-sm font-semibold tabular-nums ${item.positive ? "text-emerald-600" : "text-red-500"
                                }`}
                        >
                            {item.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}