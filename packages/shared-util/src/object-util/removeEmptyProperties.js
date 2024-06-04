const removeEmptyProperties = obj => {
    try {
        Object.keys(obj).forEach(key => {
            if (
                obj[key] === undefined ||
                obj[key] === null ||
                obj[key] === ''
            ) {
                delete obj[key];
            }
        });
        return obj;
    } catch (error) {
        return obj;
    }
};

module.exports = removeEmptyProperties;
