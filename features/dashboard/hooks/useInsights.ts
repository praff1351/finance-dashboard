import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Insight } from "../types/insight-types";

export function useInsights() {
    return useQuery<Insight[]>({
        queryKey: ["insights"],
        queryFn: async () => {
            const response = await axios.get("/api/insights");
            return response.data;
        },
    });
}