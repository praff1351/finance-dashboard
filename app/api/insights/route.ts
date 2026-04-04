import { NextResponse } from "next/server";
import { MOCK_INSIGHTS } from "@/features/dashboard/data/insights-data";

export async function GET() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    return NextResponse.json(MOCK_INSIGHTS);
}
