import { StatisticsResponse } from "@/lib/types/dashboard/orders-status";

export async function fetchStatistics(): Promise<StatisticsResponse> {
    // Make GET request to our Next.js API route
    const res = await fetch("/api/statistics", {
        method: "GET",
    });

    const payload = await res.json();

    // Check if response is not OK, then log error and throw
    if (!res.ok) {
        console.error("Failed to fetch statistics:", payload);
        throw new Error(payload.error || `Error ${res.status}`);
    }

    // Return the payload, explicitly typed as StatisticsResponse
    return payload as StatisticsResponse;
}
