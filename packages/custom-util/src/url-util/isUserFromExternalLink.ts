const isUserFromExternalLink = (req,domain)=>{
    try{
        const referer = req?.headers?.referer &&
                        !req?.headers?.referer.includes(domain)
        return referer
    }catch (err){
        return false
    }


}

export default isUserFromExternalLink