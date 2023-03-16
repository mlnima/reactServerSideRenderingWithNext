interface Replaces {
    name?:string,
    siteName?:string,
    count?:number
}

const textContentReplacer = (textString?:any,replaces?:Replaces)=>{
    const now = new Date()
    try {
        //@ts-ignore
        return  textString.replaceAll('__NAME',replaces?.name || '')
            .replaceAll('__SITE_NAME',replaces?.siteName || '')
            .replaceAll('__COUNT', replaces?.count || '')
            .replaceAll('__YEAR', now.getFullYear())
    }catch (err){
        return textString
    }
}
export default textContentReplacer;