import {fetchWidgets} from "../clientReducers/widgetsReducer";
import {fetchSettings} from "../clientReducers/settingsReducer";

export const _getServerSideStaticPageData = async (context, dynamicWidgets, options, store) => {

    const staticWidgets = ['footer', 'header', 'topBar', 'navigation']
    const widgetsPositionsToRequest = [...staticWidgets, ...dynamicWidgets]

    await store.dispatch(fetchWidgets({
        positions: widgetsPositionsToRequest,
        locale: context.locale
    }))

    await store.dispatch(fetchSettings({
        requireSettings: ['initialSettings',`${options.page}Settings`],
        options: {
            page: options.page,
            setHeadData: options.setHeadData
        },
        context
    }))
}

export default _getServerSideStaticPageData
