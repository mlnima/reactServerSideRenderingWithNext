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
        requireSettings: ['identity', 'design','membershipSettings'],
        options: {
            page: options.page,
            setHeadData: options.setHeadData
        },
        context
    }))


}

// export const _getServerSideStaticPageData = async (context, dynamicWidgets, options, store) => {
//     const referer = context.req?.headers?.referer;
//     const staticWidgets = ['footer', 'header', 'topBar', 'navigation']
//
//     const matchReferer = new RegExp(`${process.env.NEXT_PUBLIC_PRODUCTION_URL}|localhost`, 'g');
//     const unMatchInternalReferer = new RegExp(`/sitemap`, 'g');
//     const isInternalReferer = referer ? !!matchReferer.test(referer) && !unMatchInternalReferer.test(referer)  : false;
//
//     const widgetsPositionsToRequest = isInternalReferer ? dynamicWidgets : [...staticWidgets, ...dynamicWidgets]
//     // const widgetsPositionsToRequest = [...staticWidgets, ...dynamicWidgets]
//
//     await store.dispatch(fetchWidgets({
//         positions: widgetsPositionsToRequest,
//         locale: context.locale
//     }))
//
//     await store.dispatch(fetchSettings({
//         requireSettings: ['identity', 'design'],
//         options: {
//             page: options.page,
//             setHeadData: options.setHeadData
//         },
//         context
//     }))
//
// }

export default _getServerSideStaticPageData
