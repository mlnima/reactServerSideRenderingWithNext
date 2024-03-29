import {formSchema} from 'models';

const getForms = async (req, res) => {
    
    try {
        const size = req.query.size ? parseInt(req.query.size) > 500 ? 500 : parseInt(req.query.size) : 30
        const searchQuery = {$or: [{widgetID: new RegExp(req.query.keyword, 'i')}, {data: new RegExp(req.query.keyword, 'i')}]};
        const page = req.query.page || 1;
        let sortQuery = (req.query.sort === 'latest' || !req.query.sort ) ? {_id:-1} : {[req.query.sort]: -1}
        //@ts-ignore
        const forms = await formSchema.find().limit(size).sort(sortQuery).exec();
        const totalCount = await formSchema.countDocuments({}).exec()

        res.json({forms, error: false, totalCount})
    }catch (error) {
        console.log(error)
        res.end()
    }

}

export default getForms;