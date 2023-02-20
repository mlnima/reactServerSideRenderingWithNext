import {metaSchema} from "models";
import fs from "fs";
import path from "path";

//, {imageUrl: {$ne: null}}
export const findMetasAndCreateFile = async (metaType: string, fields: string,limit:number) => {
    try {
        //@ts-ignore
        const fieldsQuery = fields.map(field => `-${field}`).join(' ')
        //@ts-ignore
        const metaTypeQuery = metaType ? {$and: [{type: metaType}]} : {}
        const metas = await metaSchema.find(metaTypeQuery).select(fieldsQuery).limit(limit || -1).sort('-count').exec()
        const filePath = `/public/backups/${metaType}.json`
        const fileAbsolutePath = path.join(__dirname + `../../../../${filePath}`)
        await fs.writeFileSync(
            fileAbsolutePath,
            JSON.stringify(metas),
            {
                encoding: "utf8",
                flag: "w",
            }
        )
        return fileAbsolutePath
    } catch (error) {
        console.log(error)
    }

}


const metas = async (req, res) => {
    try {
        await findMetasAndCreateFile(req.body.metaType as string, req.body.fields,req.body.limit).then(filePath => {
            res.download(filePath)
        })
    } catch (error) {
        res.end()
    }
}

export default metas;