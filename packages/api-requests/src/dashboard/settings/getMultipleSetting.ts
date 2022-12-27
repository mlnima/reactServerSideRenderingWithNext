import AxiosInstance from "../../lib/AxiosInstance";

const getMultipleSetting = async ()=>{
    return await AxiosInstance.get(`/api/admin/settings/getMultipleSetting?setting=identity&setting=design&setting=adminSettings&setting=membershipSettings&token=${localStorage.wt}`)
}

export default getMultipleSetting;