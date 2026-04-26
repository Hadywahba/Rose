import { fetchAllOrderService } from '@/lib/services/order/order.service';
import catchError from '@/lib/utility/catch-error';
import { OrderResponse } from '@/lib/types/order/order';
import { PackageOpen } from 'lucide-react';
import OrderCard from './order-card';
import { SearchParams } from '@/lib/types/global';
import { getLocale, getTranslations } from 'next-intl/server';
import ListError from '@/components/error/list-error';
import AppPagination from '@/components/shared/app-pagination';

type OrderListProps = {
  searchParams: SearchParams;
};

export async function OrdersList({ searchParams }: OrderListProps) {
  // Translations
  const t = await getTranslations('orders');
  const locale = await getLocale();

  //   Variables
  const nextParams: SearchParams = {
    ...searchParams,
    page: searchParams.page ?? '1',
    limit: searchParams.limit ?? '4',
  };

  const [payload, error] = await catchError<PaginatedResponse<OrderResponse>>(
    () => fetchAllOrderService(nextParams),
  );

  const metadata = payload?.payload.metadata;

  const totalPages = metadata?.totalPages ?? 1;

  const orders = payload?.payload?.data ?? [];

  return (
    <div className="mt-6 flex flex-col gap-6">
      <ListError errors={error}>
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-700 dark:bg-zinc-900">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 text-maroon-700 dark:bg-zinc-800 dark:text-softpink-400">
                <PackageOpen className="h-7 w-7" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {t('empty.title')}
              </h2>

              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {t('empty.description')}
              </p>
            </div>
          </div>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <AppPagination
              pathname={'/allOrders'}
              searchParams={searchParams}
              currentPage={Number(metadata?.page)}
              totalPages={totalPages}
              show={orders.length > 0}
              locale={locale}
            />
          </div>
        )}
      </ListError>
    </div>
  );
}
