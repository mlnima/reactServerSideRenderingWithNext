const getTextDataWithTranslation = (locale : string,name: string,parentObject :any)=>{
    const isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
    return isDefaultLocale ? parentObject?.[name] : parentObject.translations?.[locale]?.[name] || parentObject?.[name] || null
}

export default getTextDataWithTranslation;