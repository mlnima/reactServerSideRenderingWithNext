import {fetchWidgets} from "@store_toolkit/clientReducers/widgetsReducer";
import {fetchSettings} from "@store_toolkit/clientReducers/settingsReducer";

export const _getServerSideStaticPageData = async (context, dynamicWidgets, options, store) => {

    await store.dispatch(fetchSettings({
        requireSettings: ['identity', 'design'],
        options: {
            page: options.page,
            setHeadData: options.setHeadData
        },
        context
    }))

    await store.dispatch(fetchWidgets({
        positions: ['footer', 'header', 'topBar', 'navigation', ...dynamicWidgets],
        locale: context.locale
    }))
}

export default _getServerSideStaticPageData
