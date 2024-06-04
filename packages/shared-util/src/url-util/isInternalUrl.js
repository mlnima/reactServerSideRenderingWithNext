const isInternalUrl = (url:string,domain:string)=>{
    return url.includes(domain) || !url.includes('http')
}

export default isInternalUrl