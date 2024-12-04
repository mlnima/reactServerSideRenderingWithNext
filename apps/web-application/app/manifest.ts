import initialSettings from '../public/initialSettings.json';

interface HeadDataSettings {
    title?: string;
    siteName?: string;
    description?: string;
    display?: string;
    start_url?: string;
    orientation?: string;
    themeColor?: string;
    pwa192?: string;
    pwa384?: string;
    pwa512?: string;
}

interface Manifest {
    name?: string;
    short_name: string;
    description?: string;
    display: string;
    start_url: string;
    orientation: string;
    theme_color: string;
    background_color: string;
    icons: Array<{
        src: string;
        sizes: string;
        type: string;
        purpose: string;
    }>;
}

const manifest = async (): Promise<Manifest | {}> => {
    try {
        const headDataSettings: HeadDataSettings | undefined = initialSettings?.headDataSettings;

        if (!headDataSettings) {
            return {};
        }

        const name = headDataSettings.title ? { name: headDataSettings.title } : {};
        const short_name = {
            short_name: headDataSettings.siteName || headDataSettings.title || 'positron',
        };
        const description = headDataSettings.description ? { description: headDataSettings.description } : {};
        const display = { display: headDataSettings.display || 'standalone' };
        const start_url = { start_url: headDataSettings.start_url || '/' };
        const orientation = { orientation: headDataSettings.orientation || 'portrait' };
        const theme_color = { theme_color: headDataSettings.themeColor || '#000' };
        const background_color = { background_color: headDataSettings.themeColor || '#000' };

        const baseUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL || '';

        const icons = [
            {
                src: headDataSettings.pwa192 || `${baseUrl}/asset/images/default/pwa/192.png`,
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: headDataSettings.pwa384 || `${baseUrl}/asset/images/default/pwa/384.png`,
                sizes: '384x384',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: headDataSettings.pwa512 || `${baseUrl}/asset/images/default/pwa/512.png`,
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
        ];

        return {
            ...name,
            ...short_name,
            ...description,
            ...display,
            ...start_url,
            ...orientation,
            ...theme_color,
            ...background_color,
            icons,
        };
    } catch (error) {
        console.error('Error generating manifest:', error);
        return {};
    }
};

export default manifest;



// import initialSettings from '../public/initialSettings.json';
//
// const manifest = async () => {
//     try {
//         const headDataSettings  = initialSettings?.headDataSettings;
//
//         if (!headDataSettings) {
//             return {};
//         }
//
//         const name = headDataSettings.title ? { name: headDataSettings.title } : {};
//         const short_name = { short_name: headDataSettings.siteName || headDataSettings.title || 'positron' };
//         const description = headDataSettings.description ? { description: headDataSettings.description } : {};
//         const display = { display: headDataSettings.display || 'standalone' };
//         const start_url = { start_url: headDataSettings.start_url || '/' };
//         const orientation = { orientation: headDataSettings.orientation || 'portrait' };
//         const theme_color = { theme_color: headDataSettings.themeColor || '#000' };
//         const background_color = { background_color: headDataSettings.themeColor || '#000' };
//
//         const icons = [
//             {
//                 src:
//                     headDataSettings?.pwa192 ||
//                     process.env.NEXT_PUBLIC_PRODUCTION_URL + '/asset/images/default/pwa/192.png',
//                 sizes: '192x192',
//                 type: 'image/png',
//                 purpose: 'any',
//             },
//             {
//                 src:
//                     headDataSettings?.pwa384 ||
//                     process.env.NEXT_PUBLIC_PRODUCTION_URL + '/asset/images/default/pwa/384.png',
//                 sizes: '384x384',
//                 type: 'image/png',
//                 purpose: 'any',
//             },
//             {
//                 src:
//                     headDataSettings?.pwa512 ||
//                     process.env.NEXT_PUBLIC_PRODUCTION_URL + '/asset/images/default/pwa/512.png',
//                 sizes: '512x512',
//                 type: 'image/png',
//                 purpose: 'any',
//             },
//         ];
//
//         return {
//             ...name,
//             ...short_name,
//             ...description,
//             ...display,
//             ...start_url,
//             ...orientation,
//             ...theme_color,
//             ...background_color,
//             icons: icons,
//         };
//     } catch {
//         return;
//     }
// };
//
// export default manifest;
