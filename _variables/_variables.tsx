import React from "react";

export const languagesOptions = (process.env.NEXT_PUBLIC_LOCALS.split(' ').filter(lang=>lang!== process.env.NEXT_PUBLIC_DEFAULT_LOCAL) || []).map((lang:string) => {
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
         metaType === 'categories' ? 'category':''
}


export const isAppleMobileDevice = (userAgent:string)=>{
    return /iPhone|iPad|iPod/i.test(userAgent)
}












//
// export const defaultFieldForPosts = [
//     'title',
//     'mainThumbnail',
//     'quality',
//     'likes',
//     'disLikes',
//     'views',
//     'duration',
//     'postType',
//     'price',
//     'translations',
//     'videoTrailerUrl',
//     'rating',
//     'redirectLink'
// ]




