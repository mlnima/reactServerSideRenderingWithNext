import globalStore from "@store/GlobalStore";
import path from "path";
import fs from 'fs-extra';

const dev = process.env.NODE_ENV !== 'production';

const baseOutputPath = path.join(
    __dirname,
    dev? `../../web-application/public` : `../../../web-application/public`,
);
class ManifestController{

    static generateManifestJson (){
       // const initialSettings = globalStore.getInitialSettings()
        const initialSettings = globalStore.getSetting('initialSettings')
        const headDataSettings = initialSettings?.headDataSettings

        const name = headDataSettings.title ? {name:headDataSettings.title} :{};
        const short_name =  {short_name:headDataSettings.siteName ||headDataSettings.title || 'positron'}
        const description = headDataSettings.description ? {description:headDataSettings.description} :{};
        const display =  {display:headDataSettings.display || 'standalone'}
        const start_url =  {   start_url: headDataSettings.start_url || '/',}
        const orientation =  {   orientation: headDataSettings.orientation || 'portrait',}
        const theme_color =  {   theme_color: headDataSettings.themeColor || '#000',}
        const background_color =  {   background_color: headDataSettings.themeColor || '#000',}

        const icons = [
            {
                "src": headDataSettings?.pwa192 || process.env.NEXT_PUBLIC_PRODUCTION_URL + '/asset/images/default/pwa/192.png',
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": headDataSettings?.pwa384 || process.env.NEXT_PUBLIC_PRODUCTION_URL + '/asset/images/default/pwa/384.png' ,
                "sizes": "384x384",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": headDataSettings?.pwa512 || process.env.NEXT_PUBLIC_PRODUCTION_URL + '/asset/images/default/pwa/512.png' ,
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any"
            }
        ]

        const manifestJsonData =  {
            ...name,
            ...short_name,
            ...description,
            ...display,
            ...start_url,
            ...orientation,
            ...theme_color,
            ...background_color,
            //@ts-ignore
            icons:icons
        }

        fs.writeFileSync(
            `${baseOutputPath}/manifest.json`,
            JSON.stringify(manifestJsonData, null, 2)
            ,{
                encoding: 'utf8',
                flag: 'w',
            }
        )

    }
}

export default ManifestController