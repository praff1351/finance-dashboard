import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "../api/dashboard";

export const useStats = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: fetchStats,
        staleTime: 1000 * 60 * 5, // 5 mins caching
        retry: 1,
    });
};