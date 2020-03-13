import axios from "axios";

export const updateSetting = async (type,data)=>{
    if (localStorage.wt){
        const body = {
            token: localStorage.wt,
            type,
            data
        };
        return await axios.post('http://localhost:3000/api/v1/settings/update',body)
    }
};




export const getSetting = async (type)=>{
        const body = {
            type,
        };
        return await axios.post('http://localhost:3000/api/v1/settings/get',body)
};


export const addNewWidget = async (data)=>{
    const body = {
        data,
    };
    return await axios.post('http://localhost:3000/api/v1/settings/addWidget',body)
}

export const getWidgets = async (position)=>{
    const body = {
        position,
    };
    return await axios.post('http://localhost:3000/api/v1/settings/getWidgets',body)
}

export const updateWidgets = async (id,data)=>{
    const body = {
        id,
        data,
    };
    return await axios.post('http://localhost:3000/api/v1/settings/updateWidgets',body)
}

export const deleteWidgets = async (id)=>{
    const body = {
        id,
    };
    return await axios.post('http://localhost:3000/api/v1/settings/deleteWidget',body)
}

