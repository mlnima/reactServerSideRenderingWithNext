const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
import config from './config'

interface IFetchPage{
    pageName:string,
    revalidate?:number|null
}

export const fetchPage = async ({pageName, revalidate}:IFetchPage)=>{
    console.log('console=> ',`${APIServerUrl}/api/v1/pages/getPage?pageName=${pageName}`)
    try {
        const response = await fetch(
            `${APIServerUrl}/api/v1/pages/getPage?pageName=${pageName}`,
            //@ts-ignore
            config(revalidate))
        return await response.json()
    }catch (error){
        // console.error('error=> ',error)
    }
}

export default fetchPage