"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks/use-sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Home, BarChart2, Settings, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
    home: Home,
    "bar-chart": BarChart2,
    settings: Settings,
    "trending-up": TrendingUp,
};

type Props = {
    icon: keyof typeof iconMap;
    label: string;
    href: string;
};

export const SidebarItem = ({ icon, label, href }: Props) => {
    const { collapsed } = useSidebar();
    const pathname = usePathname();
    const isActive = pathname === href;
    const Icon = iconMap[icon];

    const content = (
        <Link
            href={href}
            className={cn(
                "group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150",
                isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
        >
            {/* Active left bar */}
            {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-primary" />
            )}

            <Icon
                className={cn(
                    "shrink-0 w-4 h-4 transition-colors",
                    isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                )}
            />

            {!collapsed && (
                <span
                    className={cn(
                        "text-sm font-medium tracking-tight",
                        isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                    )}
                >
                    {label}
                </span>
            )}
        </Link>
    );

    if (!collapsed) return content;

    return (
        <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent
                side="right"
                className="bg-popover border border-border text-popover-foreground text-xs px-2.5 py-1.5 shadow-md"
            >
                {label}
            </TooltipContent>
        </Tooltip>
    );
};