import {fetchWidgets} from "@store_toolkit/clientReducers/widgetsReducer";
import {fetchSettings} from "@store_toolkit/clientReducers/settingsReducer";

export const getDefaultPageData = async (context, dynamicWidgets, options, store) => {

    // context.res.setHeader(
    //     'Cache-Control',
    //     'public, s-maxage=604800, stale-while-revalidate=604800'
    // )
// console.log(store.getState().widgets?.requestedWidgets)
// console.log('getDefaultPageData')
    // const prevStore = await store?.getState()
    //  console.log(prevStore.user?.userData)
    //
    // const requireWidgets = ['footer', 'header', 'topBar', 'navigation', ...dynamicWidgets]
    // const requireSettings = ['identity', 'design']
    // const existingWidgets = prevStore.widgets?.requestedWidgets;
    // const existingSettings = prevStore.settings?.requestedSettings;
    //
    //
    // const differenceWidgets = requireWidgets.filter(x => !existingWidgets?.includes(x));
    // const differenceSettings = requireSettings.filter(x => !existingSettings?.includes(x));

    // console.log(differenceWidgets)
    // console.log(differenceSettings)
    // if (differenceSettings?.length) {
    //     await store.dispatch(fetchSettings(differenceSettings))
    // } else {
    //
    //     // await store.dispatch(setHeadData(_firstRequestHeadDataSetter(context, options?.page, options?.setHeadData, prevStore.settings?.identity)))
    // }
    // if (differenceWidgets?.length) {
    //     // await store.dispatch(fetchWidgets({positions:['footer', 'header', 'topBar', 'navigation'],locale:context.locale}))
    //     await store.dispatch(fetchWidgets({positions: differenceWidgets, locale: context.locale}))
    // }

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
