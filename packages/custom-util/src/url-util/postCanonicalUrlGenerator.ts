const postCanonicalUrlGenerator = (postType:string, _id:string, locale:string)=>{
    const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? `${locale}/` : ''
    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}post/${postType || 'article'}/${_id}`
}

export default postCanonicalUrlGenerator;