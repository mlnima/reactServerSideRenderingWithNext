declare const _clientQueryGeneratorForGettingPosts: (data: any, metaId: any) => {
    findPostsQueries: {
        $and: ({
            postType: any;
        } | {
            author: any;
        } | {
            $or: {
                videoEmbedCode: {
                    $not: RegExp;
                };
            }[];
        } | {
            $or: ({
                title: RegExp;
                description?: undefined;
            } | {
                description: RegExp;
                title?: undefined;
            } | {
                [x: string]: RegExp;
                title?: undefined;
                description?: undefined;
            })[];
        } | {
            $or: ({
                categories: {
                    $in: any;
                };
                tags?: undefined;
                actors?: undefined;
            } | {
                tags: {
                    $in: any;
                };
                categories?: undefined;
                actors?: undefined;
            } | {
                actors: {
                    $in: any;
                };
                categories?: undefined;
                tags?: undefined;
            })[];
        } | {
            status: string;
        })[];
    };
    size: number;
    page: number;
    selectedFields: string[];
    sortQuery: {
        updatedAt: number;
        createdAt: number;
    } | {
        [x: number]: number;
        updatedAt?: undefined;
        createdAt?: undefined;
    };
};
export default _clientQueryGeneratorForGettingPosts;
