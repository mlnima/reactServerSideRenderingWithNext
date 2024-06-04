const reduceArrayOfDataToIds = (dataArr:any)=> Array.isArray(dataArr) ?  dataArr.map(data=>data._id) : []

export default reduceArrayOfDataToIds;