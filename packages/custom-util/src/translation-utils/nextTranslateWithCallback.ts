interface ITypes{
    t:Function,
    primaryNamespace:string | null,
    originalString:string
}

const nextTranslateWithCallback = ({t, primaryNamespace, originalString}:ITypes)=>{
    return t(
        `${primaryNamespace || 'common'}:${originalString}`, {},
        {fallback:t(`customTranslation:${originalString}`,{},
                {fallback:originalString})})
}

export default nextTranslateWithCallback;