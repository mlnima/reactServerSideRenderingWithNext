export const convertSecondsToTimeString = (seconds:number) => {
    return (
        Math.floor(seconds / 60) +
        ':' +
        ('0' + Math.floor(seconds % 60)).slice(-2)
    );
};

export const convertMetasTypeToSingular = (metaType:string) => {
    return metaType === 'actors'
        ? 'actor'
        : metaType === 'tags'
            ? 'tag'
            : metaType === 'categories'
                ? 'category'
                : metaType;
};