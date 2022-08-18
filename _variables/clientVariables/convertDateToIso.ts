const convertDateToIso = (dateString:string)=>{
    try {
        const ISO8601Date = new Date(dateString)
        if (ISO8601Date){
            return ISO8601Date.toISOString()
        }else return null
    }catch (err){
        return dateString
    }
}

export default convertDateToIso