const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
import config from './config'

interface IFetchPage{
    pageName:string,
    revalidate?:number|null
}

export const fetchPage = async ({pageName, revalidate}:IFetchPage)=>{
    try {
        const response = await fetch(
            `${APIServerUrl}/api/v1/pages/getPage?pageName=${pageName}`,
            config({revalidate})
        );
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }
        return response.json()
    }catch (error){
        throw error;
    }
}

export default fetchPage