const isEmptyObject=(ObjectToTest)=> {
    return Object.keys(ObjectToTest).length === 0 && ObjectToTest?.constructor === Object;
}