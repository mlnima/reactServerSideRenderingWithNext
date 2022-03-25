import React from "react";

export const languagesOptions = (process.env.NEXT_PUBLIC_LOCALS.split(' ').filter(lang=>lang!== process.env.NEXT_PUBLIC_DEFAULT_LOCAL) || []).map((lang:string) => {
    return (
        <option key={lang} value={lang}>
           {lang}
        </option>
    )
})

export const reduceArrayOfDataToIds = (dataArr:any)=> Array.isArray(dataArr) ?  dataArr.map(data=>data._id) : []


export const cardWidthCalculator = (size : string)=>size === 'listSmall' ? 320 :
    size === 'list' ? 116.6 :
        size === 'smaller' ? 209.8 :
            size === 'small' ? 255 :
                size === 'medium' ? 320 : 255


export const getTextDataWithTranslation = (locale,name,parentObject)=>{
    const isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL;
    return isDefaultLocale ? parentObject?.[name] : parentObject.translations?.[locale]?.[name] || parentObject?.[name] || null
}

export const convertMetasTypeToSingular = (metaType)=>{
  return metaType === 'actors' ? 'actor' :
         metaType === 'tags' ? 'tag' :
         metaType === 'categories' ? 'category':''
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




