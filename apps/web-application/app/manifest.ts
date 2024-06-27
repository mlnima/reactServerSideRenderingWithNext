import { MetadataRoute } from 'next'
import {fetchSettings} from "@lib/fetch-requests/client/fetchSettings";

//: MetadataRoute.Manifest
 const manifest=async ()=> {
    const initialSettingsData = await fetchSettings({
        requireSettings: ['initialSettings'],
    });

    console.log(`manifest=> `,initialSettingsData)
    return {
        name: 'Next.js App',
        short_name: 'Next.js App',
        description: 'Next.js App',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}

export default manifest