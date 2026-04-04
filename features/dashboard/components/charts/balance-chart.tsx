"use client";

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { BalanceDataPoint } from "../../types/balance-types";
import { TimeRange } from "../../types/balance-types";
import { format, parseISO } from "date-fns";

interface BalanceChartProps {
    data: BalanceDataPoint[];
    range: TimeRange;
}

const formatLabel: Record<TimeRange, string> = {
    "7D": "EEE",
    "1M": "MMM d",
    "3M": "MMM d",
    "6M": "MMM",
    "1Y": "MMM yy",
};

function tickFormatter(dateStr: string, range: TimeRange) {
    try {
        return format(parseISO(dateStr), formatLabel[range]);
    } catch {
        return dateStr;
    }
}

interface CustomToolTipProps {
    active: boolean;
    payload: {
        dataKey: string;
        color: string;
        value: number;
    }[];
    label: string;
}

interface CustomToolTipPayload {
    dataKey: string;
    color: string;
    value: number;
}
function CustomTooltip({ active, payload, label }: CustomToolTipProps) {
    if (!active || !payload?.length) return null;

    let formatted = label;
    try { formatted = format(parseISO(label), "MMM d, yyyy"); } catch { }

    return (
        <div className="bg-popover border border-border rounded-xl shadow-lg p-3 text-xs min-w-[150px] text-popover-foreground">
            <p className="text-muted-foreground font-medium mb-2">{formatted}</p>
            {payload.map((p: CustomToolTipPayload) => (
                <div key={p.dataKey} className="flex items-center justify-between gap-4 mb-1">
                    <span className="flex items-center gap-1.5 text-muted-foreground capitalize">
                        <span
                            className="w-2 h-2 rounded-full inline-block"
                            style={{ background: p.color }}
                        />
                        {p.dataKey}
                    </span>
                    <span className="font-bold tabular-nums" style={{ color: p.color }}>
                        ${p.value.toLocaleString()}
                    </span>
                </div>
            ))}
        </div>
    );
}

// Thin out data points for dense ranges so the chart stays readable
function downsample(data: BalanceDataPoint[], maxPoints: number) {
    if (data.length <= maxPoints) return data;
    const step = Math.ceil(data.length / maxPoints);
    return data.filter((_, i) => i % step === 0 || i === data.length - 1);
}

export function BalanceChart({ data, range }: BalanceChartProps) {
    const maxPoints: Record<TimeRange, number> = {
        "7D": 7, "1M": 30, "3M": 30, "6M": 24, "1Y": 24,
    };
    const chartData = downsample(data, maxPoints[range]);

    const avgBalance = data.reduce((s, d) => s + d.balance, 0) / data.length;

    return (
        <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData} margin={{ top: 10, right: 4, bottom: 0, left: 0 }}>
                <defs>
                    <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.12} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f87171" stopOpacity={0.12} />
                        <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
                    </linearGradient>
                </defs>

                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                />

                <ReferenceLine
                    y={avgBalance}
                    stroke="var(--primary)"
                    strokeDasharray="4 4"
                    strokeOpacity={0.3}
                    label={{
                        value: "avg",
                        position: "insideTopRight",
                        fontSize: 10,
                        fill: "var(--primary)",
                    }}
                />

                <XAxis
                    dataKey="date"
                    tickFormatter={(v) => tickFormatter(v, range)}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    interval="preserveStartEnd"
                />

                <YAxis
                    tickFormatter={(v) =>
                        v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
                    }
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={4}
                    width={48}
                />

                <Tooltip content={<CustomTooltip active={true} payload={[]} label="" />} />

                <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#10b981"
                    strokeWidth={1.5}
                    fill="url(#incomeGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "var(--background)" }}
                />
                <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#f87171"
                    strokeWidth={1.5}
                    fill="url(#expenseGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#f87171", strokeWidth: 2, stroke: "var(--background)" }}
                />
                <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    fill="url(#balanceGrad)"
                    dot={false}
                    activeDot={{ r: 5, fill: "var(--primary)", strokeWidth: 2, stroke: "var(--background)" }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}