interface IArg{
    lang:string
    currentPath:string
}

const alternatesCanonicalGenerator = ({lang,currentPath}:IArg) =>{
    const isDefaultLanguage = lang === process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
    const canonicalBase = isDefaultLanguage ? '/'  : `/${lang}`;
    let siteLanguages = process.env.NEXT_PUBLIC_LOCALES
        ?.split(' ')
        .filter((language=>language !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE )) as []

    const alternatesLanguagesList = isDefaultLanguage ?
        siteLanguages  :
        ['',...siteLanguages].filter(language=>language!== lang)

    const alternateLanguages = alternatesLanguagesList.reduce((finalValue:{[key:string]:string},currentLocale)=>{
        finalValue[currentLocale] = `/${currentLocale}`
        return finalValue
    },{})

    return{
        canonical:canonicalBase,
        languages:alternateLanguages
    }

}
export default  alternatesCanonicalGenerator