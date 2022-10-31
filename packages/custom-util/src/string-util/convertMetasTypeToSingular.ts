const convertMetasTypeToSingular = (metaType: string) => {
    return metaType === 'actors' ? 'actor' :
        metaType === 'tags' ? 'tag' :
            metaType === 'categories' ? 'category' : metaType
}

export default convertMetasTypeToSingular;