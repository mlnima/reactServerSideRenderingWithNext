const isImageAllowedForNextImage = (url:string)=>{
    try {
        if (url){
            const AllowedSource = process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES ?
                process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES.split(' '):[]
            const parseUrl = new URL(url)
            return AllowedSource.includes(parseUrl.hostname)
        }
    }catch (err){
        return  false
    }

}

export default isImageAllowedForNextImage