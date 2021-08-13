//ajaxClientWidgetVariables

import axios from "axios";


export const clientSelfWidgetUpdate = async (data) => {
    const body = {
        ...data
    };
    return await axios.post(window.location.origin + '/api/v1/widgets/clientSelfWidgetUpdate', body)
};