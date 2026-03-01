import OrdersStatusCard from "./_components/orders-status";
import RevenueChart from "./_components/revenue";

export default function DashboardPage() {
    return (
        <div className="min-h-screen  p-10">
            <div className="mx-auto flex max-w-7xl items-start gap-8">
                <OrdersStatusCard />
                <RevenueChart />
            </div>
        </div>
    );
}