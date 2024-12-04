interface IConfig {
    revalidate?: number | null | undefined;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    cacheOption?: RequestCache;
    useWtToken?: boolean;
    body?: object;
    tags?: string[];
}

const config = ({
                    revalidate,
                    method = 'GET',
                    useWtToken,
                    body,
                    tags,
                    cacheOption,
                }: IConfig): RequestInit => {
    const wtToken =
        typeof window !== 'undefined' ? localStorage.getItem('wt') : null;

    const tokenHeader: Record<string, string> = wtToken && useWtToken
        ? { Authorization: `Bearer ${wtToken}` }
        : {};

    const options: RequestInit = {
        method,
        headers: {
            ...tokenHeader,
        } as HeadersInit,
        cache: cacheOption,
    };

    (options as any).next = {
        revalidate:
            revalidate !== undefined
                ? revalidate
                : process.env.NODE_ENV === 'development'
                    ? 0
                    : 43200,
        tags: tags || [],
    };

    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = JSON.stringify(body);
        options.headers = {
            ...(options.headers as Record<string, string>),
            'Content-Type': 'application/json',
        };
    }

    return options;
};

export default config;



// interface IConfig {
//     revalidate?: number | undefined;
//     method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
//     cacheOption?: string;
//     useWtToken?: boolean;
//     body?: object;
//     tags?: string[];
// }
//
// const config = ({ revalidate, method, useWtToken, body, tags, cacheOption }: IConfig) => {
//     const wtToken = typeof window !== 'undefined' ? localStorage.getItem('wt') : null;
//     const tokenHeader = wtToken && useWtToken ? { Authorization: `Bearer ${wtToken}` } : {};
//     const cache = cacheOption ? { cache: cacheOption } : {};
//
//     const options = {
//         method: method || 'GET',
//         next: {
//             revalidate: revalidate ? revalidate : process.env.NODE_ENV === 'development' ? 0 : 43200,
//             tags: tags || [],
//         },
//         headers: {
//             ...tokenHeader,
//         },
//         ...cache,
//     };
//
//     if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
//         options.body = JSON.stringify(body);
//         options.headers['Content-Type'] = 'application/json';
//     }
//     return options;
// };
// export default config

//=======================
// interface IOption {
//     method : string
//     next:object,
//     headers:object,
//     cache:object
// }


// return{
//     method: method || "GET",
//     next:{
//         revalidate: revalidate ? revalidate : process.env.NODE_ENV === 'development' ? 1 : 604800
//     },
//     headers: {
//        ...tokenHeader
//     }
// }