import * as process from "process";

const hostnameChecker = (hostname:string)=>{
    const splitHostname = hostname.split('.')
    return splitHostname.slice(-2).join('.')
}
//process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES
const isImageAllowedForNextImage = (url:string)=>{
    try {
        if (!!url){

            const AllowedSource = process.env?.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES ? process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES.split(' '):[]
            //@ts-ignore
            const parseUrl = new URL(url)

            return AllowedSource?.includes(hostnameChecker(parseUrl.hostname))
        }
    }catch (err){
        return  false
    }
}

export default isImageAllowedForNextImage