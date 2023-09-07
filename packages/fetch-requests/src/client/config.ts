interface IConfig {
    revalidate?: number,
    method?: string,
    useWtToken?: boolean,
    body?: {},
    tags?: string[]
}

const config = ({revalidate, method, useWtToken, body, tags}: IConfig) => {

    const wtToken = typeof window !== 'undefined' ? localStorage.getItem("wt") : null;
    const tokenHeader = wtToken && useWtToken ? {"Authorization": `Bearer ${wtToken}`} : {}

    const options: any = {
        method: method || "GET",
        next: {
            revalidate: revalidate ? revalidate : process.env.NODE_ENV === 'development' ? 0 : 604800,
            tags: tags || []
        },
        headers: {
            ...tokenHeader
        }
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