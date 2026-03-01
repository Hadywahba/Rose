"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AreaChart, Area, XAxis, CartesianGrid, YAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { fetchStatistics } from "../../../api/dashboard/orders-status.api";
import {
    DailyRevenue,
    MonthlyRevenue,
} from "@/lib/types/dashboard/orders-status";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function RevenueChart() {
    const t = useTranslations("revenueChart");

    const [mode, setMode] = useState<"monthly" | "weekly">("monthly");
    const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
    const [loading, setLoading] = useState(true);

    const chartConfig = {
        revenue: {
            label: t("title"),
            color: "#A6252A",
        },
    };

    useEffect(() => {
        async function load() {
            try {
                const stats = await fetchStatistics();

                setDailyRevenue(
                    stats.statistics.orders.dailyRevenue ?? []
                );

                setMonthlyRevenue(
                    stats.statistics.orders.monthlyRevenue ?? []
                );
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : t("fetchError");

                toast.error(message);
                console.error(message);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [t]);

    // Prepare chart data
    const chartData = useMemo(() => {
        return mode === "monthly"
            ? monthlyRevenue.map((m) => ({
                date: m._id,
                revenue: m.revenue,
            }))
            : dailyRevenue.map((d) => ({
                date: d._id,
                revenue: d.revenue,
            }));
    }, [mode, monthlyRevenue, dailyRevenue]);

    // Safe Y-axis domain
    const { paddedMin, paddedMax } = useMemo(() => {
        if (!chartData.length) {
            return { paddedMin: 0, paddedMax: 100 };
        }

        const revenues = chartData.map((d) => d.revenue);
        const min = Math.min(...revenues);
        const max = Math.max(...revenues);

        return {
            paddedMin: Math.floor(min * 0.9),
            paddedMax: Math.ceil(max * 1.1),
        };
    }, [chartData]);

    return (
        <Card className="flex h-full flex-1 flex-col gap-6 border-none bg-white px-6 py-4 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between p-0">
                <CardTitle className="text-2xl font-semibold">
                    {t("title")}
                </CardTitle>

                <ToggleGroup
                    type="single"
                    value={mode}
                    onValueChange={(v) =>
                        v && setMode(v as "monthly" | "weekly")
                    }
                    className="flex rounded-md bg-muted/40 p-1"
                >
                    <ToggleGroupItem
                        value="monthly"
                        className="rounded px-3 py-1.5 text-sm text-[#969696] data-[state=on]:font-semibold data-[state=on]:text-maroon-600"
                    >
                        {t("monthly")}
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="weekly"
                        className="rounded px-3 py-1.5 text-sm text-[#969696] data-[state=on]:font-semibold data-[state=on]:text-maroon-600"
                    >
                        {t("weekly")}
                    </ToggleGroupItem>
                </ToggleGroup>
            </CardHeader>

            <CardContent className="p-0">
                {loading ? (
                    <div className="flex h-[297px] items-center justify-center text-muted-foreground">
                        {t("loading")}
                    </div>
                ) : chartData.length === 0 ? (
                    <div className="flex h-[297px] items-center justify-center text-muted-foreground">
                        {t("noData")}
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="h-[297px] w-full"
                    >
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="20%"
                                        stopColor="#A6252A"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#A6252A"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                vertical
                                horizontal={false}
                                stroke="#A1A1AA"
                                strokeOpacity={0.6}
                            />

                            <YAxis
                                tickMargin={8}
                                tickLine={false}
                                axisLine={false}
                                domain={[paddedMin, paddedMax]}
                                tickFormatter={(value) =>
                                    value.toLocaleString()
                                }
                            />

                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const d = new Date(value);
                                    return mode === "monthly"
                                        ? d.toLocaleDateString("en-US", {
                                            month: "short",
                                        })
                                        : d.toLocaleDateString("en-US", {
                                            day: "numeric",
                                        });
                                }}
                            />

                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) =>
                                            new Date(value).toLocaleDateString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                }
                                            )
                                        }
                                    />
                                }
                            />

                            <Area
                                type="basis"
                                dataKey="revenue"
                                stroke="#A6252A"
                                fill="url(#revFill)"
                            />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}