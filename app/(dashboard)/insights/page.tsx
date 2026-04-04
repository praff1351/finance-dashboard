import { InsightsSection } from "@/features/dashboard/components/insights/insights-section";
import { SparklesIcon, TrendingUp } from "lucide-react";

export default function InsightsPage() {
    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header Section */}
            <div>
                <div className="mx-auto p-4 sm:p-6 md:p-8">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2.5">
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-md shadow-primary/25 text-primary-foreground shrink-0">
                                    <SparklesIcon className="w-5 h-5" />
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground truncate">Insights</h1>
                            </div>
                            <p className="text-muted-foreground font-medium px-1 flex items-center gap-1.5 text-xs sm:text-sm">
                                AI-powered analysis of your spending and savings behavior.
                            </p>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Updated just now
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Based on latest transactions
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="mx-auto p-4 sm:p-6 md:p-8 space-y-8">
                {/* Key Highlights */}
                <div>
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-foreground">
                            Key Highlights
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Your most important financial metrics at a glance
                        </p>
                    </div>
                    <InsightsSection />
                </div>

                {/* Coming Soon Features */}
                <div>
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-foreground">
                            Coming Soon
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            New features to enhance your financial analysis
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* AI Deep Insights */}
                        <div className="border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-sm transition bg-card/50">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1 text-left">
                                    <h3 className="font-semibold text-foreground">
                                        AI Deep Insights
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Advanced AI analysis to predict savings & optimize spending patterns.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Historical Comparison */}
                        <div className="border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-sm transition bg-card/50">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1 text-left">
                                    <h3 className="font-semibold text-foreground">
                                        Historical Comparison
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Compare your financial performance across months and years.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
