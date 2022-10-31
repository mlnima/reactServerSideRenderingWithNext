export const languagesOptions = (process.env.NEXT_PUBLIC_LOCALS.split(' ')
    .filter(lang=>lang!== process.env.NEXT_PUBLIC_DEFAULT_LOCAL) || [])
    .map((lang:string) => {
    return (
        <option key={lang} value={lang}>
           {lang}
        </option>
    )
})

export const onChangeInputValueCorrector = (e:any) =>{
        return  e.target.type === 'checkbox' ? e.target.checked :
                e.target.value === 'true' ? true :
                e.target.value === 'false' ? false :
                e.target.value
}

export const updateQueryGenerator = (query, push, pathname)=> {
    push({
        pathname: pathname,
        query: {...query, lastPageUpdate: Date.now()}
    })
}


