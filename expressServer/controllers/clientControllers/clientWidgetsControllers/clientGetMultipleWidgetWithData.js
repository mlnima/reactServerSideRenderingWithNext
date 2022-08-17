const widgetSchema = require('../../../models/widgetSchema');

module.exports = async (req, res) => {

    try {
        const locale = req.query.locale
        const locales = process.env.NEXT_PUBLIC_LOCALS.split(' ')
        const excludeOtherLanguagesQuery = locale ? {select: locales.map(languageCode => languageCode !== locale ? `-data.translations.${languageCode}` : '').join(' ')} : {}
        const requestedWidgets = Array.isArray(req.query.widget) ? req.query.widget : [req.query.widget]
        const widgetsDataQuery = requestedWidgets.map(position => position === 'all' ? {} : {'data.position': position})
        const widgets = await widgetSchema.find(
            {$or: [...widgetsDataQuery]},
            {},
            excludeOtherLanguagesQuery).populate([
            {
                model:'meta',
                path: 'data.uniqueData.metaData',
            },
            {
                model:'post',
                path: 'data.uniqueData.posts',
                populate: [
                    {
                        path: 'actors',
                        select: {
                            'name': 1,
                            'type': 1
                        },
                        options: {limit: 3}
                    },
                    {
                        path: 'categories',
                        select: {
                            'name': 1,
                            'type': 1,
                            'imageUrl': 1
                        },
                        // options: {limit: 3}
                    },
                    {
                        path: 'tags',
                        select: {
                            'name': 1,
                            'type': 1
                        }
                    }],
                select: {'_id': 1, 'redirectLink': 1, 'title': 1, 'mainThumbnail': 1, 'quality': 1, 'duration': 1, 'views': 1, 'translations': 1, 'VideoTrailerUrl': 1, 'postType': 1, 'likes': 1, 'disLikes': 1, 'updatedAt': 1, 'createdAt': 1}
            },
        ])
            // .sort({updatedAt: -1})
            // .select(`+translation.${locale}`)
            // .select('-data.title')
            .exec()
        Promise.all(widgets).then(widgetsWithData => {
            res.json({widgets: widgetsWithData || []})
        }).catch(err => {
            console.log(err)
            res.json({widgets: []})
        })
    } catch (err) {
        console.log(err)
        res.status(400).send('Bad Request')
    }

}