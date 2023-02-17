import {metaSchema} from "models";


export const findMetasAndCreateFile = async (metaType, fields) => {
    try {
        const metas = await metaSchema.find(metaType,fields).limit(10).exec()

        console.log(metas)
    } catch (error) {

    }

}


const metas = async (req, res) => {
    try {
        const metaType = req.query.metaType ? {type: req.query.metaType} : {}
        const fields = req.query.field
        await findMetasAndCreateFile(metaType,fields)
        res.end()
    } catch (error) {

    }
}

export default metas;