export type SpendingCategory =
    | "housing"
    | "food"
    | "transport"
    | "subscriptions"
    | "health"
    | "entertainment"
    | "shopping"
    | "other";

export interface CategoryDataPoint {
    category: SpendingCategory;
    label: string;
    amount: number;
    budget: number;
    color: string;
    iconKey: string;
}

export type ChartView = "donut" | "bar";