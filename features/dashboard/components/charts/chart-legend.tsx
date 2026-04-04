const SERIES = [
    { label: "Balance", color: "#6366f1", dashed: false },
    { label: "Income", color: "#10b981", dashed: false },
    { label: "Expenses", color: "#f87171", dashed: false },
    { label: "Average", color: "#a5b4fc", dashed: true },
];

export function ChartLegend() {
    return (
        <div className="flex items-center gap-5 flex-wrap">
            {SERIES.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                    <span className="flex items-center w-5 h-[2px] relative">
                        {s.dashed ? (
                            <svg width="20" height="2" viewBox="0 0 20 2">
                                <line
                                    x1="0" y1="1" x2="20" y2="1"
                                    stroke={s.color}
                                    strokeWidth="1.5"
                                    strokeDasharray="3 2"
                                />
                            </svg>
                        ) : (
                            <span
                                className="w-full h-[2px] rounded-full"
                                style={{ background: s.color }}
                            />
                        )}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground">{s.label}</span>
                </div>
            ))}
        </div>
    );
}