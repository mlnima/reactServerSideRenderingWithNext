export const i18LibTranslationWithCallback = (t,primaryNamespace,originalString)=>{
    return t(
        `${primaryNamespace || 'common'}:${originalString}`, {},
            {fallback:t(`customTranslation:${originalString}`,{},
                {fallback:originalString})})
}


export const widgetTranslationContentSelector = (locale,data,key)=>{
    return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? data?.[key] :
        data?.translations?.[locale]?.uniqueData?.[key] || data?.[key];
}









