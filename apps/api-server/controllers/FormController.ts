// @ts-nocheck
import { Request, Response } from 'express';
import { formSchema } from '@repo/db';

import { reqQueryToMongooseOptions } from '@util/database-util';

class FormController {
  static async saveFormData(req: Request, res: Response) {
    try {
      const { data } = req.body;
      const formDataDataToSave = new formSchema(data);
      formDataDataToSave.save((error, savedData) => {
        if (error) {
          console.error('Error saving form data:', error);

          return res.status(500).json({ message: 'Something Went Wrong' });
        }
        res.json({ savedData });
      });
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

  //---------------------Dashboard--------------------

  static async dashboardGetForms(req: Request, res: Response) {
    try {
      const forms = await formSchema.find({}, null, reqQueryToMongooseOptions(req)).exec();
      const totalCount = await formSchema.countDocuments({}).exec();
      res.json({ forms, error: false, totalCount });
    } catch (error) {
      console.log(error);
      res.end();
    }
  }

  static async dashboardGetFrom(req: Request, res: Response) {
    try {
      formSchema
        .findById(req.query._id)
        .exec()
        .then(formData => {
          res.json({ form: formData, error: false });
        })
        .catch(error => {
          return res.status(500).json({ message: 'Something Went Wrong' });
        });
    } catch (error) {
      return res.status(500).json({ message: 'Something Went Wrong' });
    }
  }

  static async dashboardDeleteForm(req: Request, res: Response) {
    try {
      await formSchema
        .findByIdAndDelete(req.query._id, { useFindAndModify: false })
        .exec()
        .then(() => {
          res.json({ message: 'form deleted' });
        })
        .catch(error => {
          console.log(error);
          return res.status(500).json({ message: 'Something Went Wrong' });
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something Went Wrong' });
    }
  }
}

export default FormController;
