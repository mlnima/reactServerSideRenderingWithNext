'use server';
import { connectToDatabase, formSchema } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

interface ISaveFormWidgetData {
  data: {
    [key: string]: any;
  };
}

const saveFormWidgetData = async ({ data }: ISaveFormWidgetData): Promise<ServerActionResponse<null>> => {
  try {
    await connectToDatabase('saveFormWidgetData');
    const formDataDataToSave = new formSchema(data);
    await formDataDataToSave.save();
    return successResponse({ data: null });
  } catch (error) {
    console.log(`saveFormWidgetData=> `, error);
    return errorResponse({
      message: 'Failed to save form data.',
    });
  }
};

export default saveFormWidgetData;
