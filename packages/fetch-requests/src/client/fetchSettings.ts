const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

export const fetchSettings = async (requireSettings:string[],revalidate?:number|null)=>{
    try {
        const settingsQuery = requireSettings.map((setting) => `setting=${setting}`).join('&');

        const config = {
            next:{
                revalidate: revalidate ? revalidate : process.env.NODE_ENV === 'development' ? 1 : 604800
            }
        }
        //@ts-ignore
        const response = await fetch(`${APIServerUrl}/api/v1/settings/getSettings?${settingsQuery}`,config)
        return await response.json()
    }catch (error){
        console.error('error=> ',error)
    }
}