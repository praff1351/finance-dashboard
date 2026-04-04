export type InsightStatus = "info" | "success" | "warning";

export interface Insight {
    id: string;
    type: "highest-spending" | "monthly-comparison" | "observation";
    title: string;
    value: string;
    description: string;
    status: InsightStatus;
    iconName: string; // Name of Lucide icon
}
