/**
 * Page titles for the dashboard shell header. Order matters: more specific
 * path prefixes are checked before generic ones.
 */
export function getNavTitle(pathname: string): string {
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname.startsWith("/transactions")) return "Transactions";
    if (pathname.startsWith("/insights")) return "Insights";
    if (pathname === "/") return "Home";
    return "Finance";
}
