type AnyObject = { [key: string]: any };

export const uniqArrayBy = (array: AnyObject[], key: string): AnyObject[] => {
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

export default uniqArrayBy;