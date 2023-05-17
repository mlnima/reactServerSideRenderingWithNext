type SortOrder = 'asc' | 'desc';

//GPT4
const sortArrayByPropertyOfObject = <T>(array: T[], key: keyof T, order: SortOrder = 'asc'): T[] => {
    const instanceArray = [...array];

    return instanceArray.sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });
};

export default sortArrayByPropertyOfObject;