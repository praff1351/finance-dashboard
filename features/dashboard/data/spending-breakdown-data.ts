import { CategoryDataPoint } from "../types/spending-breakdown";

export const SPENDING_DATA: CategoryDataPoint[] = [
    { category: "housing", label: "Housing", amount: 1565, budget: 1600, color: "#6366f1", iconKey: "home" },
    { category: "food", label: "Food & Dining", amount: 989, budget: 1000, color: "#10b981", iconKey: "utensils" },
    { category: "subscriptions", label: "Subscriptions", amount: 742, budget: 800, color: "#f59e0b", iconKey: "repeat" },
    { category: "transport", label: "Transport", amount: 494, budget: 500, color: "#3b82f6", iconKey: "car" },
    { category: "health", label: "Health", amount: 380, budget: 400, color: "#ec4899", iconKey: "heart-pulse" },
    { category: "entertainment", label: "Entertainment", amount: 290, budget: 300, color: "#8b5cf6", iconKey: "tv" },
    { category: "shopping", label: "Shopping", amount: 430, budget: 350, color: "#f87171", iconKey: "shopping-bag" },
    { category: "other", label: "Other", amount: 233, budget: 250, color: "#94a3b8", iconKey: "more-horizontal" },
];