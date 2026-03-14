import { addToCartAction } from '@/lib/actions/cart/add-to-cart.action';
import type { AddToCartPayload } from '@/lib/types/cart';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export const useAddToCart = () => {
  // Translation
  const t = useTranslations('product.toast');

  // Variables
  const guestCartKey = 'guest-cart';

  // Functions
  /**
   * Case 2: session-only login (no remember me) — token stored in sessionStorage by use-login.
   * Case 1 (remember me) and Case 3 (guest) are handled inside the server action.
   */
  const getSessionStorageToken = (): string | undefined => {
    if (typeof window === 'undefined') return undefined;
    try {
      const raw = sessionStorage.getItem('user');
      if (!raw) return undefined;
      const parsed = JSON.parse(raw) as { token?: string };
      return parsed?.token ?? undefined;
    } catch {
      return undefined;
    }
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

  // Mutation
  const { mutate: add, isPending } = useMutation({
    mutationFn: async (data: AddToCartPayload) => {
      // Pass sessionStorage token (case 2); server action handles case 1 (cookie) and case 3 (guest)
      const clientToken = getSessionStorageToken();
      const payload = await addToCartAction(data, clientToken);

      // Case 3: guest — server action found no token
      if ('guest' in payload) {
        saveGuestCart(data);
        return { message: 'guest' };
      }

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
