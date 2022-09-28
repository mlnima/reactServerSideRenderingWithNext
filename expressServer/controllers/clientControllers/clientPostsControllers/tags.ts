import {findMetas} from "../../../../_variables/serverVariables/serverGlobalVariable/findMetas";

const tags = async (req, res) => {
    try {
        const metas = await findMetas(req.query)
        res.json({metas})
    } catch (err) {
        console.log(err)
        res.end()
    }

}

export default tags