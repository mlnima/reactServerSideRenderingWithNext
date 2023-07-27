export const customPageCanonicalUrlGenerator = (page:string,locale:string)=>{
    const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? `${locale}/` : ''
    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}${page}`
}

export default customPageCanonicalUrlGenerator;