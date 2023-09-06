import config from "./config";

const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

export const fetchSettings = async (requireSettings:string[],revalidate?:number|null)=>{
    try {
        const settingsQuery = requireSettings.map((setting) => `setting=${setting}`).join('&');

        const response = await fetch(
            `${APIServerUrl}/api/v1/settings/getSettings?${settingsQuery}`,
            config({revalidate})
        );

        return await response.json()
    }catch (error){

    }
}