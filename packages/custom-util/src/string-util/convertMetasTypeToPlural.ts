const convertMetasTypeToPlural = (metaType:string)=>{
    return metaType === 'actor' ? 'actors' :
        metaType === 'tag' ? 'tags' :
            metaType === 'category' ? 'categories': metaType
}

export default convertMetasTypeToPlural;