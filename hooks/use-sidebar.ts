"use client";

import { create } from "zustand";

type SidebarState = {
    collapsed: boolean;
    toggle: () => void;
    setCollapsed: (value: boolean) => void;
};

export const useSidebar = create<SidebarState>((set) => ({
    collapsed: false,
    toggle: () => set((state) => ({ collapsed: !state.collapsed })),
    setCollapsed: (value) => set({ collapsed: value }),
}));