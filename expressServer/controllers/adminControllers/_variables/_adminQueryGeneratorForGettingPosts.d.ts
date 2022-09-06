declare const _adminQueryGeneratorForGettingPosts: (data: any) => {
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
            } | {
                [x: string]: RegExp;
                title?: undefined;
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
            status: any;
        })[];
    };
    size: any;
    page: number;
    selectedFields: any;
    sortQuery: {
        updatedAt: number;
        createdAt: number;
    } | {
        [x: number]: number;
        updatedAt?: undefined;
        createdAt?: undefined;
    };
};
export default _adminQueryGeneratorForGettingPosts;
