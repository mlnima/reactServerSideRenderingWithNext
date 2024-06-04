
import settingSchema from '@schemas/settingSchema';
import {databaseSelectFieldsForPostCards} from "@repo/data-structures";
import fs from "fs";
import path from "path";
import createFileIfDoesntExist from "../serverGlobalVariable/createFileIfDoesntExist";
import widgetSchema from "@schemas/widgetSchema";

const staticWidgets = ['footer', 'header', 'topBar', 'navigation']
const staticSettings =    ['identity', 'design']

export const writeStaticWidgetsToJson = async ()=>{

    try {
        const populateWidgetsQuery = [
            {
                model:'meta',
                path: 'data.uniqueData.metaData',
            },
            {
                model:'post',
                path: 'data.uniqueData.posts',
                select: databaseSelectFieldsForPostCards
            }
        ]

        for await (const position of staticWidgets){
            const widgetsInCurrentPosition = await widgetSchema.find({'data.position':position}).populate(populateWidgetsQuery).exec()
            const pathToSave = path.join(__dirname,`../../../public/asset/jsons/widgets/${position}.json`)
            const dataToSave = [...widgetsInCurrentPosition]
            await createFileIfDoesntExist(pathToSave).then(()=>{
                fs.writeFile(pathToSave, JSON.stringify(dataToSave), (error) => {
                    if (error) {
                        console.log(error)
                    } else {
                    }
                })
            })
        }

    }catch (error) {
        console.log(error)
    }
}


export const writeStaticSettingsToJson = async ()=>{
    for await (const setting of staticSettings){
        const settingsInCurrentPosition = await settingSchema.findOne({type: setting}).exec()
        const pathToSave = path.join(__dirname,`../../../public/asset/jsons/settings/${setting}.json`)

        await createFileIfDoesntExist(pathToSave).then(()=>{
            fs.writeFile(pathToSave, JSON.stringify(settingsInCurrentPosition.data), (error) => {
                if (error) {
                    console.log(error)
                } else {
                }
            })
        })
    }
}


export const writeStaticDataToJson = () =>{
    writeStaticWidgetsToJson()
    writeStaticSettingsToJson()
}

