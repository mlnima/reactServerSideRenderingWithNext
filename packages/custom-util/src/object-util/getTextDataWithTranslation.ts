
//process.env.NEXT_PUBLIC_DEFAULT_LOCAL
const getTextDataWithTranslation = (locale : string,name: string,parentObject :any,defaultLocale?:string)=>{
    const isDefaultLocale = locale === defaultLocale;
    return isDefaultLocale ? parentObject?.[name] : parentObject.translations?.[locale]?.[name] || parentObject?.[name] || null
}

export default getTextDataWithTranslation;