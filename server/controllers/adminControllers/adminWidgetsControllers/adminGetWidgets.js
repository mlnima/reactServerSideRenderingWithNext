const widgetSchema = require('../../../models/widgetSchema');



// const getWidgets =








module.exports = async (req, res) => {
    try {
        const widgets = await widgetSchema.find({}).populate([
            {
                model:'meta',
                path: 'data.uniqueData.metaData'},
            {
                model:'post',
                path: 'data.uniqueData.posts',
                populate: [
                    {
                        path: 'actors',
                        select: {'name': 1, 'type': 1},
                        options: {}
                    },
                    {
                        path: 'categories',
                        select: {'name': 1, 'type': 1, 'imageUrl': 1},
                        options: {}
                    },
                    {
                        path: 'tags',
                        select: {'name': 1, 'type': 1},
                        options: {}
                    }
                ],
                select: {'_id': 1, 'redirectLink': 1, 'title': 1, 'mainThumbnail': 1, 'quality': 1, 'duration': 1, 'views': 1, 'translations': 1, 'VideoTrailerUrl': 1, 'postType': 1, 'likes': 1, 'disLikes': 1, 'updatedAt': 1, 'createdAt': 1}
            },
        ]).sort({updatedAt: -1}).exec()
        Promise.all(widgets).then(widgetsWithData => {
            res.json({widgets: widgetsWithData})
        }).catch(err => {
            console.log(err)
            res.end()
        })
    } catch (err) {
        console.log(err)
        res.end()
    }
}