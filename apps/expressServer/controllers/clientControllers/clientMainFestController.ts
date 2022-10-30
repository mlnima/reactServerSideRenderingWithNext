import settingSchema from '../../models/settings/settingSchema';

const clientMainFestController = async (req, res) =>{

    try {
        const identityData = await settingSchema.findOne({type: 'identity'})
        const manifestJsonData = {
            "theme_color": identityData.data.themeColor || '#000',
            "background_color": identityData.data.themeColor || '#000',
            "name": identityData.data.title || 'React CMS website',
            "short_name": identityData.data.title || 'React CMS website',
            "icons": [
                {
                    "src": identityData?.data?.pwa192 || process.env.NEXT_PUBLIC_PRODUCTION_URL + '/static/images/pwa/192.png',
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "any maskable"
                },
                {
                    "src": identityData?.data?.pwa384 || process.env.NEXT_PUBLIC_PRODUCTION_URL + '/static/images/pwa/384.png',
                    "sizes": "384x384",
                    "type": "image/png",
                    "purpose": "image/png"
                },
                {
                    "src": identityData?.data?.pwa512 || process.env.NEXT_PUBLIC_PRODUCTION_URL + '/static/images/pwa/512.png',
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "image/png"
                }
            ],
            "display": "standalone",
            "start_url": "/",
            "orientation": "portrait"
        }
        res.json(manifestJsonData)

    }catch (err) {
        console.log(err)
    }


}

export default clientMainFestController