type SortOrder = 'asc' | 'desc';

function sortArrayByPropertyOfObject<T>(
    array: T[],
    key: string,
    order: SortOrder = 'asc'
): T[] {
    const instanceArray = [...array]
    try {
        return instanceArray.sort((a, b) => {
            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1;
            } else if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
    } catch (error) {
        console.error('Error while sorting array:', error);
        return array;
    }
}

export default sortArrayByPropertyOfObject