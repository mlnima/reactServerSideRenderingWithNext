import { connectToDatabase, formSchema } from '@repo/db';

interface ISaveFormWidgetData {
  data: {
    [key: string]: any;
  };
}

const saveFormWidgetData = async ({ data }: ISaveFormWidgetData) => {
  try {
    await connectToDatabase('saveFormWidgetData');
    const formDataDataToSave = new formSchema(data);
    await formDataDataToSave.save();
    return;
  } catch (error) {
    console.log(`saveFormWidgetData=> `, error);
    return;
  }
};

export default saveFormWidgetData;