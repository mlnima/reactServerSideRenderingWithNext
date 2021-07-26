//ajaxClientWidgetVariables

import axios from "axios";


export const clientSelfWidgetUpdate = async (_id) => {
    const body = {
        _id,
    };
    return await axios.post(window.location.origin + '/api/v1/widgets/clientSelfWidgetUpdate', body)
};