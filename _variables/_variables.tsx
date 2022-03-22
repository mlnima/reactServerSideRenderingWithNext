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







