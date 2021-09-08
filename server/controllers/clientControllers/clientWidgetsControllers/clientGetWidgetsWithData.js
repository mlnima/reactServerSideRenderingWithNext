const widgetSchema = require('../../../models/widgetSchema');

module.exports = (req, res) => {
    const position = req.body.position === 'all' ? {} : {position: req.body.position};
    widgetSchema.find(position).exec().then(async widgets => {
        const mapWidget = widgets.map(async widget => {
            let finalData = {
                _id: widget._id,
                title: widget.title,
                categories: widget.categories,
                tags: widget.tags,
                pagination: widget.pagination,
                redirectLink: widget.redirectLink,
                redirectToTitle: widget.redirectToTitle,
                count: widget.count,
                type: widget.type,
                position: widget.position,
                posts: [],
                sortBy: widget.sortBy,
                text: widget.text,
                textAlign: widget.textAlign,
                customHtml: widget.customHtml,
                backgroundImage: widget.backgroundImage
            }

            const sortMethod = finalData.sortBy ? {[finalData.sortBy]: -1} : {lastModify: -1}

            if (finalData.type === 'posts') {
                await postSchema.find({status: 'published'}).limit(widget.count).sort(sortMethod).exec().then(posts => {
                    finalData.posts = posts
                })
                return finalData
            } else {
                return widget
            }

            // return {
            //     ...widget.toObject(),
            //     posts:widget.type ==='posts'? await postSchema.find({ status: 'published' }).limit(widget.count).sort(sortMethod).exec():[]
            // }


        })
        const data = await Promise.all(mapWidget)
        res.json({widgets: data || []})
    })
}