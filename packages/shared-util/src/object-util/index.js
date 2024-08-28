export const removeEmptyProperties = obj => {
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
export const isEmptyObject = ObjectToTest => {
    if (!ObjectToTest) return false;
    return (
        Object.keys(ObjectToTest).length === 0 &&
        ObjectToTest?.constructor === Object
    );
};
export const getTextDataWithTranslation = (locale, name, parentObject) => {
    const isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
    return isDefaultLocale
        ? parentObject?.[name]
        : parentObject.translations?.[locale]?.[name] ||
              parentObject?.[name] ||
              null;
};

//(obj: any, path: string[], value: any)
export const nestedObjectModifier = (obj, path, value) => {
    return path.reduceRight((acc, key, index) => {
        return {
            ...obj,
            [key]: index === path.length - 1 ? value : acc,
        };
    }, {});
};