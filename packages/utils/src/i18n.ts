export const getLocales = ({ withDefault = true }: { withDefault?: boolean } = {}): string[] => {
  let locales = (process.env.NEXT_PUBLIC_LOCALES || 'en').split(' ');
  if (!withDefault) {
    return locales.filter((locale) => locale !== getDefaultLocale());
  }
  return locales;
};

export const getDefaultLocale = (): string => {
  return process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
};