import { InsightsSection } from "@/features/dashboard/components/insights/insights-section";
import { CalendarCheck, CreditCard, PiggyBank, ShieldCheck, SparklesIcon, TrendingUp } from "lucide-react";



const TIPS =[
    {
        icon:PiggyBank,
        title: "Pay Yourself First",
        description: "Set aside savings as soon as income arrives, before spending on anything else."
    },
    {
        icon:CalendarCheck,
        title: "Review Monthly",
        description: "Check your transactions at the end of each month to spot patterns and cut waste."
    },
    {
        icon:CreditCard,
        title: "Watch Subscriptions",
        description: "Recurring charges add up fast. Cancel anything you haven't used in 30 days.",
    },
    {
        icon:ShieldCheck,
        title: "Keep an Emergency Fund",
        description: "Aim to have 3-6 months of expenses saved before investing elsewhere.",
    },
    
    
]




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
                                A summary of your spending and savings behaviour.
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

                <div className="">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-foreground">
                            Smart Financial Tips
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Simple habits to improve your financial health.
                        </p> 
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {TIPS.map((tip)=>(
                            <div
                            key={tip.title}
                            className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-sm hover:border-primary/30 transition-all"  
                            >
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <tip.icon className="w-5 h-5 text-primary" />
                                </div>


                                <div className="">
                                    <h3 className="font-semibold text-sm text-foreground">
                                        {tip.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                        {tip.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> 
            </div>
        </div>
    );
}
