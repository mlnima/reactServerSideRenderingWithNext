import AxiosInstance from "../../lib/AxiosInstance";
import {AxiosResponse} from 'axios';

export interface createNewPostResponse {
    newPostId: string;
}

const createNewPost = async (data): Promise<createNewPostResponse> => {
    const response: AxiosResponse<createNewPostResponse> = await AxiosInstance.post<createNewPostResponse>(
        '/api/v1/posts/newPost', {data, token: localStorage.wt}
    );
    return response.data;
}
export default createNewPost;