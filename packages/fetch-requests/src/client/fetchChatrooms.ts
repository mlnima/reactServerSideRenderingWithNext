const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
import config from './config'

type fetchChatroomDataArgs={
    identifier:string,
    revalidate?:number|null
}

export const fetchChatroomData = async ({identifier, revalidate}:fetchChatroomDataArgs)=>{
    try {

        const response = await fetch(
            `${APIServerUrl}/api/v1/chatrooms/getChatroom?identifier=${identifier}`,
            config({revalidate})
        );

        return response.json()
    }catch (error){
        console.error('error=> ',error)
    }
}