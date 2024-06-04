
const isNumericString = (str: string): boolean => {
    return /^\d+$/.test(str);
};

export default isNumericString;


// const isNumericString = (str: string): boolean => {
//     try {
//         const num = parseFloat(str);
//         // Check if parsed number is NaN or infinite
//         return !(isNaN(num) || !isFinite(num));
//     } catch (error) {
//         console.error(`Error in isNumericString`);
//         return false;
//     }
// };
//
// export default isNumericString;