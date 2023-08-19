const removeEmptyProperties  = (obj: { [key: string]: any }): { [key: string]: any } => {
    try {
        Object.keys(obj).forEach(key => {
            if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
                delete obj[key];
            }
        });
        return obj;
    }catch (error){
        return obj
    }
}

export default  removeEmptyProperties ;