interface IConfig {
    revalidate?: number,
    method?: string,
    cacheOption?: string,
    useWtToken?: boolean,
    body?: {},
    tags?: string[]
}

const config = ({revalidate, method, useWtToken, body, tags, cacheOption}: IConfig) => {

    const wtToken = typeof window !== 'undefined' ? localStorage.getItem("wt") : null;
    const tokenHeader = wtToken && useWtToken ? {"Authorization": `Bearer ${wtToken}`} : {}
    const cache = cacheOption ? {cache: cacheOption} : {}

    const options: any = {
        method: method || "GET",
        next: {
            revalidate: revalidate ? revalidate : process.env.NODE_ENV === 'development' ? 0 : 43200,
            tags: tags || []
        },
        headers: {
            ...tokenHeader
        },
        ...cache
    }

    if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json';
    }

    return options;

    // return{
    //     method: method || "GET",
    //     next:{
    //         revalidate: revalidate ? revalidate : process.env.NODE_ENV === 'development' ? 1 : 604800
    //     },
    //     headers: {
    //        ...tokenHeader
    //     }
    // }
}
export default config