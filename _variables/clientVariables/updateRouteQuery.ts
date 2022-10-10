const updateRouteQuery = (router)=>{
    router.push({
        pathname:router.pathname,
        query: {...router.query,lastUpdate:Date.now()}
    })
}

export default updateRouteQuery;