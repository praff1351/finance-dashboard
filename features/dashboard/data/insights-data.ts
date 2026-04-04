import { Insight } from "../types/insight-types";

export const MOCK_INSIGHTS: Insight[] = [
    {
        id: "highest-spending",
        type: "highest-spending",
        title: "Highest Spending Category",
        value: "Dining & Drinks",
        description: "This makes up 32% of your total spending this month. Consider setting a budget.",
        status: "warning",
        iconName: "Utensils",
    },
    {
        id: "monthly-comparison",
        type: "monthly-comparison",
        title: "Monthly Trend",
        value: "-12.5%",
        description: "Your total spending is 12.5% lower than this time last month. Great job!",
        status: "success",
        iconName: "TrendingDown",
    },
    {
        id: "useful-observation",
        type: "observation",
        title: "Savings Opportunity",
        value: "$240 / year",
        description: "You have 3 recurring subscriptions for streaming services you rarely use.",
        status: "info",
        iconName: "Lightbulb",
    },
];
