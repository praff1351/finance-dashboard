import { BalanceTrendCard } from "@/features/dashboard/components/cards/balance-trend-card";
import { RecentActivityCard } from "@/features/dashboard/components/cards/recent-activity-card";
import { SpendingBreakdownCard } from "@/features/dashboard/components/cards/spending-breakdown-card";
import { StatCardsGrid } from "@/features/dashboard/components/cards/stat-cards-grid";
import { TopCategoriesCard } from "@/features/dashboard/components/cards/top-categories-card";
import { LayoutDashboardIcon } from "lucide-react";


export default function DashboardPage() {
    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 bg-muted/30 min-h-screen">
            {/* Header */}
            <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-md shadow-primary/25 text-primary-foreground shrink-0">
                        <LayoutDashboardIcon className="w-5 h-5" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground truncate">Dashboard Overview</h1>
                </div>
                <p className="text-muted-foreground font-medium px-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    Welcome back — here's what's happening with your finances.
                </p>
            </div>

            {/* Stat cards */}
            <StatCardsGrid />

            <div>
                <BalanceTrendCard />
            </div>
            <div>
                <SpendingBreakdownCard />
            </div>

            {/* Bottom row */}
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <RecentActivityCard />
                </div>
                <div className="lg:col-span-3">
                    <TopCategoriesCard />
                </div>
            </div>

        </div>
    );
}