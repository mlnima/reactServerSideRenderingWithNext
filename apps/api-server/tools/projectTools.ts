import bcrypt from 'bcryptjs';
import settingSchema from '../schemas/settingSchema';
import chatroomSchema from '../schemas/chatroomSchema';
import commentSchema from '../schemas/commentSchema';
import conversationSchema from '../schemas/conversationSchema';
import formSchema from '../schemas/formSchema';
import metaSchema from '../schemas/metaSchema';
import orderSchema from '../schemas/orderSchema';
import pageSchema from '../schemas/pageSchema';
import postSchema from '../schemas/postSchema';
import searchKeywordSchema from '../schemas/searchKeywordSchema';
import userSchema from '../schemas/userSchema';
import widgetSchema from '../schemas/widgetSchema';
import chatroomMessageSchema from '../schemas/chatroomMessageSchema';
import fileSchema from '../schemas/fileSchema';
import messengerConversationMessageSchema from '../schemas/messengerConversationMessageSchema';
import messengerConversationSchema from '../schemas/messengerConversationSchema';
import emailSchema from '../schemas/emailSchema';
import contactFormSchema from '../schemas/contactFormSchema';
import defaultInitialSettings from './asset/defaultInitialSettings';
import defaultAdminAccountData from './asset/defaultAdminAccountData';
import defaultDotEnvData from './asset/defaultDotEnvData';
import fs from 'fs-extra';
import path from 'path';

class ProjectTools {
  constructor() {}

  async help() {
    console.log(`resetAdminPassword`);
    console.log(`setupProject`);
    console.log(`copyOldFileToNewAPIServer`);
    console.log(`syncSchemasIndexes`);
  }

  async copyOldFileToNewAPIServer() {
    try {
      const sourceDir = path.join(__dirname, '../../file-server/public');
      const destDir = path.join(__dirname, '../../api-server/public');
      const targetPath = await fs.readdir(sourceDir);
      try {
        await fs.copy(sourceDir, destDir, { overwrite: true });
        console.log('Files copied successfully!');
      } catch (err) {
        console.error('Error copying files:', err);
      }
    } catch (error) {}
  }

  async syncSchemasIndexes() {
    try {
      await settingSchema.syncIndexes();
      await chatroomSchema.syncIndexes();
      await commentSchema.syncIndexes();
      await contactFormSchema.syncIndexes();
      await conversationSchema.syncIndexes();
      await formSchema.syncIndexes();
      await metaSchema.syncIndexes();
      await orderSchema.syncIndexes();
      await pageSchema.syncIndexes();
      await postSchema.syncIndexes();
      await searchKeywordSchema.syncIndexes();
      await userSchema.syncIndexes();
      await widgetSchema.syncIndexes();
      await chatroomMessageSchema.syncIndexes();
      await fileSchema.syncIndexes();
      await messengerConversationMessageSchema.syncIndexes();
      await messengerConversationSchema.syncIndexes();
      await emailSchema.syncIndexes();
      console.log('All indexes synced successfully.');
    } catch (error) {
      console.error('Error syncing indexes:', error);
    }
  }

  async resetAdminPassword() {
    try {
      const hash = await bcrypt.hash(defaultAdminAccountData.password, 10);
      await userSchema.findOneAndUpdate({ username: 'Admin' }, { $set: { password: hash } });
      console.log('admin password did reset');
    } catch (error) {
      console.log(`Error on restarting admin password=> `, error);
    }
  }

  async initialAdmin() {
    try {
      const hash = await bcrypt.hash(defaultAdminAccountData.password, 10);
      const adminDataToSave = new userSchema({
        ...defaultAdminAccountData,
        password: hash,
      });
      const savedAdminAccount = await adminDataToSave.save();
      console.log('admin password did reset :', savedAdminAccount);
    } catch (error) {
      console.log(`Error on initial Admin=> `, error);
    }
  }

  async initialSettings() {
    try {
      const initialSettingToSave = new settingSchema(defaultInitialSettings);
      const savedSettings = await initialSettingToSave.save();

      console.log('initialized settings :', savedSettings);
    } catch (error) {
      console.log(`Error on initial settings => `, error);
    }
  }

  // async setupProject() {
  //     try {
  //         const initialSettingToSave = new settingSchema(
  //             defaultInitialSettings,
  //         );
  //         await initialSettingToSave.save();
  //         await this.initialAdmin();
  //
  //         // console.log(`console=> `, defaultDotEnvData());
  //     } catch (error) {
  //         console.log(`Error on setting up the project=> `, error);
  //     }
  // }
}

export default ProjectTools;
