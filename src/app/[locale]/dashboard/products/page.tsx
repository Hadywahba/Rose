import DashboardAllProductsWrapper from "./_components/dashboard-all-products-wrapper";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <DashboardAllProductsWrapper searchParams={searchParams} />;
}
