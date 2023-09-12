export const homePageCanonicalUrlGenerator = (locale:string) => {
    const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? `${locale}/` : ''
    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}`
}

export default homePageCanonicalUrlGenerator;