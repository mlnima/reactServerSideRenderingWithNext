const isUserFromExternalLink = (req,res)=>{
    try{
        const referer = req?.headers?.referer &&
                        !req?.headers?.referer.includes(process.env.NEXT_PUBLIC_PRODUCTION_URL)
        return referer
    }catch (err){
        return false
    }


}

export default isUserFromExternalLink