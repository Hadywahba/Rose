
export function formatPhoneNumberToArabic(phone: string, locale: string) {
  if (locale === 'ar') {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return phone.replace(/\d/g, (d) => arabicDigits[parseInt(d)]);
  }
  return phone;
}

export const formatCurrency = (format: any, value: number, locale: string) => {
  const formatted = format.number(value, 'numbers');

  if (locale === 'ar') {
    return `${formatted} ج.م`;
  }

  return `${formatted} EGP`;
};
