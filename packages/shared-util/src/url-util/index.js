
export const customPageCanonicalUrlGenerator = (page, locale) => {
    const localeQuery =
        locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE
            ? `${locale}/`
            : '';
    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}${page}`;
};

export const queryUniquer = query => {
    return typeof query === 'string' ? query : query[0];
};
export const postsCanonicalUrlGenerator = (
    metaType,
    metaId,
    locale,
    pageNo,
    keyword,
) => {
    const pageTypeQuery = keyword ? 'search' : metaType ? metaType : 'posts';
    const pageNoQuery = pageNo ? `?page=${pageNo}` : '';
    const localeQuery =
        locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE
            ? `${locale}/`
            : '';
    const metaIdKeywordQuery = metaId || keyword || '';

    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}${pageTypeQuery}/${metaIdKeywordQuery}${pageNoQuery}`;
};
export const postCanonicalUrlGenerator = (postType, _id, locale) => {
    const localeQuery =
        locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE
            ? `${locale}/`
            : '';
    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}post/${postType || 'article'}/${_id}`;
};
export const ObjectToQuery = data => {
    return '?' + new URLSearchParams(data).toString();
};
export const metasCanonicalUrlGenerator = (page, locale, pageNo) => {
    const localeQuery =
        locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE
            ? `${locale}/`
            : '';
    const pageNoQuery = pageNo ? `?page=${pageNo}` : '';
    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}${page}${pageNoQuery}`;
};
export const languageDetectorFromURL = urlObj => {
    if (!urlObj.href || typeof urlObj.href !== 'string') {
        return null;
    }

    try {
        const url = new URL(urlObj.href);
        const pathname = url.pathname;

        const pathSegments = pathname.split('/');

        if (pathSegments.length === 0) {
            return null;
        }

        // Check if the first path segment is a language code (assuming 2 character long)
        const potentialLang = pathSegments[0];
        if (potentialLang.length === 2 && /^[a-z]{2}$/i.test(potentialLang)) {
            return potentialLang.toLowerCase();
        }

        return null;
    } catch (error) {
        return null;
    }
};
export const isInternalUrl = (url, domain) => {
    return url.includes(domain) || !url.includes('http');
};
export const hostnameChecker = hostname => {
    const splitHostname = hostname.split('.');
    return splitHostname.slice(-2).join('.');
};
export const isImageAllowedForNextImage = url => {
    try {
        if (!!url) {
            const AllowedSource = process.env
                ?.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES
                ? process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES.split(' ')
                : [];
            //@ts-ignore
            const parseUrl = new URL(url);

            return AllowedSource?.includes(hostnameChecker(parseUrl.hostname));
        }
    } catch (err) {
        return false;
    }
};
export const isAbsolutePath = url => url.includes('http');
export const homePageCanonicalUrlGenerator = locale => {
    const localeQuery =
        locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE
            ? `${locale}/`
            : '';
    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}`;
};

export const doesUrlHasQueries = url => {
    try {
        const parsedUrl = new URL(url);
        return !!parsedUrl.search;
    } catch (error) {
        console.error('Invalid URL', error);
        return false;
    }
};

export const urlSearchParamsToObject =  (searchParams)=>{
    const params = {};
    for (let [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    return params;
}