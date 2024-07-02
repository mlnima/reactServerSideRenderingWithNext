const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
import config from './config'

type IPostFormData = {
    formDataToPost?: {},
    revalidate?: number | null
}

export const postFormData =  async ({formDataToPost, revalidate}: IPostFormData) => {
    try {

        const response = await fetch(
            `${APIServerUrl}/api/v1/form`,
            config({revalidate, method: 'POST', body: {data: formDataToPost}})
        );
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }
        return await response.json()

    } catch (error) {
        throw error;
    }
}