import {getSettings} from "@lib/database/operations/settings";

const LayoutViewportGenerator = async () => {

    const { initialSettings } = await getSettings(['initialSettings']);
    return {
        themeColor:initialSettings?.headDataSettings?.themeColor || 'black',
        viewport: {
            width: 'device-width',
            initialScale: 1,
            maximumScale: 1,
            userScalable: false,
        },
    }
}


export default LayoutViewportGenerator