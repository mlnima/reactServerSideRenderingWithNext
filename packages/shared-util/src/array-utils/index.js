export const arraySortRandom = inputArray => {
    if (Array?.isArray(inputArray)) {
        try {
            return ([...inputArray] || [])?.sort(() => Math.random() - 0.5);
        } catch (err) {
            return inputArray;
        }
    } else return inputArray;
};

export const groupingArrayOfObjectByKey = (array, key) => {
    const grouped = {};

    for (const item of array) {
        // Extract the first letter
        const firstLetter = item[key].charAt(0).toLowerCase();

        // If the first letter is not already a property in the grouped object,
        // create an empty array for it
        if (!grouped[firstLetter]) {
            grouped[firstLetter] = [];
        }

        // Add the current item to the appropriate array in the grouped object
        grouped[firstLetter].push(item);
    }

    return grouped;
};

export const reduceArrayOfDataToIds = dataArr =>
    Array.isArray(dataArr) ? dataArr.map(data => data._id) : [];

export const reduceWidgetsToGroups = widgets => {
    return widgets.reduce((widgetInPositions, widget) => {
        widgetInPositions[widget.data.position] = [
            ...(widgetInPositions[widget.data.position] || []),
            widget,
        ];
        return widgetInPositions;
    }, {});
};

export const sortArrayByPropertyOfObject = (array, key, order) => {
    const instanceArray = [...array];

    return instanceArray.sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });
};

export const uniqArrayBy = (array, key) => {
    const seen = new Set();
    return array.filter(item => {
        const keyValue = item[key];
        if (seen.has(keyValue)) {
            return false;
        } else {
            seen.add(keyValue);
            return true;
        }
    });
};