import axios from 'axios'

export const getUsersList = async ()=>{
    let body = {
        token:localStorage.wt
    }
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL +'/api/v1/users/getUsersList',body)
}
export const getUsersListAsAdmin = async (id)=>{
    const body = {
        id,
        token: localStorage.wt
    };
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL +'/api/v1/users/getUsersListAsAdmin',body)
}