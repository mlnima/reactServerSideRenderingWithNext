import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});
import {connectToDatabase} from 'custom-server-util';

import {settingSchema, widgetSchema, userSchema,postSchema} from 'models';
import bcrypt from 'bcryptjs';
import uuidAPIKey from 'uuid-apikey';
import defaultIdentitySettings from "../asset/defaultIdentitySettings";
import defaultDesignSettings from "../asset/defaultDesignSettings";
import defaultAdminAccountData from "../asset/defaultAdminAccountData";
import defaultMembershipSettings from "../asset/defaultMembershipSettings";
import defaultHelloWorldPost from "../asset/defaultHelloWorldPost";
import defaultWidgets from "../asset/defaultWidgets";
import {isEmptyObject} from 'custom-util'

const createHelloWorldPost = async ()=>{
    const postDataToSave = new postSchema(defaultHelloWorldPost)
    postDataToSave.save().catch(err => {
        console.log(err)
        console.log('Error on HelloWorldPost')
    })
}
const setWidgets = async () => {
    try {
        for await (const widget of defaultWidgets) {
            const dataToSave = new widgetSchema(widget)
            dataToSave.save().catch(err => {
                console.log(err)
                console.log('Error on widget set')
            })
        }
    } catch (error) {
        console.log(error)
    }
}




const setSettings = async () => {
    try {

        // const identitySettings = settingSchema.findOne({type:'identity'}).exec()
        // const designSettings = settingSchema.findOne({type:'design'}).exec()
        //
        // if (!isEmptyObject(identitySettings)){
        //     const identityToSave = new settingSchema(defaultIdentitySettings)
        //     await identityToSave.save(error => console.log(error))
        // }
        // if (!isEmptyObject(designSettings)){
        //     const siteDesignToSave = new settingSchema(defaultDesignSettings)
        //     await siteDesignToSave.save(error => console.log(error))
        // }

        const identityToSave = new settingSchema(defaultIdentitySettings)
        await identityToSave.save(error => console.log(error || ''))

        const siteDesignToSave = new settingSchema(defaultDesignSettings)
        await siteDesignToSave.save(error => console.log(error || ''))

        const membershipSettings = new settingSchema(defaultMembershipSettings)
        await membershipSettings.save(error => console.log(error || ''))

    } catch (error) {
        console.log(error)
    }
}


const createAdminAccount = async () => {
    try {

        const adminUser = userSchema.findOne({username:'Admin'})
        if (!isEmptyObject(adminUser)){
            const APIKey = await uuidAPIKey.create()
            await bcrypt.hash(defaultAdminAccountData.password, 10, function (err, hash) {
                if (err) {
                    console.log(err)
                } else if (hash) {
                    const adminAccountData = {
                        ...defaultAdminAccountData,
                        password: hash,
                        API_KEY: APIKey.apiKey,
                        uuid: APIKey.uuid
                    }
                    const adminDataToSave = new userSchema(adminAccountData)
                    adminDataToSave.save()
                    console.log('admin account created , username: Admin , password: Admin')
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
}


const runScripts = async () => {
    try {
        await connectToDatabase('Setup')
        await createAdminAccount()
        await setWidgets()
        await setSettings()
        await createHelloWorldPost()
    }catch (error){
        console.log(error)
    }
}

runScripts().then(() => {
    // process.exit()
    setTimeout(()=>{
        process.exit()
    },10000)

})


