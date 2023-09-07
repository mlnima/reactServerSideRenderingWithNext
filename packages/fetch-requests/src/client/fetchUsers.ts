const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
import config from './config'

type IUserPageInitialData = {
    userWhoRequestIt: string;
    username: string;
    revalidate?:number|null
}

export const fetchUserPageInitialData = async ({userWhoRequestIt,username,revalidate}:IUserPageInitialData)=>{
    try {
        const response = await fetch(
            `${APIServerUrl}/api/v1/users/getUserPageInitialData?userWhoRequestIt=${userWhoRequestIt}&username=${username}`,
            config({revalidate,useWtToken:true})
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