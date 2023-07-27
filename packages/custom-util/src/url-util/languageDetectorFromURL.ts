type URLObject = {
    href: string;
};
const languageDetectorFromURL = (urlObj: URLObject): string | null => {
    if (!urlObj.href || typeof urlObj.href !== 'string') {
        // URL object is invalid or href is not a string
        return null;
    }


    try {
        const url = new URL(urlObj.href);
        const pathname = url.pathname;
        console.log('urlObj urlObj.href=> ',urlObj.href)
        // Split the path into segments
        const pathSegments = pathname.split('/').filter(segment => segment);

        if (pathSegments.length === 0) {
            // There are no path segments
            return null;
        }

        // Check if the first path segment is a language code (assuming 2 character long)
        const potentialLang = pathSegments[0];
        if (potentialLang.length === 2 && /^[a-z]{2}$/i.test(potentialLang)) {
            return potentialLang.toLowerCase();
        }

        return null;

    } catch (error) {
        // There was an error (possibly an invalid URL)
        return null;
    }
};

export default languageDetectorFromURL;