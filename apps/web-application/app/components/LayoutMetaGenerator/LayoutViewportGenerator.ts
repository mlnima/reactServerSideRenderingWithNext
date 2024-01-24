import {fetchSettings} from "fetch-requests";

const LayoutViewportGenerator = async () => {

    const settingsData = await fetchSettings({requireSettings: ['initialSettings']})

    return {
        themeColor:settingsData?.settings?.initialSettings?.headDataSettings?.themeColor || 'black',
        viewport: {
            width: 'device-width',
            initialScale: 1,
            maximumScale: 1,
            userScalable: false,
        },
    }
}


export default LayoutViewportGenerator