import axios from "axios";
import _getMultipleSettingsQueryGenerator from "../../clientVariables/_getMultipleSettingsQueryGenerator";

export const getMultipleSetting = async (settings, token) => {
    return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/settings/getMultipleSetting${_getMultipleSettingsQueryGenerator(settings.settings, false)}&token=${token}`)
};