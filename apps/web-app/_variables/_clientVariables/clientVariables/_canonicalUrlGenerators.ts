export const _postCanonicalUrlGenerator = (postType,_id,locale)=>{
    const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? `${locale}/` : ''
    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}post/${postType || 'article'}/${_id}`
}

export const _postsCanonicalUrlGenerator = (metaType,metaId,locale,pageNo,keyword)=>{
    const pageTypeQuery = keyword ? 'search' : metaType ? metaType : 'posts'
    const pageNoQuery = pageNo ? `?page=${pageNo}` : ''
    const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? `${locale}/` : ''
    const metaIdKeywordQuery = metaId || keyword || ''

    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}${pageTypeQuery}/${metaIdKeywordQuery}${pageNoQuery}`
}

export const _metasCanonicalUrlGenerator = (page,locale,pageNo)=>{
        const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? `${locale}/` : ''
        const pageNoQuery = pageNo ? `?page=${pageNo}` : ''
        return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}${page}${pageNoQuery}`
}
export const _customPageCanonicalUrlGenerator = (page,locale)=>{
        const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? `${locale}/` : ''
        return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}${page}`
}

export const _homePageCanonicalUrlGenerator = (locale)=>{
        const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? `${locale}/` : ''
        return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}`
}


