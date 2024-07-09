import mongoose from 'mongoose';
import settingSchema from "./apps/api-server/schemas/settingSchema";

class HelperFunctions {
    static dev = process.env.NODE_ENV !== 'production';
    static async connectToDatabase(){
        try {
            const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
            const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
            const dbHost =  process.env.DB_HOST || 'localhost';
            const dbPort = process.env.DB_PORT || 2707;
            const dbConnectQuery = `mongodb://${dbUser}${dbPass}${dbHost}:${dbPort}/${process.env.DB_NAME}`;
            await mongoose.connect(dbConnectQuery);
        }catch (error){
            console.log('Error connecting to Database', error);
            process.exit(1);
        }
    }

     static async getSettings(type:string) {
        if (HelperFunctions.dev) return {}
        return await HelperFunctions.connectToDatabase().then(async ()=>{
            try {
                return await settingSchema.findOne({type}).lean()
            }catch (error){
                console.log(`HelperFunctions getSettings => `,error)
            }
        })
    }
}

export default HelperFunctions;
