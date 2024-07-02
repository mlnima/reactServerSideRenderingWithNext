import { MetadataRoute } from 'next'
import {fetchSettings} from "@lib/fetch-requests/client/fetchSettings";

 const manifest= async ():Promise<MetadataRoute.Manifest> => {

     try {
         const initialSettingsData = await fetchSettings({
             requireSettings: ['initialSettings'],
         });

         const headDataSettings = initialSettingsData?.settings?.initialSettings?.headDataSettings

         const name = headDataSettings.title ? {name:headDataSettings.title} :{};
         const short_name =  {short_name:headDataSettings.siteName ||headDataSettings.title || 'positron'}
         const description = headDataSettings.description ? {description:headDataSettings.description} :{};
         const display =  {display:headDataSettings.display || 'standalone'}
         const start_url =  {   start_url: headDataSettings.start_url || '/',}
         const orientation =  {   orientation: headDataSettings.orientation || '/',}
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

         return {
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



     }catch (error){
         console.log(`manifest error=> `,error)
         return{}
     }

}

export default manifest