export const postsCanonicalUrlGenerator = (metaType:string,metaId:string,locale:string,pageNo:number,keyword:string)=>{
    const pageTypeQuery = keyword ? 'search' : metaType ? metaType : 'posts'
    const pageNoQuery = pageNo ? `?page=${pageNo}` : ''
    const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? `${locale}/` : ''
    const metaIdKeywordQuery = metaId || keyword || ''

    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}${pageTypeQuery}/${metaIdKeywordQuery}${pageNoQuery}`
}

export default postsCanonicalUrlGenerator;