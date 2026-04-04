import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type SparkPoint = { value: number };

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: LucideIcon;
    accent: "indigo" | "green" | "red" | "amber";
    sparkData: SparkPoint[];
}

const accentConfig = {
    indigo: {
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
        badgeBg: "bg-primary/10",
        badgeText: "text-primary",
        strokeColor: "var(--primary)",
        fillColor: "color-mix(in oklch, var(--primary) 18%, transparent)",
    },
    green: {
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
        badgeBg: "bg-emerald-50",
        badgeText: "text-emerald-600",
        strokeColor: "#10b981",
        fillColor: "#10b98120",
    },
    red: {
        iconBg: "bg-red-50",
        iconColor: "text-red-400",
        badgeBg: "bg-red-50",
        badgeText: "text-red-500",
        strokeColor: "#f87171",
        fillColor: "#f8717120",
    },
    amber: {
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        badgeBg: "bg-amber-50",
        badgeText: "text-amber-600",
        strokeColor: "#f59e0b",
        fillColor: "#f59e0b20",
    },
};

function MiniSparkline({
    data,
    strokeColor,
    fillColor,
}: {
    data: SparkPoint[];
    strokeColor: string;
    fillColor: string;
}) {
    const width = 150;
    const height = 40;

    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const points = values.map((v, i) => {
        const x = (i / (values.length - 1)) * width;
        const y = height - ((v - min) / range) * (height - 8) - 4;
        return { x, y };
    });

    // 👉 Create smooth curve using quadratic bezier
    const getSmoothPath = () => {
        if (points.length < 2) return "";

        let d = `M ${points[0].x},${points[0].y}`;

        for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            d += ` Q ${points[i].x},${points[i].y} ${xc},${yc}`;
        }

        // last point
        const last = points[points.length - 1];
        d += ` T ${last.x},${last.y}`;

        return d;
    };

    const linePath = getSmoothPath();

    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
        >
            {/* Area */}
            <path d={areaPath} fill={fillColor} />

            {/* Smooth Line */}
            <path
                d={linePath}
                stroke={strokeColor}
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function StatCard({
    title,
    value,
    change,
    positive,
    icon: Icon,
    accent,
    sparkData,
}: StatCardProps) {
    const cfg = accentConfig[accent];

    return (
        <div className="bg-card relative rounded-2xl border border-border shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
            {/* Top row: icon + badge */}
            <div className="flex items-start justify-between">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", cfg.iconBg)}>
                    <Icon className={cn("w-4 h-4", cfg.iconColor)} />
                </div>
                <span
                    className={cn(
                        "text-[11px] font-semibold px-2 py-0.5 rounded-full",
                        positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                    )}
                >
                    {change}
                </span>
            </div>

            {/* Middle: value + title */}
            <div>
                <p className="text-[13px] text-muted-foreground font-medium">{title}</p>
                <p className="text-2xl font-bold text-foreground tracking-tight mt-0.5">{value}</p>
            </div>

            {/* Bottom: sparkline aligned right */}
            <div className="flex absolute items-end right-2 bottom-2 justify-end mt-1">
                <MiniSparkline
                    data={sparkData}
                    strokeColor={cfg.strokeColor}
                    fillColor={cfg.fillColor}
                />
            </div>
        </div>
    );
}