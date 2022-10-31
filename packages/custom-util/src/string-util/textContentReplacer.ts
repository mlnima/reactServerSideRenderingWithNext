interface Replaces {
    name:string,
    siteName:string,
    count:number
}

const textContentReplacer = (textString:any,replaces:Replaces)=>{
    try {
        //@ts-ignore
        return  textString.replaceAll('__NAME',replaces?.name || '')
            .replaceAll('__SITE_NAME',replaces?.siteName || '')
            .replaceAll('__COUNT', replaces?.count || '')
    }catch (err){
        return textString
    }
}
export default textContentReplacer;