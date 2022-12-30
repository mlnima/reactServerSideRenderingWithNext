const updateQueryGenerator = (query: {}, setSearch: Function) => {
    setSearch({...query, lastPageUpdate: Date.now()})
}

export default updateQueryGenerator