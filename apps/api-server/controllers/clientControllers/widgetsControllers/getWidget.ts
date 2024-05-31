import {WidgetSchema} from 'shared-schemas';

const getWidget = (req, res) => {
    const position = req.body.position = 'all' ? {} : {position: req.body.position};
    WidgetSchema.find(position).exec().then(widgets => {
        res.json({widgets})
    }).catch(err => {
        console.log(err)
        res.status(400).send('Bad Request')
    })
}

export default getWidget;