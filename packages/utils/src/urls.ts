export const customPageCanonicalUrlGenerator = (page: string, locale: string): string => {
  const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? `${locale}/` : '';
  return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}${page}`;
};

export const queryUniquer = (query: string | string[]): string => {
  return typeof query === 'string' ? query : query[0];
};

export const postsCanonicalUrlGenerator = (metaType: string, metaId: string, locale: string, pageNo: number, keyword: string): string => {
  const pageTypeQuery = keyword ? 'search' : metaType ? metaType : 'posts';
  const pageNoQuery = pageNo ? `?page=${pageNo}` : '';
  const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? `${locale}/` : '';
  const metaIdKeywordQuery = metaId || keyword || '';

  return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}${pageTypeQuery}/${metaIdKeywordQuery}${pageNoQuery}`;
};

export const postCanonicalUrlGenerator = (postType: string, _id: string, locale: string): string => {
  const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? `${locale}/` : '';
  return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}post/${postType || 'article'}/${_id}`;
};

export const ObjectToQuery = (data: Record<string, string>): string => {
  return '?' + new URLSearchParams(data).toString();
};

export const metasCanonicalUrlGenerator = (page: string, locale: string, pageNo: number): string => {
  const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? `${locale}/` : '';
  const pageNoQuery = pageNo ? `?page=${pageNo}` : '';
  return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}${page}${pageNoQuery}`;
};

export const languageDetectorFromURL = (urlObj: URL): string | null => {
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

    const potentialLang = pathSegments[0];
    if (potentialLang.length === 2 && /^[a-z]{2}$/i.test(potentialLang)) {
      return potentialLang.toLowerCase();
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const isInternalUrl = (url: string, domain: string): boolean => {
  return url.includes(domain) || !url.includes('http');
};

export const hostnameChecker = (hostname: string): string => {
  const splitHostname = hostname.split('.');
  return splitHostname.slice(-2).join('.');
};

export const isImageAllowedForNextImage = (url: string) => {
  try {
    if (!!url) {
      const AllowedSource = process.env?.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES
        ? process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES.split(' ')
        : [];
      const parseUrl = new URL(url);

      return AllowedSource.includes(hostnameChecker(parseUrl.hostname));
    }
  } catch (err) {
    return false;
  }
};

export const isAbsolutePath = (url: string): boolean => url.includes('http');

export const homePageCanonicalUrlGenerator = (locale: string): string => {
  const localeQuery = locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? `${locale}/` : '';
  return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${localeQuery}`;
};

export const doesUrlHasQueries = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return !!parsedUrl.search;
  } catch (error) {
    console.error('Invalid URL', error);
    return false;
  }
};

export const searchParamsToObject = (searchParams: URLSearchParams): Record<string, string> => {
  const params: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
};

export const searchParamsToUrlQuery = (queryParams: Record<string, string>): string => {
  const queries = new URLSearchParams(queryParams).toString();
  return `?${queries}`;
};
//names: string | string[], value: string
export const createQueryString = (urlItems: {
  name: string,
  value: string
}[], searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams.toString());
  for (const { name, value } of urlItems) {
    params.set(name, value);
  }
  return params.toString();
};

export const removeQueryParam = (names: string | string[], searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams.toString());

  if (Array.isArray(names)) {
    for (const name of names) {
      params.delete(name);
    }
  } else {
    params.delete(names);
  }

  return params;
};