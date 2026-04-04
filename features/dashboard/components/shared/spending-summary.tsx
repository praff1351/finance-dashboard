import { CategoryDataPoint } from "../../types/spending-breakdown";

interface SpendingSummaryProps {
    data: CategoryDataPoint[];
}

export function SpendingSummary({ data }: SpendingSummaryProps) {
    const totalSpent = data.reduce((s, d) => s + d.amount, 0);
    const totalBudget = data.reduce((s, d) => s + d.budget, 0);
    const overBudget = data.filter((d) => d.amount > d.budget).length;
    const usagePct = ((totalSpent / totalBudget) * 100).toFixed(0);

    return (
        <div className="flex items-center gap-6">
            <div>
                <p className="text-[11px] text-muted-foreground font-medium">Total Spent</p>
                <p className="text-sm font-bold text-foreground tabular-nums mt-0.5">
                    ${totalSpent.toLocaleString()}
                </p>
            </div>
            <div>
                <p className="text-[11px] text-muted-foreground font-medium">Total Budget</p>
                <p className="text-sm font-bold text-muted-foreground tabular-nums mt-0.5">
                    ${totalBudget.toLocaleString()}
                </p>
            </div>
            <div>
                <p className="text-[11px] text-muted-foreground font-medium">Usage</p>
                <p className={`text-sm font-bold tabular-nums mt-0.5 ${Number(usagePct) > 100 ? "text-red-500" : "text-emerald-600"
                    }`}>
                    {usagePct}%
                </p>
            </div>
            {overBudget > 0 && (
                <div className="ml-auto">
                    <span className="text-[11px] font-semibold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full">
                        {overBudget} categor{overBudget > 1 ? "ies" : "y"} over budget
                    </span>
                </div>
            )}
        </div>
    );
}