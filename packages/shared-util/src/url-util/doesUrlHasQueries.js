const doesUrlHasQueries = (url: string): boolean => {
    // Using URL constructor to parse the url
    try {
        const parsedUrl = new URL(url);
        // Return true if the query string exists, false otherwise
        return !!parsedUrl.search;
    } catch (error) {
        console.error("Invalid URL", error);
        return false;
    }
};

export default doesUrlHasQueries