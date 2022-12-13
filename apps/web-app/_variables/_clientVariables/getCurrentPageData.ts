import getWidgets from "api-requests/src/client/widgets/getWidgets";
import getSettings from "api-requests/src/client/settings/getSettings";
import {reduceWidgetsToGroups} from "custom-util";

interface PropTypes {
    locale: string,
    dynamicWidgets: string[],
    requireSettings: string[],
}

const getCurrentPageData = async ({dynamicWidgets, locale, requireSettings}: PropTypes) => {

    try {
        const widgetsPositionsToRequest = ['footer', 'header', 'topBar', 'navigation', ...dynamicWidgets];

        const widgetsRequest = await getWidgets(widgetsPositionsToRequest, locale)
        const settingsRequest = await getSettings(requireSettings)

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