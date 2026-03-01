"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { fetchStatistics } from "../../../api/dashboard/orders-status.api";
import { useTranslations } from "next-intl";

export default function OrdersStatusCard() {
    const t = useTranslations("ordersStatus");
    const [stats, setStats] = useState({ completed: 0, inProgress: 0, canceled: 0 });

    useEffect(() => {
        async function load() {
            try {
                const res = await fetchStatistics();
                const statuses = res.statistics.orders.ordersByStatus;
                setStats({
                    completed: statuses.find(s => s._id?.toLowerCase().replace(" ", "_") === "completed")?.count || 0,
                    inProgress: statuses.find(s => s._id?.toLowerCase().replace(" ", "_") === "in_progress")?.count || 0,
                    canceled: statuses.find(s => s._id?.toLowerCase().replace(" ", "_") === "canceled")?.count || 0,
                });
            } catch (err) { console.error(err); }
        }
        load();
    }, []);

    const data = [
        { name: "completed", value: stats.completed || 216, color: "#00BC7D" },
        { name: "inProgress", value: stats.inProgress || 513, color: "#2B7FFF" },
        { name: "canceled", value: stats.canceled || 19, color: "#DC2626" },
    ];

    return (
        <Card className="w-[340px] rounded-[32px] border-none bg-white p-8 shadow-sm">
            <CardHeader className="p-0 mb-6 text-center">
                <CardTitle className="text-2xl font-bold text-[#1A1A1A]">
                    {t.has("title") ? t("title") : "Orders Status"}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center p-0">
                <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={0}
                                dataKey="value"
                                stroke="none"
                                labelLine={false}
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                                    const RADIAN = Math.PI / 180;
                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                    const percent = Math.round((value / data.reduce((a, b) => a + b.value, 0)) * 100);
                                    return (
                                        <g>
                                            <circle cx={x} cy={y} r={16} fill="white" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" />
                                            <text x={x} y={y} fill="#000" textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="bold">
                                                {percent}%
                                            </text>
                                        </g>
                                    );
                                }}
                            >
                                {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full mt-10 space-y-5">
                    {data.map((item, index) => {
                        const currentTotal = data.reduce((a, b) => a + b.value, 0);
                        const percent = Math.round((item.value / currentTotal) * 100);
                        return (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm font-semibold text-gray-500 capitalize">{t.has(item.name) ? t(item.name) : item.name.replace(/([A-Z])/g, ' $1')}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">
                                    {item.value} <span className="text-gray-400 font-medium ml-1">({percent}%)</span>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}