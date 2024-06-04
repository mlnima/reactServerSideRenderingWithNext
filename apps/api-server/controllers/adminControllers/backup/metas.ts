
import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";
import metaSchema from "@schemas/metaSchema";

//, {imageUrl: {$ne: null}}
export const findMetasAndCreateFile = async (metaType: string, fields: string,limit:number) => {
    try {

        fsExtra.ensureDirSync(path.join(__dirname + `../../../../public/backups/`))
        //@ts-ignore
        const fieldsQuery = fields.map(field => `-${field}`).join(' ')
        //@ts-ignore
        const metaTypeQuery = metaType ? {$and: [{type: metaType}]} : {}
        const metas = await metaSchema.find(metaTypeQuery).select(fieldsQuery).limit(limit || -1).sort('-count').exec()
        const filePath = `/public/backups/${metaType}.json`
        const fileAbsolutePath = path.join(__dirname + `../../../../${filePath}`)
        fs.writeFileSync(
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