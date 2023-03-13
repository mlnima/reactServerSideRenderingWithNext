
//process.env.NEXT_PUBLIC_DEFAULT_LOCAL
const getTextDataWithTranslation = (locale : string,name: string,parentObject :any)=>{
    //@ts-ignore
    const isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL;
    return isDefaultLocale ? parentObject?.[name] : parentObject.translations?.[locale]?.[name] || parentObject?.[name] || null
}

export default getTextDataWithTranslation;