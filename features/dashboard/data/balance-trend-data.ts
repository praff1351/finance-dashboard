import { BalanceDataPoint, TimeRange } from "../types/balance-types";

function generateData(days: number, baseBalance: number, seed: number = 1): BalanceDataPoint[] {
    const data: BalanceDataPoint[] = [];
    let balance = baseBalance;
    
    // Fixed reference date to avoid hydration mismatches around midnight
    // April 3rd, 2026 to match current context
    const now = new Date("2026-04-03T12:00:00Z");

    // Simple deterministic pseudo-random number generator
    const random = (s: number) => {
        let t = (s += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    let s = seed;

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);

        // Get two different random values using the current seed
        const r1 = random(s++);
        const r2 = random(s++);

        const income = Math.round((r1 * 800 + 200) * 100) / 100;
        const expenses = Math.round((r2 * 800 + 200) * 100) / 100;
        balance = Math.round((balance + income - expenses) * 100) / 100;

        data.push({
            date: date.toISOString().split("T")[0],
            balance,
            income,
            expenses,
        });
    }
    return data;
}

export const BALANCE_TREND_DATA: Record<TimeRange, BalanceDataPoint[]> = {
    "7D": generateData(7, 0, 123),
    "1M": generateData(30, 8000, 456),
    "3M": generateData(90, 7000, 789),
    "6M": generateData(180, 6000, 101),
    "1Y": generateData(365, 5000, 202),
};