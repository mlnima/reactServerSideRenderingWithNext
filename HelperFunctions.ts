import mongoose from 'mongoose';
import settingSchema from "./apps/api-server/schemas/settingSchema";

class HelperFunctions {

    static async connectToDatabase(){
        try {
            const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
            const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
            const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
            const dbConnectQuery = `mongodb://${dbUser}${dbPass}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
            await mongoose.connect(dbConnectQuery);
        }catch (error){
            console.log('Error connecting to Database', error);
            process.exit(1);
        }
    }

     static async getSettings(type:string) {
        return await HelperFunctions.connectToDatabase().then(()=>{
            return settingSchema.findOne({type}).lean().exec()
        })
    }
}

export default HelperFunctions;
