import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { BalanceDataPoint } from "../../types/balance-types";

interface TrendSummaryProps {
    data: BalanceDataPoint[];
}

export function TrendSummary({ data }: TrendSummaryProps) {
    if (data.length < 2) return null;

    const first = data[0].balance;
    const last = data[data.length - 1].balance;
    const diff = last - first;
    const pct = ((diff / first) * 100).toFixed(2);
    const positive = diff >= 0;

    const totalIncome = data.reduce((s, d) => s + d.income, 0);
    const totalExpenses = data.reduce((s, d) => s + d.expenses, 0);

    const fmt = (n: number) =>
        n >= 1000
            ? `$${(n / 1000).toFixed(1)}k`
            : `$${n.toFixed(0)}`;

    const items = [
        {
            label: "Net Change",
            value: `${positive ? "+" : ""}${fmt(diff)}`,
            sub: `${positive ? "+" : ""}${pct}%`,
            positive,
        },
        {
            label: "Total Income",
            value: fmt(totalIncome),
            sub: "received",
            positive: true,
        },
        {
            label: "Total Expenses",
            value: fmt(totalExpenses),
            sub: "spent",
            positive: false,
        },
    ];

    return (
        <div className="flex items-center gap-6">
            {items.map((item, i) => (
                <div key={i} className="flex flex-col">
                    <span className="text-[11px] text-muted-foreground font-medium">{item.label}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                        <span
                            className={cn(
                                "text-sm font-bold tabular-nums",
                                item.label === "Net Change"
                                    ? item.positive ? "text-emerald-600" : "text-red-500"
                                    : item.label === "Total Income"
                                        ? "text-emerald-600"
                                        : "text-red-500"
                            )}
                        >
                            {item.value}
                        </span>
                        {item.label === "Net Change" && (
                            item.positive
                                ? <TrendingUp className="w-3 h-3 text-emerald-500" />
                                : <TrendingDown className="w-3 h-3 text-red-400" />
                        )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{item.sub}</span>
                </div>
            ))}
        </div>
    );
}