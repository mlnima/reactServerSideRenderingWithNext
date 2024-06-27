const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
import config from './config'

type IUserPageInitialData = {
    userWhoRequestIt: string;
    username: string;
    revalidate?:number | undefined,
    tags?:string[]
}

export const fetchUserPageInitialData = async ({userWhoRequestIt,username,revalidate,tags}:IUserPageInitialData)=>{
    try {
        const response = await fetch(
            `${APIServerUrl}/api/v1/users/getUserPageInitialData?userWhoRequestIt=${userWhoRequestIt}&username=${username}`,
            config({revalidate,useWtToken:true,cacheOption:'no-store'})
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
