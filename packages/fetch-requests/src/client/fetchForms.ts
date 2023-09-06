const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
import config from './config'

type IPostFormData = {
    formDataToPost?: {},
    revalidate?: number | null
}

export const postFormData =  async ({formDataToPost, revalidate}: IPostFormData) => {
    try {

        const response = await fetch(
            `${APIServerUrl}/api/v1/forms/saveFormData`,
            config({revalidate, method: 'POST', body: {data: formDataToPost}})
        );

        return await response.json()

    } catch (error) {

    }
}