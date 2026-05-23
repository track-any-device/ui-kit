'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface LayoutContextValue {
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
    toggleSidebar: () => void;
    stickyHeader: boolean;
    setStickyHeader: (sticky: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({
    children,
    defaultSidebarCollapsed = false,
    defaultStickyHeader = true,
}: {
    children: ReactNode;
    defaultSidebarCollapsed?: boolean;
    defaultStickyHeader?: boolean;
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultSidebarCollapsed);
    const [stickyHeader, setStickyHeader] = useState(defaultStickyHeader);

    return (
        <LayoutContext.Provider value={{
            sidebarCollapsed,
            setSidebarCollapsed,
            toggleSidebar: () => setSidebarCollapsed((c) => !c),
            stickyHeader,
            setStickyHeader,
        }}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayout() {
    const ctx = useContext(LayoutContext);
    if (!ctx) throw new Error('useLayout must be used within a LayoutProvider');
    return ctx;
}
