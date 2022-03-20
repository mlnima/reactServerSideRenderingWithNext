import _getMultipleSettingsQueryGenerator from "../../clientVariables/_getMultipleSettingsQueryGenerator";
import Axios from "@_variables/util/Axios";

 const getMultipleSetting = async (settings, token) => {
    return await Axios.get( `/api/admin/settings/getMultipleSetting${_getMultipleSettingsQueryGenerator(settings.settings, false)}&token=${token}`)
};

export default getMultipleSetting