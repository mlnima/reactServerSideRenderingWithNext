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

        return response.json()
    }catch (error){

    }
}

export default fetchPage