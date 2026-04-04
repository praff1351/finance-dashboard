import { NextRequest, NextResponse } from "next/server";
import { BALANCE_TREND_DATA } from "@/features/dashboard/data/balance-trend-data";
import { TimeRange } from "@/features/dashboard/types/balance-types";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const range = (searchParams.get("range") as TimeRange) || "1M";

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const data = BALANCE_TREND_DATA[range];

    if (!data) {
        return NextResponse.json({ error: "Invalid range" }, { status: 400 });
    }

    return NextResponse.json(data);
}
