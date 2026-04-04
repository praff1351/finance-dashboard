"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { SidebarContent } from "./sidebar-content";

export const Sidebar = () => {
    const { collapsed, toggle } = useSidebar();

    return (
        <aside
            className={cn(
                "relative h-screen flex-col transition-all duration-150 ease-in-out shrink-0 hidden md:flex",
                "bg-sidebar border-r border-sidebar-border",
                collapsed ? "w-[68px]" : "w-[248px]"
            )}
        >
            <div className="flex-1 overflow-y-auto">
                <SidebarContent collapsed={collapsed} />
            </div>

            {/* Toggle button overlay */}
            <div className="absolute top-4 right-[-14px] z-10 hidden lg:block">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={toggle}
                    className="w-7 h-7 rounded-full bg-background border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                    {collapsed ? (
                        <PanelLeftOpen className="w-3.5 h-3.5" />
                    ) : (
                        <PanelLeftClose className="w-3.5 h-3.5" />
                    )}
                </Button>
            </div>

            {/* Alternative toggle implementation similar to original for consistency */}
            {!collapsed ? (
                <div className="absolute hidden top-4 right-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggle}
                        className="w-7 h-7 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                        <PanelLeftClose className="w-4 h-4" />
                    </Button>
                </div>
            ) : (
                <div className="absolute hidden bottom-4 left-1/2 -translate-x-1/2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggle}
                        className="w-7 h-7 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                        <PanelLeftOpen className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </aside>
    );
};