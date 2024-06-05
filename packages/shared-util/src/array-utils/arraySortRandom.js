const arraySortRandom = inputArray => {
    if (Array?.isArray(inputArray)) {
        try {
            return ([...inputArray] || [])?.sort(() => Math.random() - 0.5);
        } catch (err) {
            return inputArray;
        }
    } else return inputArray;
};

module.exports = arraySortRandom;
