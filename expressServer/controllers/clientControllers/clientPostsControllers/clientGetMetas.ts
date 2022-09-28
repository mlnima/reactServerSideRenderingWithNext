import {findMetas} from "../../../_variables/serverGlobalVariable/findMetas";

const clientGetMetas = async (req, res) => {
    try {
        const resultMetaFindQueries = await findMetas({...req.query, page: req.query.page || 1})
        res.json({...resultMetaFindQueries})
    } catch (err) {
        console.log(err)
        res.end()
    }

}

export default clientGetMetas