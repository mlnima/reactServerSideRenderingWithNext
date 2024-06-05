const reduceArrayOfDataToIds = dataArr =>
    Array.isArray(dataArr) ? dataArr.map(data => data._id) : [];

module.exports = reduceArrayOfDataToIds;
