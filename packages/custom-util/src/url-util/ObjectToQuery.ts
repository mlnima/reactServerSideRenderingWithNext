const ObjectToQuery = (data:{})=>{

    return '?' + new URLSearchParams(data).toString()
}

export default ObjectToQuery