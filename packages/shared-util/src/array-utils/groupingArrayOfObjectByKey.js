/**
 * @typedef {Object.<string, any>} Item
 */

/**
 * Groups an array of objects by the first letter of a specified key.
 *
 * @param {Item[]} array - The array of objects to be grouped.
 * @param {string} key - The key to group by.
 * @returns {{ [letter: string]: Item[] }} The grouped objects.
 */
const groupingArrayOfObjectByKey = (array, key) => {
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

module.exports = groupingArrayOfObjectByKey;
