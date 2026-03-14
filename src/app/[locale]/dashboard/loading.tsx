import Spinner from "@/components/loader/Spinner";

export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}
