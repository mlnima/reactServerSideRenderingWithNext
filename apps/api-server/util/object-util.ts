export const isEmptyObject = (ObjectToTest:{}) => {
    if (!ObjectToTest) return false;
    return (
        Object.keys(ObjectToTest).length === 0 &&
        ObjectToTest?.constructor === Object
    );
};