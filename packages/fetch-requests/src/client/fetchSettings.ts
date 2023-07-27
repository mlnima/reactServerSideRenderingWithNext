const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

export const fetchSettings = async (requireSettings:string[])=>{
    try {
        const settingsQuery = requireSettings.map((setting) => `setting=${setting}`).join('&');
        const response = await fetch(`${APIServerUrl}/api/v1/settings/getSettings?${settingsQuery}`)
        return await response.json()
    }catch (error){
        console.error('error=> ',error)
    }
}