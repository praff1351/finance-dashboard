"use client";

import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import { useUserStore } from "@/stores/use-user-store";

export const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => {
    const { name, email } = useUserStore();
    const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase();

    return (
        <div className="flex flex-col h-full bg-sidebar">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            {/* Logo / Header */}
            <div
                className={cn(
                    "flex items-center h-16 px-3 border-b border-sidebar-border",
                    collapsed ? "justify-center" : "justify-between gap-2"
                )}
            >
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-md shadow-primary/25 text-primary-foreground">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="text-white"
                            >
                                <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.9" />
                                <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.6" />
                                <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.6" />
                                <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.9" />
                            </svg>
                        </div>
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-sidebar shadow-sm" />
                    </div>

                    {!collapsed && (
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-sidebar-foreground tracking-tight leading-none">
                                Dashify
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-0.5 tracking-widest uppercase">
                                Workspace
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Section label */}
            {!collapsed && (
                <div className="px-4 pt-5 pb-1">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                        Menu
                    </span>
                </div>
            )}

            {/* Nav items */}
            <nav className="flex-1 px-2.5 py-2 space-y-0.5">
                <SidebarItem icon="home" label="Home" href="/" />
                <SidebarItem icon="bar-chart" label="Transactions" href="/transactions" />
                <SidebarItem icon="trending-up" label="Insights" href="/insights" />
                <SidebarItem icon="settings" label="Settings" href="/settings" />
            </nav>

            {/* Footer */}
            <div
                className={cn(
                    "p-2.5 border-t border-sidebar-border flex items-center mt-auto",
                    collapsed ? "flex-col gap-2 justify-center" : "justify-between"
                )}
            >
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-linear-to-br from-pink-400 to-rose-400 shrink-0 flex items-center justify-center text-[11px] font-bold text-white shadow-sm shadow-rose-200">
                        {initials}
                    </div>
                    {!collapsed && (
                        <div className="overflow-hidden">
                            <p className="text-xs font-semibold text-sidebar-foreground leading-none truncate">{name}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{email}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
