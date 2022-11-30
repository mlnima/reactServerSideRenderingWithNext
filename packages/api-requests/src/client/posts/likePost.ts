import AxiosInstance from "../../lib/AxiosInstance";

const likePost = async (postId) => {
    const ratingData = localStorage?.ratingData ? JSON.parse(localStorage.ratingData) : {likes: [], disLikes: []};
    ratingData.likes = [...new Set([...ratingData.likes, postId])]
    ratingData.disLikes = ratingData.disLikes.filter(disLiked => disLiked !== postId)
    localStorage.setItem('ratingData', JSON.stringify(ratingData))

    const body = {
        id:postId,
        type: 'likes'
    };

    return await AxiosInstance.post('/api/v1/posts/likeDislikeView', body)
}
export default likePost;