import { addToCart } from '@/lib/services/product/product.service';
import type { AddToCartPayload } from '@/lib/types/cart';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export const useAddToCart = () => {
  const t = useTranslations('product.toast');
  const guestCartKey = 'guest-cart';

  // const { data: session } = useSession();
  const getToken = () => {
    if (typeof window === 'undefined') return null;
    // will be used in future when authentication is implemented
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjk4NjFmMjBlMzY0ZWY2MTQwNTBkY2RjIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzAzOTc0OTB9.mhb9mwGIli7C5KdqACe9mq-iq1AOqUY_x5CbzreapxE';
  };

  const saveGuestCart = (data: AddToCartPayload) => {
    if (typeof window === 'undefined') return;

    const raw = localStorage.getItem(guestCartKey);
    const items = raw ? (JSON.parse(raw) as AddToCartPayload[]) : [];
    const existing = items.find((item) => item.product === data.product);

    if (existing) {
      existing.quantity += data.quantity;
    } else {
      items.push({ ...data });
    }

    localStorage.setItem(guestCartKey, JSON.stringify(items));
  };

  const { mutate: add, isPending } = useMutation({
    mutationFn: async (data: AddToCartPayload) => {
      const token = getToken();

      if (!token) {
        saveGuestCart(data);
        return { message: 'guest' };
      }

      const payload = await addToCart(data, token);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onMutate: () => {
      const id = toast.loading(t('adding'));
      return { toastId: id };
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.toastId) {
        toast.success(t('added'), { id: context.toastId });
        return;
      }
      toast.success(t('added'));
    },
    onError: (error: Error, _variables, context) => {
      const message = error.message?.toLowerCase() || '';
      const key = message.includes('product not found')
        ? 'notFound'
        : message.includes('sold out')
          ? 'soldOut'
          : 'error';

      const options = context?.toastId ? { id: context.toastId } : undefined;
      toast.error(t(key), options);
    },
  });

  return {
    addToCart: add,
    isPending,
  };
};
