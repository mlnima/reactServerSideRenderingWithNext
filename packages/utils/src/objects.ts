export const removeEmptyProperties = (obj: Record<string, unknown>): Record<string, unknown> => {
  try {
    Object.keys(obj).forEach(key => {
      if (
        obj[key] === undefined ||
        obj[key] === null ||
        obj[key] === ''
      ) {
        delete obj[key];
      }
    });
    return obj;
  } catch (error) {
    return obj;
  }
};

export const isEmptyObject = (ObjectToTest: Record<string, unknown>): boolean => {
  if (!ObjectToTest) return false;
  return (
    Object.keys(ObjectToTest).length === 0 &&
    ObjectToTest.constructor === Object
  );
};


export const getTextDataWithTranslation = (locale: string, name: string, parentObject?: any): string | null => {
  if (!parentObject) {
    return '';
  }
  const isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
  return isDefaultLocale
    ? parentObject?.[name]
    : parentObject.translations?.[locale]?.[name] ||
    parentObject?.[name] ||
    '';
};

export const nestedObjectModifier = (obj: object, path: string[], value: unknown): object => {
  return path.reduceRight((acc, key, index) => {
    return {
      ...obj,
      [key]: index === path.length - 1 ? value : acc,
    };
  }, {});
};



