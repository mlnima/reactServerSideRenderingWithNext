// import AxiosInstance from "../lib/AxiosInstance";
// import axios from "axios";

// export const clientAPIRequestGetUncachedSettings = async (requireSettings:string[])=>{
//     const settingsQuery = `?${requireSettings.map((setting:string) => 'setting=' + setting).join('&')}`;
//     return await AxiosInstance.get(`/api/dashboard/settings${settingsQuery}`);
// }

// export const clientAPIRequestGetSettings = async ({ requireSettings }:{requireSettings:string[]})=>{
//     const settingsQuery = requireSettings.map((setting) => `setting=${setting}`).join('&');
//     return await AxiosInstance.get(`/api/v1/settings?${settingsQuery}`);
// }


// const buildServerPort =parseInt(process.env.PORT || '3000') + 9
//

// export const getSettingsBuild = async ({ requireSettings }:{requireSettings:string[]}) => {
//     const settingsQuery = requireSettings.map(setting => `setting=${setting}`).join('&');
//     return await axios.get(`http://localhost:${buildServerPort}/api/build/settings?${settingsQuery}`);
// };
// export const shutdownBuildServer =  ()=>{
//    axios.get(`http://localhost:${buildServerPort}/api/build/shutdown`);
// }

