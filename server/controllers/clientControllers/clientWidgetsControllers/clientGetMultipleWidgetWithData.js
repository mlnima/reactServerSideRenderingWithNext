const widgetSchema = require('../../../models/settings/widgetSchema');
// const commentSchema = require('../../../models/commentSchema');
// const postSchema = require('../../../models/postSchema');
// const metaSchema = require('../../../models/metaSchema');
// const mongoose = require('mongoose');

module.exports = async (req, res) => {
//populate:{path:'actors',model:'meta'}
    try {
        const widgetsDataQuery = (req.body.widgets || []).map(position => position === 'all' ? {} : {'data.position': position})
        const widgets = await widgetSchema.find({$or: widgetsDataQuery}).populate([
            {path: 'data.metaData'},
            {path: 'data.posts',select: { '_id': 1,'redirectLink':1 ,'title' :1,'mainThumbnail' :1,'quality' :1,'duration' :1,'views' :1,'translations' :1,'VideoTrailerUrl' :1,'postType' :1,'likes':1,'disLikes':1}},
        ]).exec()
        Promise.all(widgets).then(widgetsWithData => {
            res.json({widgets: widgetsWithData})
            res.end()
        }).catch(err => {
            console.log(err)
            res.end()
        })
    } catch (err) {
        console.log(err)
        res.end()
    }

}