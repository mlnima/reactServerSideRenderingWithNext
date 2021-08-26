const _objectToQuery = (data,cache) =>{

    const queries= new URLSearchParams(data).toString()

    return `?${queries}&cache=${cache}`
}

export default _objectToQuery