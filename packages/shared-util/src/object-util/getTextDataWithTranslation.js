const getTextDataWithTranslation = (locale, name, parentObject) => {
    const isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
    return isDefaultLocale
        ? parentObject?.[name]
        : parentObject.translations?.[locale]?.[name] ||
              parentObject?.[name] ||
              null;
};

module.exports =  getTextDataWithTranslation;
