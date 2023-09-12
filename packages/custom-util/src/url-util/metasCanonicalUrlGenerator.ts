export const metasCanonicalUrlGenerator = (page:string,locale:string,pageNo:number)=>{
    const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? `${locale}/` : ''
    const pageNoQuery = pageNo ? `?page=${pageNo}` : ''
    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}${page}${pageNoQuery}`
}

export default metasCanonicalUrlGenerator;