import dotenv from 'dotenv';

dotenv.config({path: '../../.env'});
import {connectToDatabase} from 'custom-server-util';

connectToDatabase('Setup').finally()
import {settingSchema, widgetSchema, userSchema} from 'models';
import bcrypt from 'bcryptjs';
import uuidAPIKey from 'uuid-apikey';
import defaultIdentitySettings from "../asset/defaultIdentitySettings";
import defaultDesignSettings from "../asset/defaultDesignSettings";
import defaultAdminAccountData from "../asset/defaultAdminAccountData";
import defaultWidgets from "../asset/defaultWidgets";


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
        const identityToSave = new settingSchema(defaultIdentitySettings)

        const siteDesignToSave = new settingSchema(defaultDesignSettings)

        await identityToSave.save(error => console.log(error))

        await siteDesignToSave.save(error => console.log(error))
    } catch (error) {
        console.log(error)
    }
}


const createAdminAccount = async () => {
    try {
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

    } catch (error) {
        console.log(error)
    }
}


const runScripts = async () => {
    await setWidgets()
    await setSettings()
    await createAdminAccount
}

runScripts().then(() => {
    setTimeout(()=>{
        process.exit()
    },15000)
})


