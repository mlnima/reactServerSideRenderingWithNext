const sortArrayByPropertyOfObject = (array, key, order) => {
    const instanceArray = [...array];

    return instanceArray.sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });
};

module.exports = sortArrayByPropertyOfObject;
