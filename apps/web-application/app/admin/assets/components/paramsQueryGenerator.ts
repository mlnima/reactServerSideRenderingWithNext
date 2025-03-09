import paramsObjectGenerator from "./paramsObjectGenerator";

const paramsQueryGenerator = (searchParams:any) => {
    const getPostsData = paramsObjectGenerator(searchParams)
    //@ts-ignore
    const queries = new URLSearchParams(getPostsData).toString()

    return `?${queries}`
}

export default paramsQueryGenerator;