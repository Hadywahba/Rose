import { useTranslations } from 'next-intl';

export function useValidateCartInput() {
  // Translations
  const t = useTranslations();

  // Validation function
  function validate(next: string, productQuantity: number): string | null {
    if (next.trim() === '') return null;

    const v = Number(next);

    if (Number.isNaN(v)) {
      return t(t('validation-invalid_number'));
    }

    if (!Number.isInteger(v)) {
      return "t('number-must-be-integer')";
    }

    if (v <= 0) {
      return t('number-must-be-positive');
    }

    if (v > productQuantity) {
      return t('current-stock-now-is-quantity-available', {
        quantity: productQuantity,
      });
    }

    return null;
  }

  return validate;
}
