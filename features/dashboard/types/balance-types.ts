export type TimeRange = "7D" | "1M" | "3M" | "6M" | "1Y";

export interface BalanceDataPoint {
    date: string;       // ISO string e.g. "2024-06-01"
    balance: number;
    income: number;
    expenses: number;
}