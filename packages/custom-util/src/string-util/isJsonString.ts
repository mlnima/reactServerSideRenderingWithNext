const isJsonString = (jsonString : any) => {
    if (typeof jsonString !== "string") {
        return false;
    }
    try {
        JSON.parse(jsonString);
        return true;
    } catch (error) {
        return false;
    }
}

export default isJsonString