
import {
    clientAPIRequestGetSettings,
    clientAPIRequestGetWidgets
} from "api-requests";

import {reduceWidgetsToGroups} from "custom-util";

interface PropTypes {
    locale: string,
    dynamicWidgets: string[],
    requireSettings: string[],
}

const getCurrentPageData = async ({dynamicWidgets, locale, requireSettings}: PropTypes) => {

    try {
        const widgetsPositionsToRequest = ['footer', 'header', 'topBar', 'navigation', ...dynamicWidgets];

        const widgetsRequest = await clientAPIRequestGetWidgets(widgetsPositionsToRequest, locale)
        const settingsRequest = await clientAPIRequestGetSettings(requireSettings)
console.log(settingsRequest.data)
        const widgets= reduceWidgetsToGroups([...(widgetsRequest.data?.widgets || [])])
        const settings= settingsRequest.data

        const pageData ={
            widgets,
            settings
        }



        return pageData

    } catch (error) {
        return {}
    }

};

export default getCurrentPageData;