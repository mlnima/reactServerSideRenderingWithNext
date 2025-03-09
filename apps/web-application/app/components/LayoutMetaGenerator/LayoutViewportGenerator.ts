import getSettings from '@lib/actions/database/operations/settings/getSettings';

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