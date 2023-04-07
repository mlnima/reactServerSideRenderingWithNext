

async function asyncFunction(value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value * 2);
        }, 1000);
    });
}


const asyncArrayMap = async (array, callback) => {
    const results = [];
    for (const item of array) {
        const result = await asyncFunction(item);
        results.push(result);
    }

    return results;
}

export default asyncArrayMap