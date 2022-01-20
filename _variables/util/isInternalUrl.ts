const isInternalUrl = (url:string)=>{
    return url.includes(process.env.NEXT_PUBLIC_PRODUCTION_URL) || !url.includes('http')
}

export default isInternalUrl