type Item = { [key: string]: any };

const groupingArrayOfObjectByKey = (array: Item[], key: string): { [letter: string]: Item[] } => {
    const grouped: { [letter: string]: Item[] } = {};

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

export default groupingArrayOfObjectByKey;



//--old
// const groupingArrayOfObjectByKey =  (dataArray:Array<any>,key:string)=>{
//     if(!dataArray.length) return {}
//     if(!key) return {}
//
//     dataArray.reduce((finalData, current) => {
//         const firstLetter =current?.[key]?.[0]
//         finalData[firstLetter] = [...(finalData?.[firstLetter] || []), current]
//         return finalData
//     }, {})
// }
//
// export default groupingArrayOfObjectByKey;