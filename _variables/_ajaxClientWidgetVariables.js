//ajaxClientWidgetVariables

import axios from "axios";


export const clientSelfWidgetUpdate = async (data) => {
    const body = {
        ...data
    };
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/v1/widgets/clientSelfWidgetUpdate', body)
};