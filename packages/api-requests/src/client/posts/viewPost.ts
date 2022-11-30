import AxiosInstance from "../../lib/AxiosInstance";

const viewPost = async (postId) => {
    const body = {
        id:postId,
        type: 'views'
    };

    return await AxiosInstance.post('/api/v1/posts/likeDislikeView', body)
}

export default viewPost;