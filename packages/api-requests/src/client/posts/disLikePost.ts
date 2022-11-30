import AxiosInstance from "../../lib/AxiosInstance";

const disLikePost = async (postId) => {
    const ratingData = localStorage?.ratingData ? JSON.parse(localStorage.ratingData) : {likes: [], disLikes: []};
    ratingData.disLikes = [...new Set([...ratingData.disLikes, postId])]
    ratingData.likes = ratingData.likes.filter(liked => liked !== postId)
    localStorage.setItem('ratingData', JSON.stringify(ratingData))

    const body = {
        id:postId,
        type: 'disLikes'
    };

    return await AxiosInstance.post('/api/v1/posts/likeDislikeView', body)
}
export default disLikePost;