"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOutIcon, SettingsIcon } from "lucide-react";

import { useUserStore } from "@/stores/use-user-store";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MobileSidebar } from "./mobile-sidebar";
import { getNavTitle } from "./nav-routes";

function userInitials(name: string, email: string): string {
    const trimmed = name.trim();
    if (trimmed.length >= 2) return trimmed.slice(0, 2).toUpperCase();
    if (trimmed.length === 1) return trimmed.toUpperCase();
    const local = email.split("@")[0] ?? "";
    return (local.slice(0, 2) || "?").toUpperCase();
}

export const Navbar = () => {
    const { name, email, avatarUrl, role } = useUserStore();
    const router = useRouter();
    const pathname = usePathname();
    const title = getNavTitle(pathname);

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-sidebar px-4 md:px-6">
            <div className="flex items-center gap-3">
                <MobileSidebar />
                <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            aria-label="Account menu"
                        >
                            <Avatar className="h-9 w-9 cursor-pointer">
                                <AvatarImage src={avatarUrl ?? undefined} alt="" />
                                <AvatarFallback>{userInitials(name, email)}</AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 shadow-md">
                        <div className="px-2 py-1.5">
                            <p className="text-sm font-medium">{name}</p>
                            <p className="truncate text-xs text-muted-foreground">{email}</p>
                            <span className="mt-2 inline-block truncate rounded-full bg-muted px-2 py-1 text-xs capitalize text-muted-foreground">
                                {role}
                            </span>
                        </div>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className="flex cursor-pointer items-center gap-2"
                            onClick={() => router.push("/settings")}
                        >
                            <SettingsIcon className="h-4 w-4" />
                            Settings
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="flex cursor-pointer items-center gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive focus:text-destructive"
                            onClick={() => {
                                /* TODO: wire auth sign-out */
                            }}
                        >
                            <LogOutIcon className="h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};
