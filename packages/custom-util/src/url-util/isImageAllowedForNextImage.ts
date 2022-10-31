
const hostnameChecker = (hostname:string)=>{
    const splitHostname = hostname.split('.')
    return splitHostname.slice(-2).join('.')
}
//process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES
const isImageAllowedForNextImage = (url:string,AllowedSources)=>{
    try {
        if (!!url){
            const AllowedSource = AllowedSources ? AllowedSources.split(' '):[]
            //@ts-ignore
            const parseUrl = new URL(url)

            return AllowedSource?.includes(hostnameChecker(parseUrl.hostname))
        }
    }catch (err){
        return  false
    }
}

export default isImageAllowedForNextImage