import React from "react";

export const clickPathGenerator = (clickedItemName, pathFromContexts) => {
    if (pathFromContexts === '.') {
        return './' + clickedItemName
    } else {
        return pathFromContexts + '/' + clickedItemName
    }
};

export const setLanguageToLocalStorage = (language) => {
    localStorage ? localStorage.setItem('lang', language) : null
}

export const languagesOptions = (process.env.NEXT_PUBLIC_LOCALS.split(' ').filter(lang=>lang!== process.env.NEXT_PUBLIC_DEFAULT_LOCAL) || []).map(lang => {
    return (
        <option key={lang} value={lang}>{lang}</option>
    )
})

export const reduceArrayOfDataToIds = (dataArr)=> Array.isArray(dataArr) ?  dataArr.map(data=>data._id) : []



