
export function formatPhoneNumberToArabic(phone: string, locale: string) {
  if (locale === 'ar') {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return phone.replace(/\d/g, (d) => arabicDigits[parseInt(d)]);
  }
  return phone;
}


