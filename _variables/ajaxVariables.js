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
        return await axios.post(`http://localhost:3000/api/v1/settings/get?type=${type}`,body)
};

// export const getMultipleSettings = async (settingsType)=>{
//
// }


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
    return await axios.post('http://localhost:3000/api/v1/settings/getWidget',body)
}
export const getWidgetsWithData = async (position)=>{
    const body = {
        position,
    };
    return await axios.post('http://localhost:3000/api/v1/settings/getWidgetsWithData',body)
}

export const updateWidgets = async (id,data)=>{
    const body = {
        id,
        data,
    };
    return await axios.post('http://localhost:3000/api/v1/settings/updateWidget',body)
}

export const deleteWidgets = async (id)=>{
    const body = {
        id,
    };
    return await axios.post('http://localhost:3000/api/v1/settings/deleteWidget',body)
}

