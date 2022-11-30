const queryUniquer = (query:string|string[]) => {
    return typeof query === "string" ? query : query[0]
}
export default queryUniquer;