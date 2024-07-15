const metaFieldsRequestForCard = (type:string,locale:string)=>{
    let defaultFields = ['name', 'type',  'type', 'type']
    if (type !== 'tags'){
        defaultFields=[
            ...defaultFields,
            'count',
            'imageUrl',
            // 'likes',
            // 'views'
        ]
    }
    if (locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE) defaultFields.push(`translations.${locale}.name`)
    return defaultFields
}

export default metaFieldsRequestForCard