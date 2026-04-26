import { Order } from '@/lib/types/order/order';

interface OrderHeaderProps {
  created: string;
  order: Order;
}

export default function OrderHeader({ created, order }: OrderHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-maroon-600 px-4 py-3 text-white">
      <h3 className="text-xl font-semibold">Order {order.id.slice(0, 8)}</h3>

      <p className="text-base font-medium text-white/90">Created: {created}</p>
    </div>
  );
}
