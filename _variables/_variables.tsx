import React from "react";

export const languagesOptions = (process.env.NEXT_PUBLIC_LOCALS.split(' ')
    .filter(lang=>lang!== process.env.NEXT_PUBLIC_DEFAULT_LOCAL) || [])
    .map((lang:string) => {
    return (
        <option key={lang} value={lang}>
           {lang}
        </option>
    )
})

export const reduceArrayOfDataToIds = (dataArr:any)=> Array.isArray(dataArr) ?  dataArr.map(data=>data._id) : []

export const getTextDataWithTranslation = (locale : string,name: string,parentObject :any)=>{
    const isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL;
    return isDefaultLocale ? parentObject?.[name] : parentObject.translations?.[locale]?.[name] || parentObject?.[name] || null
}

export const convertMetasTypeToSingular = (metaType:string)=>{
  return metaType === 'actors' ? 'actor' :
         metaType === 'tags' ? 'tag' :
         metaType === 'categories' ? 'category':metaType
}
export const convertMetasTypeToPlural = (metaType:string)=>{
  return metaType === 'actor' ? 'actors' :
         metaType === 'tag' ? 'tags' :
         metaType === 'category' ? 'categories': metaType
}


// export const isAppleMobileDevice = (userAgent:string)=>{
//     return /iPhone|iPad|iPod/i.test(userAgent)
// }


export const onChangeInputValueCorrector = (e:any) =>{
        return  e.target.type === 'checkbox' ? e.target.checked :
                e.target.value === 'true' ? true :
                e.target.value === 'false' ? false :
                e.target.value
}

export const textContentReplacer = (textString,replaces)=>{
    try {
        return  textString.replaceAll('__NAME',replaces?.name || '')
                .replaceAll('__SITE_NAME',replaces?.siteName || '')
                .replaceAll('__COUNT', replaces?.count || '')
    }catch (err){
        return textString
    }
}


export const updateQueryGenerator = (query, push, pathname)=> {
    push({
        pathname: pathname,
        query: {...query, lastPageUpdate: Date.now()}
    })
}


