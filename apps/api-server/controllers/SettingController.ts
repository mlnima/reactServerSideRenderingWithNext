// @ts-nocheck
import { Request, Response } from 'express';

import { settingSchema } from '@repo/db';
import GlobalStore from '@store/GlobalStore';
import globalStore from '@store/GlobalStore';

class SettingController {
  static async getSettings(req: Request, res: Response) {
    try {
      const requestedSettings = Array.isArray(req.query.setting) ? req.query.setting : [req.query.setting];
      const settingsFromStore = GlobalStore.getSettings(requestedSettings);

      res.json({ settings: settingsFromStore });
    } catch (err) {
      console.error('Error fetching settings:', err);
      res.status(404).json({ message: 'Not Found' });
    }
  }

  //---------------------Dashboard--------------------
  static async dashboardUpdateSetting(req: Request, res: Response) {
    try {
      const type = req.body.type;
      const data = req.body.data;
      const updatedSetting = await settingSchema
        .findOneAndUpdate(
          { type: type },
          { data },
          {
            new: true,
            upsert: true,
          },
        )
        .exec();
      if (!!updatedSetting) {
        await globalStore.setSetting(updatedSetting.type, updatedSetting.data);
        res.json({ message: 'Updated' });
      } else {
        res.status(400).json({ message: `Error On Updating ${type} Setting` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

  // static async dashboardGetSettings(req: Request, res: Response){
  //     const setting = await settingSchema.findOne({type: req.query.type}).exec();
  //     res.json({setting})
  // };
  static async dashboardGetSettings(req: Request, res: Response) {
    try {
      const requestedSettings = Array.isArray(req.query.setting) ? req.query.setting : [req.query.setting];
      let responseData = {};

      for await (const setting of requestedSettings) {
        responseData = {
          ...responseData,
          [setting]: (await settingSchema.findOne({ type: setting }).exec()) || {},
        };
      }

      res.json({ settings: responseData });
    } catch (err) {
      console.log(err);
      res.status(404).json('Not Found');
    }
  }
}

export default SettingController;
